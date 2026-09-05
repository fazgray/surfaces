import { describe, expect, it, vi } from "vitest"
import * as zod from "zod"
import { create } from "../create/index"

describe("run", () => {
  it("runs a single action and returns a settled list", async () => {
    const seen: unknown[] = []
    const ui = create()
    ui.registerSurface({
      name: "composer",
      description: "composer",
      actions: [
        {
          id: "mail.send",
          description: "Send",
          params: zod.object({ to: zod.string(), body: zod.string() }),
          run: (params) => {
            seen.push(params)
          },
        },
      ],
    })
    ui.focus.enter("composer")

    const results = await ui.run({
      actionId: "mail.send",
      params: { to: "e@x.com", body: "home for dinner" },
    })

    expect(results).toHaveLength(1)
    expect(results[0]).toEqual({ status: "fulfilled", value: undefined })
    expect(seen).toEqual([{ to: "e@x.com", body: "home for dinner" }])
  })

  it("runs several actions in parallel", async () => {
    const order: string[] = []
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })

    const ui = create({ maxLive: 3 })
    ui.registerSurface({
      name: "composer",
      description: "composer",
      actions: [
        {
          id: "mail.send",
          description: "Send",
          run: async () => {
            await gate
            order.push("send")
          },
        },
      ],
    })
    ui.registerSurface({
      name: "booking",
      description: "booking",
      actions: [
        {
          id: "booking.create",
          description: "Book",
          run: async () => {
            order.push("book")
          },
        },
      ],
    })
    ui.focus.enter("composer")
    ui.focus.enter("booking")

    const pending = ui.run([
      { actionId: "mail.send", surface: "composer" },
      { actionId: "booking.create", surface: "booking" },
    ])

    await vi.waitFor(() => {
      expect(order).toEqual(["book"])
    })
    release()
    const results = await pending

    expect(order).toEqual(["book", "send"])
    expect(results.every((result) => result.status === "fulfilled")).toBe(true)
  })

  it("does not cancel others when one action fails validation", async () => {
    const ran: string[] = []
    const ui = create({ maxLive: 2 })
    ui.registerSurface({
      name: "composer",
      description: "composer",
      actions: [
        {
          id: "mail.send",
          description: "Send",
          params: zod.object({ to: zod.string() }),
          run: () => {
            ran.push("send")
          },
        },
      ],
    })
    ui.registerSurface({
      name: "inbox",
      description: "inbox",
      actions: [
        {
          id: "mail.open",
          description: "Open",
          run: () => {
            ran.push("open")
          },
        },
      ],
    })
    ui.focus.enter("composer")
    ui.focus.enter("inbox")

    const results = await ui.run([
      { actionId: "mail.send", surface: "composer", params: { to: 1 } },
      { actionId: "mail.open", surface: "inbox" },
    ])

    expect(results[0]?.status).toBe("rejected")
    expect(results[1]?.status).toBe("fulfilled")
    expect(ran).toEqual(["open"])
  })

  it("rejects an unknown action", async () => {
    const ui = create()
    ui.registerSurface({ name: "inbox", description: "inbox" })
    ui.focus.enter("inbox")

    const [result] = await ui.run({ actionId: "mail.open" })
    expect(result?.status).toBe("rejected")
    if (result?.status === "rejected") {
      expect(result.reason).toEqual(expect.any(Error))
      expect(String(result.reason)).toContain("Unknown action")
    }
  })

  it("rejects an action on a surface that is not live", async () => {
    const ui = create()
    ui.registerSurface({
      name: "inbox",
      description: "inbox",
      actions: [{ id: "mail.open", description: "Open", run: () => undefined }],
    })

    const [result] = await ui.run({ actionId: "mail.open", surface: "inbox" })
    expect(result?.status).toBe("rejected")
    if (result?.status === "rejected") {
      expect(String(result.reason)).toContain("not in the live set")
    }
  })

  it("routes an unambiguous action without a surface field", async () => {
    const ran: string[] = []
    const ui = create()
    ui.registerSurface({
      name: "inbox",
      description: "inbox",
      actions: [
        {
          id: "mail.open",
          description: "Open",
          run: () => {
            ran.push("open")
          },
        },
      ],
    })
    ui.focus.enter("inbox")

    await ui.run({ actionId: "mail.open" })
    expect(ran).toEqual(["open"])
  })

  it("uses the pinned surface when the same action is on several live surfaces", async () => {
    const ran: string[] = []
    const ui = create({ maxLive: 2 })
    for (const name of ["page", "modal"]) {
      ui.registerSurface({
        name,
        description: name,
        actions: [
          {
            id: "note.add",
            description: "Add a note",
            run: (_params, context) => {
              ran.push(context.surfaceName)
            },
          },
        ],
      })
    }
    ui.focus.enter("page")
    ui.focus.pin("modal")

    await ui.run({ actionId: "note.add" })
    expect(ran).toEqual(["modal"])
  })

  it("asks for a surface when several live surfaces share an action and none is pinned", async () => {
    const ui = create({ maxLive: 2 })
    for (const name of ["page", "modal"]) {
      ui.registerSurface({
        name,
        description: name,
        actions: [
          { id: "note.add", description: "Add a note", run: () => undefined },
        ],
      })
    }
    ui.focus.enter("page")
    ui.focus.enter("modal")

    const [result] = await ui.run({ actionId: "note.add" })
    expect(result?.status).toBe("rejected")
    if (result?.status === "rejected") {
      expect(String(result.reason)).toContain("pass surface")
    }
  })

  it("passes the surface element through to the handler", async () => {
    const el = { id: "composer-el" } as unknown as Element
    let received: Element | undefined
    const ui = create()
    ui.registerSurface({
      name: "composer",
      description: "composer",
      element: el,
      actions: [
        {
          id: "mail.send",
          description: "Send",
          run: (_params, context) => {
            received = context.element
          },
        },
      ],
    })
    ui.focus.enter("composer")

    await ui.run({ actionId: "mail.send" })
    expect(received).toBe(el)
  })
})
