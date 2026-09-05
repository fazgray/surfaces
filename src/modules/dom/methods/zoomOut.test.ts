/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { setZoom, ZOOM_MIN } from "../utils/index"
import { zoomOut } from "./zoomOut"

describe("zoomOut", () => {
  it("zooms the element out by a step", () => {
    const el = document.createElement("div")
    zoomOut(undefined, { surfaceName: "page", element: el })
    expect(el.style.zoom).toBe("0.9")
  })

  it("does not zoom past the min", () => {
    const el = document.createElement("div")
    setZoom(el, () => ZOOM_MIN)
    zoomOut(undefined, { surfaceName: "page", element: el })
    expect(el.style.zoom).toBe(String(ZOOM_MIN))
  })
})
