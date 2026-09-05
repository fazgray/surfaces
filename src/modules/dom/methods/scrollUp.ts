import type { Action } from "../../../types"
import { pageSize, scrollBy } from "../utils/index"

export const scrollUp: Action["run"] = (_params, { element }) => {
  scrollBy(element, -pageSize(element))
}
