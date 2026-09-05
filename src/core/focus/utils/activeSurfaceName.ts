import type { SurfacesState } from "../../../types"

export const activeSurfaceName = (state: SurfacesState): string | undefined => {
  for (let i = state.live.length - 1; i >= 0; i--) {
    const name = state.live[i]
    if (name && state.pinned.has(name)) return name
  }
  return undefined
}
