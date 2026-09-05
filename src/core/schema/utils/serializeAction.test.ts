import { describe, expect, it } from "vitest"
import * as zod from "zod"
import { serializeAction } from "./serializeAction"

describe("serializeAction", () => {
  it("omits params when an action has none", () => {
    expect(
      serializeAction({
        id: "mail.archive",
        description: "Archive",
        run: () => undefined,
      })
    ).toEqual({
      id: "mail.archive",
      description: "Archive",
    })
  })

  it("includes JSON Schema for action params", () => {
    expect(
      serializeAction({
        id: "mail.send",
        description: "Send a message",
        params: zod.object({
          to: zod.string(),
          body: zod.string(),
        }),
        run: () => undefined,
      }).params
    ).toEqual(
      expect.objectContaining({
        type: "object",
        properties: expect.objectContaining({
          to: expect.objectContaining({ type: "string" }),
          body: expect.objectContaining({ type: "string" }),
        }),
      })
    )
  })
})
