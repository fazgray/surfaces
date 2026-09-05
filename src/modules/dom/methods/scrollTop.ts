import type { Action } from "../../../types"
import { scrollTo } from "../utils/index"

export const scrollTop: Action["run"] = (_params, { element }) => {
  scrollTo(element, 0)
}
