/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { DEFAULT_SCROLL, pageSize } from "./pageSize"

describe("pageSize", () => {
  it("uses 80% of the element's clientHeight", () => {
    const el = document.createElement("div")
    Object.defineProperty(el, "clientHeight", { value: 200 })
    expect(pageSize(el)).toBe(160)
  })

  it("falls back to DEFAULT_SCROLL when the element height is 0", () => {
    const el = document.createElement("div")
    Object.defineProperty(el, "clientHeight", { value: 0 })
    expect(pageSize(el)).toBe(DEFAULT_SCROLL)
  })

  it("uses the window when no element is given", () => {
    expect(pageSize()).toBe(
      Math.round(window.innerHeight * 0.8) || DEFAULT_SCROLL
    )
  })
})
