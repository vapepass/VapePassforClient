const UNDERAGE_PATTERNS = [
  /\bi\s*['']?m\s+under\s*age\b/i,
  /\bi\s+am\s+under\s*age\b/i,
  /\bunder\s*age\b/i,
  /\bunderage\b/i,
  /\bi\s*['']?m\s+under\s*19\b/i,
  /\bi\s+am\s+under\s*19\b/i,
  /\bi\s*['']?m\s+(1[0-8])\b/i,
  /\bi\s+am\s+(1[0-8])\b/i,
  /\bi\s*['']?m\s+a\s+minor\b/i,
  /\bi\s+am\s+a\s+minor\b/i,
  /\bi\s*['']?m\s+underage\b/i,
  /\bi\s+am\s+underage\b/i,
  /\bi\s*['']?m\s+in\s+high\s+school\b/i,
  /\bi\s*['']?m\s+a\s+teenager\b/i,
  /\bi\s+am\s+a\s+teenager\b/i,
  /\bhigh\s+school\b/i,
  /\bi\s+don\s*['']?t\s+have\s+(an?\s+)?id\b/i,
  /\bi\s+have\s+no\s+id\b/i,
  /\bno\s+id\b/i,
  /\bmy\s+friends\s+at\s+school\b/i,
  /\bschool\b/i,
  /\bminor\b/i,
  /\bteenager\b/i,
  /\bteen\b/i,
  /\bnot\s+19\b/i,
  /\bnot\s+old\s+enough\b/i,
  /\btoo\s+young\b/i,
];

export function detectUnderageMessage(text) {
  const normalized = text.trim();
  if (!normalized) return false;
  return UNDERAGE_PATTERNS.some((pattern) => pattern.test(normalized));
}
