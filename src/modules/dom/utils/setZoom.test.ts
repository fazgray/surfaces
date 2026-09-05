/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { setZoom } from "./setZoom"

describe("setZoom", () => {
  it("applies the next zoom to the element", () => {
    const el = document.createElement("div")
    setZoom(el, (current) => current + 0.1)
    expect(el.style.zoom).toBe("1.1")
  })

  it("reads an existing zoom from the element", () => {
    const el = document.createElement("div")
    el.style.zoom = "1.5"
    setZoom(el, (current) => current + 0.1)
    expect(el.style.zoom).toBe("1.6")
  })

  it("remembers the last zoom on the same element", () => {
    const el = document.createElement("div")
    setZoom(el, (current) => current + 0.1)
    setZoom(el, (current) => current + 0.1)
    expect(parseFloat(el.style.zoom)).toBeCloseTo(1.2)
  })

  it("zooms the document when no element is given", () => {
    setZoom(undefined, () => 1.5)
    expect(document.documentElement.style.zoom).toBe("1.5")
    setZoom(undefined, () => 1)
  })
})
