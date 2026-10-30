/**
 * Licensing-aware content metadata.
 *
 * IMPORTANT: none of this is a substitute for a real rights-management backend.
 * `licenseStatus` and `permittedTerritories` here are authored by hand for this
 * demo and are enforced only in the client bundle (see docs/licensing-architecture.md).
 * Anything that must not be publicly distributable has to be enforced server-side —
 * a client-side check (including IP-based territory checks) can always be bypassed.
 */

/** Where a piece of content came from. */
export type ContentOrigin =
  /** Authored in-house for this app; not Julia Cook material. */
  | "original_demo"
  /** A real, published work represented only by verified bibliographic metadata. */
  | "verified_bibliographic"
  /** Supplied by a future authorized content-delivery partner/API. Not used yet. */
  | "licensed_partner";

/** Rights-clearance state for a piece of content. */
export type LicenseStatus =
  | "original"
  | "public_metadata"
  | "licensed_pending_verification"
  | "licensed_approved"
  | "restricted"
  | "unknown";

export type ReviewStatus = "draft" | "pending_review" | "approved";

export type PermittedUse =
  | "metadata_display"
  | "external_link"
  | "stream"
  | "download"
  | "translate"
  | "adapt"
  | "sublicense";

export interface LicensingMetadata {
  contentOrigin: ContentOrigin;
  /** Who holds the rights to the underlying work (e.g. "Julia Cook / National Center for Youth Issues"). */
  rightsHolder: string;
  licenseStatus: LicenseStatus;
  /** ISO 3166-1 alpha-2 country codes, or ["*"] for content with no territorial restriction. */
  permittedTerritories: string[];
  permittedUses: PermittedUse[];
  /** Required attribution text, if any. */
  attribution?: string;
  reviewStatus: ReviewStatus;
}

/**
 * Content whose `licenseStatus` is one of these must never be surfaced in
 * public discovery (search, topic listings, library browsing) — only a
 * direct, already-known reference may resolve it, and even then the UI must
 * show `licensing.restrictedMessage` instead of the underlying material.
 */
export const HIDDEN_FROM_DISCOVERY: LicenseStatus[] = ["restricted", "unknown"];

export function isHiddenFromDiscovery(licensing: LicensingMetadata): boolean {
  return HIDDEN_FROM_DISCOVERY.includes(licensing.licenseStatus);
}
