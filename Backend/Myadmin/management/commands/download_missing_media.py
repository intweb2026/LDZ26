"""
Management command: download_missing_media
Reads every image path from the DB, checks whether the file exists locally
in MEDIA_ROOT, and downloads it from the production server if missing.

Usage:
    python manage.py download_missing_media          # dry-run (list missing files)
    python manage.py download_missing_media --apply  # download missing files
"""

import os
import re
import urllib.parse
import urllib.request
from django.core.management.base import BaseCommand
from django.conf import settings
from Myadmin.models import (
    homePageVideoSectionInput, homePageThirdSection, homePageNavLogoData,
    generalNewsPoint, companiesLogoSection, countSection, testimonialSection,
    pastAttandeesSection, whoShouldAttendPageData, speakerPageData,
    sponsorPageData, venuePageData, venuePageGallery, contactUsPageData,
    pressMediaPageData, sponsorPackagePageData,
)
from Event.models import (
    eventDetails, eventSpeakers, eventPastAttandees, eventSponsors,
    relatedEvents, eventLeaders, eventAgenda, eventSlideShares,
    paymentOptionImage, pageSeoSettings,
)

PRODUCTION_DOMAIN = "https://australia.lithium-downstream-summit.com"

FIELD_MAP = [
    (homePageVideoSectionInput, ["eventDetailBackImage", "videoLinkmp4", "videoLinkwebm", "videoReplaceImage", "eventStataticsBackImage", "eventExpertSpeakerBackImage"]),
    (homePageThirdSection, ["thirdSectionBackgroundImage"]),
    (homePageNavLogoData, ["blackLogoLink", "whiteLogoLink"]),
    (generalNewsPoint, ["newsImage"]),
    (companiesLogoSection, ["logoLink"]),
    (countSection, ["countSectionBackgroundImage"]),
    (testimonialSection, ["testimonialLogo", "firstTestimonialFirstImage", "firstTestimonialSecondImage", "secondTestimonialRightFirstImage", "secondTestimonialRightSecondImage", "secondTestimonialLeftFirstImage", "secondTestimonialLeftSecondImage", "lastTestimonialFirstImage", "lastTestimonialSecondImage"]),
    (pastAttandeesSection, ["pastAttandeesSectionackgroundImage", "firstSectionBottomIcon", "secondSectionBottomIcon", "thirdSectionImage"]),
    (whoShouldAttendPageData, ["sectionFirstLeftImage", "sectionSecondRightImage"]),
    (speakerPageData, ["sectionFirstLeftImage", "sectionSecondRightImage"]),
    (sponsorPageData, ["introParaImage"]),
    (venuePageData, ["venueFirstSectionLeftImage", "venueMapSectionBackImage"]),
    (venuePageGallery, ["gallerySectionOneBigImage", "gallerySectionOneSmallImage", "gallerySectionTwoBigImage", "gallerySectionTwoSmallImage", "gallerySectionThreeBigImage", "gallerySectionThreeSmallImage"]),
    (contactUsPageData, ["emailLogo"]),
    (pressMediaPageData, ["pressMediaPageSecondSectionImage"]),
    (sponsorPackagePageData, ["firstSectionLeftImage"]),
    (eventDetails, ["favicon"]),
    (eventSpeakers, ["eventSpeakerHomePageImage", "eventSpeakerProfilePageImage", "eventSpeakerFeaturedPageImage"]),
    (eventPastAttandees, ["pastAttandeeLogo"]),
    (eventSponsors, ["sponsorComapnyLogo", "sponsorComapnyBioLogo"]),
    (relatedEvents, ["eventImage", "eventHoverImage"]),
    (eventLeaders, ["leaderLogo"]),
    (eventAgenda, ["singleSpeakerAgendaImg", "singleSpeakerCompanyImg", "Speaker1AgendaImg", "Speaker1CompanyImg", "Speaker2AgendaImg", "Speaker2CompanyImg"]),
    (eventSlideShares, ["pptImage"]),
    (paymentOptionImage, ["paymentOptionImageLink"]),
    (pageSeoSettings, ["pageOgImage"]),
]

MEDIA_RE = re.compile(r'^/media/')


class Command(BaseCommand):
    help = "Download media files missing from local MEDIA_ROOT by fetching from the production server."

    def add_arguments(self, parser):
        parser.add_argument(
            '--apply',
            action='store_true',
            help='Actually download the missing files (default is dry-run).',
        )

    def handle(self, *args, **options):
        apply = options['apply']
        mode = "APPLY" if apply else "DRY-RUN"
        media_root = settings.MEDIA_ROOT

        self.stdout.write(f"\n{'='*60}")
        self.stdout.write(f"  download_missing_media  [{mode}]")
        self.stdout.write(f"  MEDIA_ROOT : {media_root}")
        self.stdout.write(f"  Source     : {PRODUCTION_DOMAIN}")
        self.stdout.write(f"{'='*60}\n")

        seen = set()
        missing = []
        downloaded = 0
        failed = 0

        for Model, fields in FIELD_MAP:
            for record in Model.objects.all():
                for field in fields:
                    path = getattr(record, field, None) or ''
                    if not MEDIA_RE.match(path):
                        continue
                    if path in seen:
                        continue
                    seen.add(path)

                    # /media/filename.jpg  →  MEDIA_ROOT/filename.jpg
                    # URL-decode so spaces stay as spaces, not %20
                    rel = urllib.parse.unquote(path[len('/media/'):])
                    local_file = os.path.join(media_root, rel)

                    if os.path.exists(local_file):
                        continue

                    missing.append(path)
                    self.stdout.write(f"  MISSING: {path}")

                    if apply:
                        url = PRODUCTION_DOMAIN + path
                        try:
                            urllib.request.urlretrieve(url, local_file)
                            self.stdout.write(self.style.SUCCESS(f"    OK Downloaded"))
                            downloaded += 1
                        except Exception as e:
                            self.stdout.write(self.style.ERROR(f"    FAIL: {e}"))
                            failed += 1

        self.stdout.write(f"\n{'='*60}")
        if not missing:
            self.stdout.write(self.style.SUCCESS("All media files already exist locally. Nothing to download."))
        elif apply:
            self.stdout.write(self.style.SUCCESS(f"Done. Downloaded: {downloaded}  Failed: {failed}  Total missing: {len(missing)}"))
        else:
            self.stdout.write(self.style.WARNING(
                f"Dry-run complete. {len(missing)} file(s) missing locally.\n"
                f"Run with --apply to download them from {PRODUCTION_DOMAIN}"
            ))
        self.stdout.write(f"{'='*60}\n")
