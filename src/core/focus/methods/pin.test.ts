import { describe, expect, it } from "vitest"
import type { SurfacesState } from "../../../types"
import { enter } from "./enter"
import { pin } from "./pin"

const stateOf = (
  names: string[],
  init: { maxLive?: number } = {}
): SurfacesState => ({
  maxLive: init.maxLive ?? 8,
  modules: [],
  surfaces: new Map(
    names.map((name) => [name, { name, description: name, actions: [] }])
  ),
  live: [],
  pinned: new Set(),
})

describe("pin", () => {
  it("enters a surface that is not yet live", () => {
    const state = stateOf(["composer"])
    pin(state, "composer")
    expect(state.live).toEqual(["composer"])
    expect(state.pinned.has("composer")).toBe(true)
  })

  it("does not evict a pinned surface when over maxLive", () => {
    const state = stateOf(["a", "b", "c"], { maxLive: 2 })
    pin(state, "a")
    enter(state, "b")
    enter(state, "c")
    expect(state.live).toEqual(["a", "c"])
    expect(state.pinned.has("a")).toBe(true)
  })
})
