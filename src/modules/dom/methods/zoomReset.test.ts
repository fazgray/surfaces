/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { setZoom } from "../utils/index"
import { zoomReset } from "./zoomReset"

describe("zoomReset", () => {
  it("resets the element zoom to 1", () => {
    const el = document.createElement("div")
    setZoom(el, () => 1.5)
    zoomReset(undefined, { surfaceName: "page", element: el })
    expect(el.style.zoom).toBe("1")
  })
})
