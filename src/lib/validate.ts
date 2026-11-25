/** US phone: exactly 10 digits. A leading country code 1 (11 digits) is accepted and dropped. */
export function normalizePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  return digits.length === 10 ? digits : null;
}

export function formatPhone(digits: string) {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** name@domain.tld, no spaces, a dot in the domain and at least 2 letters after it. */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;

export function isValidEmail(raw: string) {
  return EMAIL_RE.test(raw.trim());
}

export type WindowRow = { label: string; width: number; height: number; qty: number };

export function sqftOf(w: WindowRow) {
  return (w.width * w.height * w.qty) / 144;
}
