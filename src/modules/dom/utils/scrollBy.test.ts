/** @vitest-environment jsdom */
import { describe, expect, it, vi } from "vitest"
import { scrollBy } from "./scrollBy"

describe("scrollBy", () => {
  it("calls scrollBy on the element", () => {
    const el = document.createElement("div")
    el.scrollBy = vi.fn()
    scrollBy(el, 160)
    expect(el.scrollBy).toHaveBeenCalledWith({ top: 160, behavior: "smooth" })
  })

  it("adds to scrollTop when scrollBy is missing", () => {
    const el = {
      clientHeight: 200,
      scrollTop: 10,
    } as unknown as HTMLElement
    scrollBy(el, 5)
    expect(el.scrollTop).toBe(15)
  })

  it("falls back to the window when no element is given", () => {
    const spy = vi.spyOn(window, "scrollBy").mockImplementation(() => undefined)
    scrollBy(undefined, 160)
    expect(spy).toHaveBeenCalledWith({ top: 160, behavior: "smooth" })
    spy.mockRestore()
  })
})
