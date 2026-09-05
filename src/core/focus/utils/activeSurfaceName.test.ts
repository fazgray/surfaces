import { describe, expect, it } from "vitest"
import { activeSurfaceName } from "./activeSurfaceName"

describe("activeSurfaceName", () => {
  it("returns undefined when nothing is pinned", () => {
    expect(
      activeSurfaceName({
        maxLive: 8,
        modules: [],
        surfaces: new Map(),
        live: ["inbox"],
        pinned: new Set(),
      })
    ).toBeUndefined()
  })

  it("returns the most recently entered pinned surface", () => {
    expect(
      activeSurfaceName({
        maxLive: 8,
        modules: [],
        surfaces: new Map(),
        live: ["inbox", "composer"],
        pinned: new Set(["inbox", "composer"]),
      })
    ).toBe("composer")
  })

  it("skips unpinned live surfaces", () => {
    expect(
      activeSurfaceName({
        maxLive: 8,
        modules: [],
        surfaces: new Map(),
        live: ["inbox", "composer"],
        pinned: new Set(["inbox"]),
      })
    ).toBe("inbox")
  })
})
