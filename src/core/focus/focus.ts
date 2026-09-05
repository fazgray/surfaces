import type { SurfacesState } from "../../types"
import { clear, enter, leave, pin } from "./methods/index"

export interface Focus {
  enter(surfaceName: string): void
  leave(surfaceName: string): void
  pin(surfaceName: string): void
  clear(): void
}

export const createFocus = (state: SurfacesState): Focus => ({
  enter: (surfaceName) => enter(state, surfaceName),
  leave: (surfaceName) => leave(state, surfaceName),
  pin: (surfaceName) => pin(state, surfaceName),
  clear: () => clear(state),
})
