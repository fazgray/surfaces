/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { zoomTarget } from "./zoomTarget"

describe("zoomTarget", () => {
  it("returns the element when it has style", () => {
    const el = document.createElement("div")
    expect(zoomTarget(el)).toBe(el)
  })

  it("returns the document element when no element is given", () => {
    expect(zoomTarget()).toBe(document.documentElement)
  })
})
