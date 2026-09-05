/** @vitest-environment jsdom */
import { describe, expect, it, vi } from "vitest"
import { create } from "../../core/create/index"
import { dom } from "./index"

const scrollable = () => {
  const el = document.createElement("div")
  Object.defineProperties(el, {
    clientHeight: { value: 200 },
    scrollHeight: { value: 1000, writable: true },
    scrollTop: { value: 0, writable: true },
  })
  el.scrollBy = vi.fn()
  el.scrollTo = vi.fn()
  return el
}

describe("dom module", () => {
  it("is omitted from schema when the module is not loaded", () => {
    const ui = create()
    ui.registerSurface({
      name: "page",
      description: "page",
      element: scrollable(),
    })
    ui.focus.enter("page")
    expect(ui.schema().surfaces[0]?.actions).toEqual([])
  })

  it("omits scroll and zoom on live surfaces without an element", () => {
    const ui = create({ modules: [dom] })
    ui.registerSurface({ name: "profile", description: "profile" })
    ui.focus.enter("profile")
    expect(ui.schema().surfaces[0]?.actions).toEqual([])
  })

  it("adds scroll and zoom actions to live surfaces", () => {
    const ui = create({ modules: [dom] })
    ui.registerSurface({
      name: "page",
      description: "page",
      element: scrollable(),
    })
    ui.focus.enter("page")

    expect(ui.schema().surfaces[0]?.actions.map((c) => c.id)).toEqual([
      "dom.scroll.down",
      "dom.scroll.up",
      "dom.scroll.top",
      "dom.scroll.bottom",
      "dom.zoom.in",
      "dom.zoom.out",
      "dom.zoom.reset",
    ])
  })

  it("uses the pinned surface when scroll is targetless", async () => {
    const page = scrollable()
    const modal = scrollable()
    const ui = create({ maxLive: 2, modules: [dom] })
    ui.registerSurface({ name: "page", description: "page", element: page })
    ui.registerSurface({
      name: "booking",
      description: "booking",
      element: modal,
    })
    ui.focus.enter("page")
    ui.focus.pin("booking")

    await ui.run({ actionId: "dom.scroll.down" })

    expect(modal.scrollBy).toHaveBeenCalled()
    expect(page.scrollBy).not.toHaveBeenCalled()
  })
})
