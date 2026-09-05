import type { SurfacesState } from "../../../types"
import type { RunInput } from "../index"
import { findAction } from "./findAction"
import { resolveSurface } from "./resolveSurface"

export const execute = async (
  state: SurfacesState,
  call: RunInput
): Promise<unknown> => {
  const surfaceName = call.surface ?? resolveSurface(state, call.actionId)
  if (!surfaceName) {
    throw new Error(`Unknown action "${call.actionId}"`)
  }

  if (!state.live.includes(surfaceName)) {
    throw new Error(`Surface "${surfaceName}" is not in the live set`)
  }

  const surface = state.surfaces.get(surfaceName)
  if (!surface) {
    throw new Error(`Surface "${surfaceName}" is not registered`)
  }

  const action = findAction(
    state,
    surface.actions,
    call.actionId,
    Boolean(surface.element)
  )
  if (!action) {
    throw new Error(
      `Unknown action "${call.actionId}" on surface "${surfaceName}"`
    )
  }

  let params: unknown = call.params
  if (action.params) {
    const parsed = action.params.safeParse(call.params ?? {})
    if (!parsed.success) {
      throw new Error(`Invalid params for "${call.actionId}"`)
    }
    params = parsed.data
  }

  return action.run(params, {
    surfaceName,
    element: surface.element,
  })
}
