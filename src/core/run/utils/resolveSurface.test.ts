import { describe, expect, it } from "vitest"
import { createState } from "../../create/utils/index"
import { enter, pin } from "../../focus/index"
import { registerSurface } from "../../register-surface/index"
import { resolveSurface } from "./resolveSurface"

const note = {
  id: "note.add",
  description: "Add a note",
  run: () => undefined,
}

describe("resolveSurface", () => {
  it("returns the only live surface with the action", () => {
    const state = createState()
    registerSurface(state, {
      name: "inbox",
      description: "inbox",
      actions: [note],
    })
    enter(state, "inbox")
    expect(resolveSurface(state, "note.add")).toBe("inbox")
  })

  it("throws when no live surface has the action", () => {
    const state = createState()
    registerSurface(state, { name: "inbox", description: "inbox" })
    enter(state, "inbox")
    expect(() => resolveSurface(state, "note.add")).toThrow(
      'Unknown action "note.add"'
    )
  })

  it("uses the pinned surface when several live surfaces share the action", () => {
    const state = createState({ maxLive: 2 })
    registerSurface(state, {
      name: "page",
      description: "page",
      actions: [note],
    })
    registerSurface(state, {
      name: "modal",
      description: "modal",
      actions: [note],
    })
    enter(state, "page")
    pin(state, "modal")
    expect(resolveSurface(state, "note.add")).toBe("modal")
  })

  it("throws when several live surfaces share the action and none is pinned", () => {
    const state = createState({ maxLive: 2 })
    registerSurface(state, {
      name: "page",
      description: "page",
      actions: [note],
    })
    registerSurface(state, {
      name: "modal",
      description: "modal",
      actions: [note],
    })
    enter(state, "page")
    enter(state, "modal")
    expect(() => resolveSurface(state, "note.add")).toThrow("pass surface")
  })
})
