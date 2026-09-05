import type { SurfacesState } from "../../../types"
import { activeSurfaceName } from "../../focus/utils/index"
import { liveSurfacesWith } from "./liveSurfacesWith"

export const resolveSurface = (
  state: SurfacesState,
  actionId: string
): string => {
  const matches = liveSurfacesWith(state, actionId)

  if (matches.length === 0) {
    throw new Error(`Unknown action "${actionId}"`)
  }
  if (matches.length === 1) {
    return matches[0] as string
  }

  const pinned = activeSurfaceName(state)
  if (pinned && matches.includes(pinned)) {
    return pinned
  }

  throw new Error(
    `Action "${actionId}" exists on multiple surfaces; pass surface`
  )
}
