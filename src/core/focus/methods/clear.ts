import type { SurfacesState } from "../../../types"

export const clear = (state: SurfacesState): void => {
  state.live = []
  state.pinned.clear()
}
