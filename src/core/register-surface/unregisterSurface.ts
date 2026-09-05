import type { SurfacesState } from "../../types"
import { leave } from "../focus/index"

export const unregisterSurface = (
  state: SurfacesState,
  surfaceName: string
): void => {
  if (!state.surfaces.has(surfaceName)) return
  state.surfaces.delete(surfaceName)
  leave(state, surfaceName)
}
