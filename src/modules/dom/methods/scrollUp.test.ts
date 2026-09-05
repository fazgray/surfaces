/** @vitest-environment jsdom */
import { describe, expect, it, vi } from "vitest"
import { scrollUp } from "./scrollUp"

describe("scrollUp", () => {
  it("scrolls the element up by a page", () => {
    const el = document.createElement("div")
    Object.defineProperty(el, "clientHeight", { value: 200 })
    el.scrollBy = vi.fn()
    scrollUp(undefined, { surfaceName: "page", element: el })
    expect(el.scrollBy).toHaveBeenCalledWith({ top: -160, behavior: "smooth" })
  })
})
