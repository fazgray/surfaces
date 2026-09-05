import { describe, expect, it } from "vitest"
import { moveToEnd } from "./moveToEnd"

describe("moveToEnd", () => {
  it("appends an id that is not in the list", () => {
    const list = ["inbox"]
    moveToEnd(list, "composer")
    expect(list).toEqual(["inbox", "composer"])
  })

  it("moves an existing id to the end", () => {
    const list = ["inbox", "composer", "page"]
    moveToEnd(list, "inbox")
    expect(list).toEqual(["composer", "page", "inbox"])
  })
})
