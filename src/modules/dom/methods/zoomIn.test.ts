/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { setZoom, ZOOM_MAX } from "../utils/index"
import { zoomIn } from "./zoomIn"

describe("zoomIn", () => {
  it("zooms the element in by a step", () => {
    const el = document.createElement("div")
    zoomIn(undefined, { surfaceName: "page", element: el })
    expect(el.style.zoom).toBe("1.1")
  })

  it("does not zoom past the max", () => {
    const el = document.createElement("div")
    setZoom(el, () => ZOOM_MAX)
    zoomIn(undefined, { surfaceName: "page", element: el })
    expect(el.style.zoom).toBe(String(ZOOM_MAX))
  })
})
