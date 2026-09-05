import type { Action, SurfacesState } from "../../types"
import { serializeAction } from "./utils/index"

export type SchemaAction = Pick<Action, "id" | "description"> & {
  params?: Record<string, unknown>
}

export interface SchemaSurface {
  name: string
  description: string
  actions: SchemaAction[]
}

export interface Schema {
  surfaces: SchemaSurface[]
}

export const schema = (state: SurfacesState): Schema => {
  const moduleActions = state.modules.flatMap((module) => module.actions)

  return {
    surfaces: state.live.flatMap((name) => {
      const surface = state.surfaces.get(name)
      if (!surface) return []

      return [
        {
          name: surface.name,
          description: surface.description,
          actions: [
            ...surface.actions,
            ...(surface.element ? moduleActions : []),
          ].map(serializeAction),
        },
      ]
    }),
  }
}
