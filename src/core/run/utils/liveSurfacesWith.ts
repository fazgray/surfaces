import type { SurfacesState } from "../../../types"

export const liveSurfacesWith = (
  state: SurfacesState,
  actionId: string
): string[] => {
  const moduleHas = state.modules.some((module) =>
    module.actions.some((action) => action.id === actionId)
  )
  if (moduleHas) {
    return [...state.live]
  }

  return state.live.filter((name) =>
    state.surfaces.get(name)?.actions.some((action) => action.id === actionId)
  )
}
