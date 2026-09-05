import { describe, expect, it } from "vitest"
import * as zod from "zod"
import { createState } from "../../create/utils/index"
import { enter } from "../../focus/index"
import { registerSurface } from "../../register-surface/index"
import { execute } from "./execute"

describe("execute", () => {
  it("runs the action and passes the surface element", async () => {
    const el = { id: "composer-el" } as unknown as Element
    let received: Element | undefined
    const state = createState()
    registerSurface(state, {
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
    enter(state, "composer")

    await expect(
      execute(state, { actionId: "mail.send" })
    ).resolves.toBeUndefined()
    expect(received).toBe(el)
  })

  it("throws when the surface is not live", async () => {
    const state = createState()
    registerSurface(state, {
      name: "inbox",
      description: "inbox",
      actions: [{ id: "mail.open", description: "Open", run: () => undefined }],
    })

    await expect(
      execute(state, { actionId: "mail.open", surface: "inbox" })
    ).rejects.toThrow("not in the live set")
  })

  it("throws when params do not match", async () => {
    const state = createState()
    registerSurface(state, {
      name: "composer",
      description: "composer",
      actions: [
        {
          id: "mail.send",
          description: "Send",
          params: zod.object({ to: zod.string() }),
          run: () => undefined,
        },
      ],
    })
    enter(state, "composer")

    await expect(
      execute(state, { actionId: "mail.send", params: { to: 1 } })
    ).rejects.toThrow('Invalid params for "mail.send"')
  })
})
