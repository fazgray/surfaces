import { describe, expect, it } from "vitest"
import { createState } from "../../create/utils/index"
import { enter } from "../../focus/index"
import { registerSurface } from "../../register-surface/index"
import { liveSurfacesWith } from "./liveSurfacesWith"

describe("liveSurfacesWith", () => {
  it("returns every live surface when the action is on a module", () => {
    const state = createState({
      modules: [
        {
          id: "demo",
          actions: [
            { id: "demo.ping", description: "Ping", run: () => undefined },
          ],
        },
      ],
    })
    registerSurface(state, { name: "inbox", description: "inbox" })
    registerSurface(state, { name: "composer", description: "composer" })
    enter(state, "inbox")
    enter(state, "composer")

    expect(liveSurfacesWith(state, "demo.ping")).toEqual(["inbox", "composer"])
  })

  it("returns only live surfaces that own the action", () => {
    const open = {
      id: "mail.open",
      description: "Open",
      run: () => undefined,
    }
    const state = createState()
    registerSurface(state, {
      name: "inbox",
      description: "inbox",
      actions: [open],
    })
    registerSurface(state, { name: "composer", description: "composer" })
    enter(state, "inbox")
    enter(state, "composer")

    expect(liveSurfacesWith(state, "mail.open")).toEqual(["inbox"])
  })
})
