import { describe, expect, it } from "vitest";
import { getContentProvider } from "./ContentProvider";

describe("ContentProvider (local demo provider)", () => {
  const provider = getContentProvider();

  it("excludes restricted/unknown-rights resources from listResources", () => {
    const all = provider.listResources();
    expect(all.find((r) => r.id === "partner-video-pending-rights")).toBeUndefined();
  });

  it("excludes restricted resources from topic listings", () => {
    const results = provider.resourcesForTopic("getting-angry");
    expect(results.find((r) => r.id === "partner-video-pending-rights")).toBeUndefined();
    // Sanity check the topic still surfaces its legitimate resources.
    expect(results.length).toBeGreaterThan(0);
  });

  it("excludes restricted resources from search results", () => {
    const results = provider.searchResources({ query: "", topic: "getting-angry" });
    expect(results.find((r) => r.id === "partner-video-pending-rights")).toBeUndefined();
  });

  it("still resolves a restricted resource by direct id (metadata only)", () => {
    const resource = provider.getResourceById("partner-video-pending-rights");
    expect(resource).toBeDefined();
    expect(resource?.licensing.licenseStatus).toBe("restricted");
  });

  it("resolves a normal resource by id", () => {
    const resource = provider.getResourceById("calm-down-toolbox");
    expect(resource?.title).toBe("Calm Down Toolbox");
  });
});
