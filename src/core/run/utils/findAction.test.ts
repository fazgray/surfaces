import { describe, expect, it } from "vitest"
import type { Action } from "../../../types"
import { createState } from "../../create/utils/index"
import { findAction } from "./findAction"

const actionOf = (id: string): Action => ({
  id,
  description: id,
  run: () => undefined,
})

describe("findAction", () => {
  it("finds an action on the surface", () => {
    const state = createState()
    const open = actionOf("mail.open")
    expect(findAction(state, [open], "mail.open")).toBe(open)
  })

  it("finds a module action", () => {
    const ping = actionOf("demo.ping")
    const state = createState({
      modules: [{ id: "demo", actions: [ping] }],
    })
    expect(findAction(state, [], "demo.ping")).toBe(ping)
  })

  it("skips module actions when the surface has no element", () => {
    const ping = actionOf("demo.ping")
    const state = createState({
      modules: [{ id: "demo", actions: [ping] }],
    })
    expect(findAction(state, [], "demo.ping", false)).toBeUndefined()
  })

  it("returns undefined when the action is missing", () => {
    const state = createState()
    expect(
      findAction(state, [actionOf("mail.open")], "mail.send")
    ).toBeUndefined()
  })
})
