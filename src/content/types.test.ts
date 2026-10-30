import { describe, expect, it } from "vitest";
import { isHiddenFromDiscovery, type LicensingMetadata } from "./types";
import { ORIGINAL_DEMO, RESTRICTED_PENDING_RIGHTS, VERIFIED_BIBLIOGRAPHIC } from "./licensing";

function withStatus(status: LicensingMetadata["licenseStatus"]): LicensingMetadata {
  return { ...ORIGINAL_DEMO, licenseStatus: status };
}

describe("isHiddenFromDiscovery", () => {
  it("hides restricted content", () => {
    expect(isHiddenFromDiscovery(withStatus("restricted"))).toBe(true);
  });

  it("hides content with unknown rights status", () => {
    expect(isHiddenFromDiscovery(withStatus("unknown"))).toBe(true);
  });

  it("does not hide original content", () => {
    expect(isHiddenFromDiscovery(ORIGINAL_DEMO)).toBe(false);
  });

  it("does not hide verified bibliographic metadata", () => {
    expect(isHiddenFromDiscovery(VERIFIED_BIBLIOGRAPHIC)).toBe(false);
  });

  it("treats the shared restricted fixture as hidden", () => {
    expect(isHiddenFromDiscovery(RESTRICTED_PENDING_RIGHTS)).toBe(true);
  });
});
