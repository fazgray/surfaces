import { describe, expect, it } from "vitest"
import { assertRegistered } from "./assertRegistered"

describe("assertRegistered", () => {
  it("does nothing when the surface is registered", () => {
    expect(() =>
      assertRegistered(
        {
          maxLive: 8,
          modules: [],
          surfaces: new Map([
            ["inbox", { name: "inbox", description: "inbox", actions: [] }],
          ]),
          live: [],
          pinned: new Set(),
        },
        "inbox"
      )
    ).not.toThrow()
  })

  it("throws when the surface is not registered", () => {
    expect(() =>
      assertRegistered(
        {
          maxLive: 8,
          modules: [],
          surfaces: new Map(),
          live: [],
          pinned: new Set(),
        },
        "inbox"
      )
    ).toThrow('Surface "inbox" is not registered')
  })
})
