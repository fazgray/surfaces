import { describe, expect, it } from "vitest"
import type { SurfacesState } from "../../../types"
import { clear } from "./clear"

describe("clear", () => {
  it("empties the live set and pins", () => {
    const state: SurfacesState = {
      maxLive: 8,
      modules: [],
      surfaces: new Map([
        ["inbox", { name: "inbox", description: "inbox", actions: [] }],
        [
          "composer",
          { name: "composer", description: "composer", actions: [] },
        ],
      ]),
      live: ["inbox", "composer"],
      pinned: new Set(["composer"]),
    }

    clear(state)
    expect(state.live).toEqual([])
    expect(state.pinned.size).toBe(0)
  })
})
