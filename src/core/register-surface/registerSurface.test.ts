import { describe, expect, it } from "vitest"
import * as zod from "zod"
import { create } from "../create/index"

describe("registerSurface", () => {
  it("registers a surface that appears in schema after enter", () => {
    const ui = create()
    ui.registerSurface({
      name: "inbox",
      description: "inbox",
      actions: [
        {
          id: "mail.open",
          description: "Open a message",
          run: () => undefined,
        },
      ],
    })
    expect(ui.schema().surfaces).toEqual([])

    ui.focus.enter("inbox")
    expect(ui.schema().surfaces).toEqual([
      {
        name: "inbox",
        description: "inbox",
        actions: [{ id: "mail.open", description: "Open a message" }],
      },
    ])
  })

  it("allows a surface with no actions", () => {
    const ui = create()
    ui.registerSurface({ name: "page", description: "page" })
    ui.focus.enter("page")
    expect(ui.schema().surfaces[0]?.actions).toEqual([])
  })

  it("replaces an existing surface on re-register", () => {
    const ui = create()
    ui.registerSurface({
      name: "inbox",
      description: "inbox",
      actions: [{ id: "mail.open", description: "Open", run: () => undefined }],
    })
    ui.focus.enter("inbox")
    ui.registerSurface({
      name: "inbox",
      description: "inbox",
      actions: [
        { id: "mail.archive", description: "Archive", run: () => undefined },
      ],
    })

    expect(ui.schema().surfaces[0]?.actions).toEqual([
      { id: "mail.archive", description: "Archive" },
    ])
  })

  it("keeps a surface live when it is re-registered", () => {
    const ui = create()
    ui.registerSurface({ name: "inbox", description: "inbox" })
    ui.focus.enter("inbox")
    ui.registerSurface({
      name: "inbox",
      description: "inbox",
      actions: [
        {
          id: "mail.open",
          description: "Open",
          params: zod.object({ id: zod.string() }),
          run: () => undefined,
        },
      ],
    })
    expect(ui.schema().surfaces.map((s) => s.name)).toEqual(["inbox"])
  })
})
