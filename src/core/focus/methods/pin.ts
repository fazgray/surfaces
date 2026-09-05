import type { SurfacesState } from "../../../types"
import { enter } from "./enter"

export const pin = (state: SurfacesState, surfaceName: string): void => {
  enter(state, surfaceName)
  state.pinned.add(surfaceName)
}
