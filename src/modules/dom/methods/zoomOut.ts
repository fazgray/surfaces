import type { Action } from "../../../types"
import { setZoom, ZOOM_MIN, ZOOM_STEP } from "../utils/index"

export const zoomOut: Action["run"] = (_params, { element }) => {
  setZoom(element, (current) => Math.max(current - ZOOM_STEP, ZOOM_MIN))
}
