export const cleanHtml = (html) => {
  if (!html) return "";
  let cleaned = html;
  let prev = null;
  while (prev !== cleaned) {
    prev = cleaned;
    cleaned = cleaned
      .replace(/^"(.*)"$/s, "$1")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  cleaned = cleaned.replace(/<a\b[^>]*>/gi, (aTag) => {
    const urlMatch = aTag.match(/https?:\/\/[^\s"'\\>]+/);
    if (urlMatch) {
      return `<a href="${urlMatch[0]}" target="_blank" rel="noopener noreferrer">`;
    }
    return aTag;
  });
  return cleaned;
};
