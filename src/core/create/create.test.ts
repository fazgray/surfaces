import { describe, expect, it } from "vitest"
import type { Module } from "../../types"
import { create } from "./create"

const noop = {
  id: "noop",
  description: "Do nothing",
  run: () => undefined,
}

describe("create", () => {
  it("returns the public API", () => {
    const ui = create()
    expect(ui).toEqual(
      expect.objectContaining({
        registerSurface: expect.any(Function),
        unregisterSurface: expect.any(Function),
        schema: expect.any(Function),
        run: expect.any(Function),
        focus: expect.objectContaining({
          enter: expect.any(Function),
          leave: expect.any(Function),
          pin: expect.any(Function),
          clear: expect.any(Function),
        }),
      })
    )
  })

  it("loads modules onto live surfaces that have an element", () => {
    const extra: Module = {
      id: "demo",
      actions: [noop],
    }
    const ui = create({ modules: [extra] })
    ui.registerSurface({
      name: "page",
      description: "page",
      element: {} as Element,
      actions: [],
    })
    ui.focus.enter("page")

    expect(ui.schema().surfaces[0]?.actions).toEqual([
      { id: "noop", description: "Do nothing" },
    ])
  })

  it("omits modules on live surfaces without an element", () => {
    const extra: Module = {
      id: "demo",
      actions: [noop],
    }
    const ui = create({ modules: [extra] })
    ui.registerSurface({ name: "page", description: "page", actions: [] })
    ui.focus.enter("page")
    expect(ui.schema().surfaces[0]?.actions).toEqual([])
  })

  it("omits modules when none are passed", () => {
    const ui = create()
    ui.registerSurface({ name: "page", description: "page", actions: [] })
    ui.focus.enter("page")
    expect(ui.schema().surfaces[0]?.actions).toEqual([])
  })
})
