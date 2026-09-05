import { describe, expect, it } from "vitest"
import type { SurfacesState } from "../../../types"
import { enter } from "./enter"

const stateOf = (
  names: string[],
  init: { maxLive?: number; live?: string[]; pinned?: string[] } = {}
): SurfacesState => ({
  maxLive: init.maxLive ?? 8,
  modules: [],
  surfaces: new Map(
    names.map((name) => [name, { name, description: name, actions: [] }])
  ),
  live: init.live ?? [],
  pinned: new Set(init.pinned ?? []),
})

describe("enter", () => {
  it("adds a registered surface to the live set", () => {
    const state = stateOf(["inbox"])
    enter(state, "inbox")
    expect(state.live).toEqual(["inbox"])
  })

  it("throws when the surface is not registered", () => {
    const state = stateOf([])
    expect(() => enter(state, "inbox")).toThrow(
      'Surface "inbox" is not registered'
    )
  })

  it("evicts the oldest unpinned surface when over maxLive", () => {
    const state = stateOf(["a", "b", "c"], { maxLive: 2 })
    enter(state, "a")
    enter(state, "b")
    enter(state, "c")
    expect(state.live).toEqual(["b", "c"])
  })

  it("re-enter updates recency so the older surface is evicted", () => {
    const state = stateOf(["a", "b", "c"], { maxLive: 2 })
    enter(state, "a")
    enter(state, "b")
    enter(state, "a")
    enter(state, "c")
    expect(state.live).toEqual(["a", "c"])
  })

  it("evicts the oldest surface when every live surface is pinned", () => {
    const state = stateOf(["a", "b", "c"], { maxLive: 2, pinned: ["a", "b"] })
    state.live = ["a", "b"]
    enter(state, "c")
    expect(state.live).toEqual(["b", "c"])
  })
})
