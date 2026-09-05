import { isElementScroller } from "./isElementScroller"

export const DEFAULT_SCROLL = 500

export const pageSize = (el?: Element): number => {
  if (el && isElementScroller(el)) {
    return Math.round(el.clientHeight * 0.8) || DEFAULT_SCROLL
  }
  if (typeof window !== "undefined") {
    return Math.round(window.innerHeight * 0.8) || DEFAULT_SCROLL
  }
  return DEFAULT_SCROLL
}
