import type { Action } from "../../../types"
import { setZoom } from "../utils/index"

export const zoomReset: Action["run"] = (_params, { element }) => {
  setZoom(element, () => 1)
}
