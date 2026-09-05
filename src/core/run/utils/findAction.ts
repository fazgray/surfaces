import type { Action, SurfacesState } from "../../../types"

export const findAction = (
  state: SurfacesState,
  surfaceActions: Action[],
  actionId: string,
  includeModules = true
): Action | undefined =>
  surfaceActions.find((action) => action.id === actionId) ??
  (includeModules
    ? state.modules
        .flatMap((module) => module.actions)
        .find((action) => action.id === actionId)
    : undefined)
