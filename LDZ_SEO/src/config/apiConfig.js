const API_BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://www.australia.lithium-downstream-summit.com";

export default API_BASE_URL;

/**
 * Build an absolute URL for a media path returned by the Django API.
 * DB now stores relative paths like /media/filename.jpg — prepend API_BASE_URL.
 * If the value is already absolute (starts with http), return as-is.
 */
export function mediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
}
