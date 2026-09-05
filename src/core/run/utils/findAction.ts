import type { Action, SurfacesState } from "../../../types"

export const findAction = (
  state: SurfacesState,
  surfaceActions: Action[],
  actionId: string
): Action | undefined =>
  surfaceActions.find((action) => action.id === actionId) ??
  state.modules
    .flatMap((module) => module.actions)
    .find((action) => action.id === actionId)
