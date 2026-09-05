import { describe, expect, it } from "vitest"
import type { Module } from "../../../types"
import { createState, DEFAULT_MAX_LIVE } from "./createState"

const extra: Module = {
  id: "demo",
  actions: [
    {
      id: "noop",
      description: "Do nothing",
      run: () => undefined,
    },
  ],
}

describe("createState", () => {
  it("defaults maxLive to 8", () => {
    expect(DEFAULT_MAX_LIVE).toBe(8)
    expect(createState().maxLive).toBe(DEFAULT_MAX_LIVE)
  })

  it("uses the given maxLive", () => {
    expect(createState({ maxLive: 3 }).maxLive).toBe(3)
  })

  it("rejects maxLive below 1", () => {
    expect(() => createState({ maxLive: 0 })).toThrow(
      "maxLive must be at least 1"
    )
  })

  it("defaults modules to an empty list", () => {
    expect(createState().modules).toEqual([])
  })

  it("uses the given modules", () => {
    expect(createState({ modules: [extra] }).modules).toEqual([extra])
  })

  it("starts with no surfaces, live set, or pins", () => {
    const state = createState()
    expect(state.surfaces.size).toBe(0)
    expect(state.live).toEqual([])
    expect(state.pinned.size).toBe(0)
  })
})
