/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest"
import { readZoom } from "./readZoom"

describe("readZoom", () => {
  it("reads a positive zoom from the element", () => {
    const el = document.createElement("div")
    el.style.zoom = "1.5"
    expect(readZoom(el)).toBe(1.5)
  })

  it("defaults to 1 when zoom is missing or invalid", () => {
    const el = document.createElement("div")
    expect(readZoom(el)).toBe(1)
    el.style.zoom = "0"
    expect(readZoom(el)).toBe(1)
  })
})
