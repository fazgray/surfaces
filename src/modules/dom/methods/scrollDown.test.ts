/** @vitest-environment jsdom */
import { describe, expect, it, vi } from "vitest"
import { DEFAULT_SCROLL } from "../utils/index"
import { scrollDown } from "./scrollDown"

const scrollable = () => {
  const el = document.createElement("div")
  Object.defineProperty(el, "clientHeight", { value: 200 })
  el.scrollBy = vi.fn()
  return el
}

describe("scrollDown", () => {
  it("scrolls the element down by a page", () => {
    const el = scrollable()
    scrollDown(undefined, { surfaceName: "page", element: el })
    expect(el.scrollBy).toHaveBeenCalledWith({ top: 160, behavior: "smooth" })
  })

  it("scrolls the window when no element is given", () => {
    const spy = vi.spyOn(window, "scrollBy").mockImplementation(() => undefined)
    scrollDown(undefined, { surfaceName: "page" })
    expect(spy).toHaveBeenCalledWith({
      top: Math.round(window.innerHeight * 0.8) || DEFAULT_SCROLL,
      behavior: "smooth",
    })
    spy.mockRestore()
  })
})
