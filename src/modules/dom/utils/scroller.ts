import { isElementScroller } from "./isElementScroller"

export const scroller = (el?: Element): Element | Window | undefined => {
  if (el && isElementScroller(el)) return el
  if (typeof window !== "undefined") return window
  return undefined
}
