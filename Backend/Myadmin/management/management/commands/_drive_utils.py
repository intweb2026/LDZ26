"""
Shared Google Drive API helpers for all upload commands.
Replaces gdown + raw HTTP downloads with authenticated Service Account calls.

Provides the same .path / .id interface as gdown.download_folder(skip_download=True)
so existing command logic needs no structural change.
"""

import io
import os
import re

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

# Characters that are invalid in Windows filenames (colon is the main offender)
_INVALID_WIN_CHARS = re.compile(r'[<>:"/\\|?*]')


class DriveItem:
    """Mirrors the object returned by gdown.download_folder(skip_download=True)."""
    def __init__(self, path: str, file_id: str):
        self.path = path    # "SubfolderName/filename.ext"  or  "filename.ext"
        self.id   = file_id


def build_drive_service(credentials_path: str):
    """Build an authenticated Drive v3 service from a service account JSON key file."""
    if not os.path.isfile(credentials_path):
        raise FileNotFoundError(
            f"Service account key not found: {credentials_path}\n"
            "Download it from Google Cloud Console -> IAM & Admin -> Service Accounts."
        )
    creds = service_account.Credentials.from_service_account_file(
        credentials_path, scopes=SCOPES
    )
    return build("drive", "v3", credentials=creds, cache_discovery=False)


def _folder_id_from_url(url: str) -> str:
    m = re.search(r"/folders/([a-zA-Z0-9_-]+)", url)
    if not m:
        raise ValueError(f"Cannot extract folder ID from URL: {url}")
    return m.group(1)


def _sanitize(name: str) -> str:
    """Replace Windows-invalid characters (mainly colons) with a hyphen."""
    return _INVALID_WIN_CHARS.sub("-", name)


def _list_children(service, folder_id: str) -> list:
    """List all non-trashed items directly inside folder_id (one page loop)."""
    items = []
    page_token = None
    while True:
        resp = service.files().list(
            q=f"'{folder_id}' in parents and trashed=false",
            fields="nextPageToken, files(id, name, mimeType)",
            pageToken=page_token,
            pageSize=1000,
        ).execute()
        items.extend(resp.get("files", []))
        page_token = resp.get("nextPageToken")
        if not page_token:
            break
    return items


def list_drive_folder(service, folder_url: str) -> list:
    """
    List all files in a Drive folder and its immediate subfolders.

    Returns a list of DriveItem objects:
      Root files      -> item.path = "filename.ext"
      Subfolder files -> item.path = "SubfolderName/filename.ext"

    Filenames are sanitized (colons replaced with hyphens) so they are safe
    on Windows.  Subfolder names in item.path keep the original Drive name so
    that comparisons like `subfolder == "LDZ-26 Speakers Photos"` still work.
    """
    root_id = _folder_id_from_url(folder_url)
    root_children = _list_children(service, root_id)

    result = []
    for item in root_children:
        if item["mimeType"] == "application/vnd.google-apps.folder":
            sub_files = _list_children(service, item["id"])
            for f in sub_files:
                if f["mimeType"] != "application/vnd.google-apps.folder":
                    safe_fname = _sanitize(f["name"])
                    # Subfolder name is kept verbatim for match against Drive subfolder constants
                    result.append(DriveItem(
                        path=f"{item['name']}/{safe_fname}",
                        file_id=f["id"],
                    ))
        else:
            result.append(DriveItem(path=_sanitize(item["name"]), file_id=item["id"]))

    return result


def download_drive_file(service, file_id: str, output_path: str) -> None:
    """
    Download a Drive file to output_path via the authenticated API.
    No browser emulation, no confirm= tokens, no cookie dependency.
    """
    request = service.files().get_media(fileId=file_id)
    with io.FileIO(output_path, "wb") as fh:
        downloader = MediaIoBaseDownload(fh, request, chunksize=512 * 1024)
        done = False
        while not done:
            _, done = downloader.next_chunk()
