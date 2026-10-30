import {
  getResourceById as getLocalResourceById,
  resourcesForTopic as localResourcesForTopic,
  searchResources as localSearchResources,
} from "../data/resources";
import type { Filters, Resource } from "../types";
import { isHiddenFromDiscovery } from "./types";

/**
 * Abstraction the UI talks to instead of importing resource data directly.
 * This keeps the door open for a future authorized content service: once a
 * real backend exists, only `RemoteContentProvider` needs to be finished and
 * swapped in via `getContentProvider()` — no page code should need to change.
 *
 * IMPORTANT: filtering content by `licenseStatus` here is a *display*
 * convenience for this demo, not a security boundary. A determined client
 * can always read everything shipped in the public bundle. Anything that
 * must truly stay private (unreleased licensed content, territory-restricted
 * material) must never be included in this bundle in the first place and
 * must be served from an authenticated, territory-aware backend. See
 * docs/licensing-architecture.md.
 */
export interface ContentProvider {
  listResources(): Resource[];
  getResourceById(id: string): Resource | undefined;
  resourcesForTopic(topicSlug: string, type?: Resource["type"]): Resource[];
  searchResources(options: { query?: string; topic?: string | null; filters?: Filters }): Resource[];
}

/**
 * Serves the locally authored demonstration catalog bundled with the app.
 * Resources whose licensing status is "restricted" or "unknown" are excluded
 * from every discovery surface (search, topic listings, library browsing).
 */
class LocalDemoContentProvider implements ContentProvider {
  listResources(): Resource[] {
    return localSearchResources({}).filter((r) => !isHiddenFromDiscovery(r.licensing));
  }

  getResourceById(id: string): Resource | undefined {
    return getLocalResourceById(id);
  }

  resourcesForTopic(topicSlug: string, type?: Resource["type"]): Resource[] {
    return localResourcesForTopic(topicSlug, type).filter((r) => !isHiddenFromDiscovery(r.licensing));
  }

  searchResources(options: { query?: string; topic?: string | null; filters?: Filters }): Resource[] {
    return localSearchResources(options).filter((r) => !isHiddenFromDiscovery(r.licensing));
  }
}

/**
 * Not implemented. This stub documents the shape a future authorized
 * content-delivery backend would need to satisfy. It intentionally throws so
 * it can never be selected accidentally without real configuration.
 */
class RemoteContentProvider implements ContentProvider {
  listResources(): never {
    throw new Error("RemoteContentProvider is not configured. See docs/licensing-architecture.md.");
  }
  getResourceById(): never {
    throw new Error("RemoteContentProvider is not configured. See docs/licensing-architecture.md.");
  }
  resourcesForTopic(): never {
    throw new Error("RemoteContentProvider is not configured. See docs/licensing-architecture.md.");
  }
  searchResources(): never {
    throw new Error("RemoteContentProvider is not configured. See docs/licensing-architecture.md.");
  }
}

let cachedProvider: ContentProvider | null = null;

/**
 * Returns the active ContentProvider. Controlled by `VITE_CONTENT_SOURCE`
 * ("local" | "remote"), defaulting to "local" — there is no production
 * backend to point to yet, so "remote" exists only to show the integration
 * point for later.
 */
export function getContentProvider(): ContentProvider {
  if (cachedProvider) return cachedProvider;
  const source = import.meta.env.VITE_CONTENT_SOURCE ?? "local";
  cachedProvider = source === "remote" ? new RemoteContentProvider() : new LocalDemoContentProvider();
  return cachedProvider;
}
