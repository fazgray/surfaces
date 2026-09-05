/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { isElementScroller } from "./isElementScroller"

describe("isElementScroller", () => {
  it("is true for an HTMLElement", () => {
    expect(isElementScroller(document.createElement("div"))).toBe(true)
  })

  it("is false when clientHeight is missing", () => {
    expect(isElementScroller({} as Element)).toBe(false)
  })
})
