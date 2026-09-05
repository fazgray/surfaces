import { describe, expect, it } from "vitest"
import { assertSurface } from "./assertSurface"

describe("assertSurface", () => {
  it("accepts a surface with no actions", () => {
    expect(() =>
      assertSurface({ name: "page", description: "page" })
    ).not.toThrow()
  })

  it("throws when name is missing", () => {
    expect(() => assertSurface({ name: "", description: "page" })).toThrow(
      "Surface name is required"
    )
  })

  it("throws when description is missing", () => {
    expect(() => assertSurface({ name: "inbox", description: "" })).toThrow(
      'Surface "inbox" is missing a description'
    )
  })

  it("throws when an action id is missing", () => {
    expect(() =>
      assertSurface({
        name: "inbox",
        description: "inbox",
        actions: [{ id: "", description: "Open", run: () => undefined }],
      })
    ).toThrow('Action id is required on surface "inbox"')
  })

  it("throws when an action is missing a description", () => {
    expect(() =>
      assertSurface({
        name: "inbox",
        description: "inbox",
        actions: [{ id: "mail.open", description: "", run: () => undefined }],
      })
    ).toThrow('Action "mail.open" on surface "inbox" is missing a description')
  })

  it("throws on duplicate action ids", () => {
    expect(() =>
      assertSurface({
        name: "inbox",
        description: "inbox",
        actions: [
          { id: "mail.open", description: "A", run: () => undefined },
          { id: "mail.open", description: "B", run: () => undefined },
        ],
      })
    ).toThrow('Duplicate action "mail.open" on surface "inbox"')
  })
})
