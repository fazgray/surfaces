import { describe, expect, it } from "vitest"
import type { SurfacesState } from "../../../types"
import { leave } from "./leave"

const stateOf = (
  names: string[],
  init: { live?: string[]; pinned?: string[] } = {}
): SurfacesState => ({
  maxLive: 8,
  modules: [],
  surfaces: new Map(
    names.map((name) => [name, { name, description: name, actions: [] }])
  ),
  live: init.live ?? [],
  pinned: new Set(init.pinned ?? []),
})

describe("leave", () => {
  it("removes a surface from the live set", () => {
    const state = stateOf(["inbox", "composer"], {
      live: ["inbox", "composer"],
    })
    leave(state, "inbox")
    expect(state.live).toEqual(["composer"])
  })

  it("is a no-op for a surface that is not live", () => {
    const state = stateOf(["inbox"])
    expect(() => leave(state, "inbox")).not.toThrow()
    expect(state.live).toEqual([])
  })

  it("unpins a surface", () => {
    const state = stateOf(["inbox"], { live: ["inbox"], pinned: ["inbox"] })
    leave(state, "inbox")
    expect(state.pinned.has("inbox")).toBe(false)
  })
})
