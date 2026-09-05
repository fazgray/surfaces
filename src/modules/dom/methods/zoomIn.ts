import type { Action } from "../../../types"
import { setZoom, ZOOM_MAX, ZOOM_STEP } from "../utils/index"

export const zoomIn: Action["run"] = (_params, { element }) => {
  setZoom(element, (current) => Math.min(current + ZOOM_STEP, ZOOM_MAX))
}
