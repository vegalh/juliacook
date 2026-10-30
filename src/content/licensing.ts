import type { LicensingMetadata } from "./types";

/** Original content authored for this prototype (demo copy, original activities). */
export const ORIGINAL_DEMO: LicensingMetadata = {
  contentOrigin: "original_demo",
  rightsHolder: "Cookie Bytes by Julia (original demonstration content)",
  licenseStatus: "original",
  permittedTerritories: ["*"],
  permittedUses: ["metadata_display", "external_link", "stream", "download", "translate", "adapt"],
  reviewStatus: "pending_review",
};

/**
 * Real, publicly known Julia Cook books represented by verified bibliographic
 * metadata only (title, author, a short original description we wrote
 * ourselves). No book text, illustrations, or other protected material is
 * bundled — see docs/licensing-architecture.md.
 */
export const VERIFIED_BIBLIOGRAPHIC: LicensingMetadata = {
  contentOrigin: "verified_bibliographic",
  rightsHolder: "Julia Cook / National Center for Youth Issues",
  licenseStatus: "public_metadata",
  permittedTerritories: ["*"],
  permittedUses: ["metadata_display", "external_link"],
  attribution: "Title and synopsis verified against the publisher's public listing.",
  reviewStatus: "approved",
};

/**
 * Example fixture representing a resource supplied by a hypothetical future
 * licensed content partner whose rights have not been cleared for the China
 * territory yet. Used to exercise and test the "restricted content" path —
 * it is never created as fabricated Julia Cook content, only as a
 * placeholder licensing state.
 */
export const RESTRICTED_PENDING_RIGHTS: LicensingMetadata = {
  contentOrigin: "licensed_partner",
  rightsHolder: "Unconfirmed — pending partner agreement",
  licenseStatus: "restricted",
  permittedTerritories: [],
  permittedUses: [],
  reviewStatus: "draft",
};
