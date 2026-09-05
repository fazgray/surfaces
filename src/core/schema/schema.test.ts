import { describe, expect, it } from "vitest"
import type { Module } from "../../types"
import { create } from "../create/index"

describe("schema", () => {
  it("returns an empty window when nothing is focused", () => {
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
    expect(ui.schema()).toEqual({ surfaces: [] })
  })

  it("omits registered surfaces that are not live", () => {
    const ui = create()
    ui.registerSurface({
      name: "inbox",
      description: "inbox",
      actions: [{ id: "mail.open", description: "Open", run: () => undefined }],
    })
    ui.registerSurface({
      name: "composer",
      description: "composer",
      actions: [{ id: "mail.send", description: "Send", run: () => undefined }],
    })
    ui.focus.enter("composer")

    expect(ui.schema()).toEqual({
      surfaces: [
        {
          name: "composer",
          description: "composer",
          actions: [{ id: "mail.send", description: "Send" }],
        },
      ],
    })
  })

  it("is capped by maxLive", () => {
    const ui = create({ maxLive: 1 })
    ui.registerSurface({ name: "inbox", description: "inbox" })
    ui.registerSurface({ name: "composer", description: "composer" })
    ui.focus.enter("inbox")
    ui.focus.enter("composer")
    expect(ui.schema().surfaces.map((s) => s.name)).toEqual(["composer"])
  })

  it("appends module actions after the surface's own", () => {
    const extra: Module = {
      id: "demo",
      actions: [{ id: "demo.ping", description: "Ping", run: () => undefined }],
    }
    const ui = create({ modules: [extra] })
    ui.registerSurface({
      name: "inbox",
      description: "inbox",
      actions: [{ id: "mail.open", description: "Open", run: () => undefined }],
    })
    ui.focus.enter("inbox")

    expect(ui.schema().surfaces[0]?.actions.map((c) => c.id)).toEqual([
      "mail.open",
      "demo.ping",
    ])
  })
})
