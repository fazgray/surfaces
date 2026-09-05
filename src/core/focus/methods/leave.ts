import type { SurfacesState } from "../../../types"

export const leave = (state: SurfacesState, surfaceName: string): void => {
  const index = state.live.indexOf(surfaceName)
  if (index !== -1) {
    state.live.splice(index, 1)
  }
  state.pinned.delete(surfaceName)
}
