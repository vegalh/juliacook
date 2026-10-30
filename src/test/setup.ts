import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// vitest.config.ts doesn't enable `globals`, so testing-library's automatic
// cleanup (which relies on a global `afterEach`) needs to be wired up here.
afterEach(() => {
  cleanup();
});
