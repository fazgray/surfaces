import { scroller } from "./scroller"

export const scrollTo = (el: Element | undefined, top: number): void => {
  const target = scroller(el)
  if (target && "scrollTo" in target && typeof target.scrollTo === "function") {
    target.scrollTo({ top, behavior: "smooth" })
    return
  }
  if (target && "scrollTop" in target) {
    target.scrollTop = top
  }
}
