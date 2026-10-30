import { describe, expect, it } from "vitest";
import { matchTopicFromQuery } from "./topicMappings";

describe("matchTopicFromQuery", () => {
  it("matches English free-text phrasing", () => {
    expect(matchTopicFromQuery("my child keeps yelling and having a meltdown")).toBe("getting-angry");
  });

  it("matches Simplified Chinese free-text phrasing", () => {
    expect(matchTopicFromQuery("孩子总是发脾气大哭大闹")).toBe("getting-angry");
  });

  it("matches a different topic in Chinese", () => {
    expect(matchTopicFromQuery("孩子不愿意和朋友分享玩具")).toBe("sharing");
  });

  it("returns null for text with no topic signal", () => {
    expect(matchTopicFromQuery("xyz nonsense")).toBeNull();
  });
});
