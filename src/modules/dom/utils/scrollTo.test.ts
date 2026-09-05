/** @vitest-environment jsdom */
import { describe, expect, it, vi } from "vitest"
import { scrollTo } from "./scrollTo"

describe("scrollTo", () => {
  it("calls scrollTo on the element", () => {
    const el = document.createElement("div")
    el.scrollTo = vi.fn()
    scrollTo(el, 1000)
    expect(el.scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: "smooth" })
  })

  it("sets scrollTop when scrollTo is missing", () => {
    const el = {
      clientHeight: 200,
      scrollTop: 10,
    } as unknown as HTMLElement
    scrollTo(el, 0)
    expect(el.scrollTop).toBe(0)
  })

  it("falls back to the window when no element is given", () => {
    const spy = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined)
    scrollTo(undefined, 0)
    expect(spy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
    spy.mockRestore()
  })
})
