/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { scrollHeight } from "./scrollHeight"

describe("scrollHeight", () => {
  it("uses the element's scrollHeight", () => {
    const el = document.createElement("div")
    Object.defineProperty(el, "scrollHeight", { value: 1000 })
    expect(scrollHeight(el)).toBe(1000)
  })

  it("uses the document when no element is given", () => {
    expect(scrollHeight()).toBe(document.documentElement.scrollHeight)
  })
})
