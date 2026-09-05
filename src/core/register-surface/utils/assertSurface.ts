import type { Surface } from "../../../types"

export const assertSurface = (surface: Surface): void => {
  if (!surface.name) {
    throw new Error("Surface name is required")
  }

  if (!surface.description) {
    throw new Error(`Surface "${surface.name}" is missing a description`)
  }

  const actions = surface.actions ?? []
  const seen = new Set<string>()

  for (const action of actions) {
    if (!action.id) {
      throw new Error(`Action id is required on surface "${surface.name}"`)
    }
    if (!action.description) {
      throw new Error(
        `Action "${action.id}" on surface "${surface.name}" is missing a description`
      )
    }
    if (seen.has(action.id)) {
      throw new Error(
        `Duplicate action "${action.id}" on surface "${surface.name}"`
      )
    }
    seen.add(action.id)
  }
}
