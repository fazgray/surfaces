import type { SurfacesState } from "../../../types"
import { assertRegistered, evict, moveToEnd } from "../utils/index"

export const enter = (state: SurfacesState, surfaceName: string): void => {
  assertRegistered(state, surfaceName)
  moveToEnd(state.live, surfaceName)
  evict(state)
}
