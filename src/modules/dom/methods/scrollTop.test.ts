/** @vitest-environment jsdom */
import { describe, expect, it, vi } from "vitest"
import { scrollTop } from "./scrollTop"

describe("scrollTop", () => {
  it("scrolls the element to the top", () => {
    const el = document.createElement("div")
    el.scrollTo = vi.fn()
    scrollTop(undefined, { surfaceName: "page", element: el })
    expect(el.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
  })
})
