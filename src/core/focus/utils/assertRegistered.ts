import type { SurfacesState } from "../../../types"

export const assertRegistered = (
  state: SurfacesState,
  surfaceName: string
): void => {
  if (!state.surfaces.has(surfaceName)) {
    throw new Error(`Surface "${surfaceName}" is not registered`)
  }
}
