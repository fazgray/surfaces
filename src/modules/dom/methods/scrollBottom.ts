import type { Action } from "../../../types"
import { scrollHeight, scrollTo } from "../utils/index"

export const scrollBottom: Action["run"] = (_params, { element }) => {
  scrollTo(element, scrollHeight(element))
}
