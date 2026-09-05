import { describe, expect, it } from "vitest"
import { create } from "../create/index"

describe("unregisterSurface", () => {
  it("removes the surface from the registry and the live set", () => {
    const ui = create()
    ui.registerSurface({ name: "inbox", description: "inbox" })
    ui.focus.enter("inbox")
    ui.unregisterSurface("inbox")

    expect(ui.schema().surfaces).toEqual([])
    expect(() => ui.focus.enter("inbox")).toThrow(
      'Surface "inbox" is not registered'
    )
  })

  it("is a no-op for an unknown id", () => {
    const ui = create()
    expect(() => ui.unregisterSurface("missing")).not.toThrow()
  })
})
