import { describe, expect, it } from "vitest"
import type { SurfacesState } from "../../../types"
import { evict } from "./evict"

const stateOf = (
  live: string[],
  init: { maxLive?: number; pinned?: string[] } = {}
): SurfacesState => ({
  maxLive: init.maxLive ?? 8,
  modules: [],
  surfaces: new Map(),
  live: [...live],
  pinned: new Set(init.pinned ?? []),
})

describe("evict", () => {
  it("does nothing when the live set is within maxLive", () => {
    const state = stateOf(["a", "b"], { maxLive: 2 })
    evict(state)
    expect(state.live).toEqual(["a", "b"])
  })

  it("removes the oldest unpinned surface when over maxLive", () => {
    const state = stateOf(["a", "b", "c"], { maxLive: 2 })
    evict(state)
    expect(state.live).toEqual(["b", "c"])
  })

  it("skips pinned surfaces and unpins whatever it removes", () => {
    const state = stateOf(["a", "b", "c"], { maxLive: 2, pinned: ["a", "b"] })
    evict(state)
    expect(state.live).toEqual(["b", "c"])
    expect(state.pinned.has("a")).toBe(false)
  })
})
