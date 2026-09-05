import { describe, expect, it } from "vitest"
import type { SurfacesState } from "../../types"
import { createFocus } from "./focus"

const stateOf = (names: string[]): SurfacesState => ({
  maxLive: 8,
  modules: [],
  surfaces: new Map(
    names.map((name) => [name, { name, description: name, actions: [] }])
  ),
  live: [],
  pinned: new Set(),
})

describe("createFocus", () => {
  it("binds enter, leave, pin, and clear to the same state", () => {
    const state = stateOf(["inbox", "composer"])
    const focus = createFocus(state)

    focus.enter("inbox")
    focus.pin("composer")
    expect(state.live).toEqual(["inbox", "composer"])
    expect(state.pinned.has("composer")).toBe(true)

    focus.leave("inbox")
    expect(state.live).toEqual(["composer"])

    focus.clear()
    expect(state.live).toEqual([])
    expect(state.pinned.size).toBe(0)
  })
})
