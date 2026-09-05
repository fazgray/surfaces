import { isElementScroller } from "./isElementScroller"

export const scrollHeight = (el?: Element): number => {
  if (el && isElementScroller(el)) {
    return el.scrollHeight
  }
  if (typeof document !== "undefined") {
    return document.documentElement.scrollHeight
  }
  return 0
}
