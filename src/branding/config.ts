/**
 * Branding safeguard. The app's name references "Julia Cook," but nothing in
 * this prototype has been verified as an official Julia Cook asset or
 * endorsement (see docs/licensing-architecture.md). Until a real brand
 * agreement exists, the UI must not present itself as officially authorized.
 *
 * Flip `VITE_BRAND_MODE=authorized` (a build-time env var) only once a signed
 * agreement and verified brand assets are in place.
 */
export type BrandMode = "demo" | "authorized";

export function getBrandMode(): BrandMode {
  const mode = import.meta.env.VITE_BRAND_MODE;
  return mode === "authorized" ? "authorized" : "demo";
}

export function isOfficiallyAuthorized(): boolean {
  return getBrandMode() === "authorized";
}
