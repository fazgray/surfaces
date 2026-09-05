/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { scroller } from "./scroller"

describe("scroller", () => {
  it("returns the element when it can scroll", () => {
    const el = document.createElement("div")
    expect(scroller(el)).toBe(el)
  })

  it("returns the window when no element is given", () => {
    expect(scroller()).toBe(window)
  })
})
