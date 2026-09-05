/** @vitest-environment jsdom */
import { describe, expect, it, vi } from "vitest"
import { scrollBottom } from "./scrollBottom"

describe("scrollBottom", () => {
  it("scrolls the element to the bottom", () => {
    const el = document.createElement("div")
    Object.defineProperty(el, "scrollHeight", { value: 1000 })
    el.scrollTo = vi.fn()
    scrollBottom(undefined, { surfaceName: "page", element: el })
    expect(el.scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: "smooth" })
  })
})
