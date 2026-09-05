import type { Action } from "../../../types"
import { pageSize, scrollBy } from "../utils/index"

export const scrollDown: Action["run"] = (_params, { element }) => {
  scrollBy(element, pageSize(element))
}
