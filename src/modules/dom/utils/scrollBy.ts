import { scroller } from "./scroller"

export const scrollBy = (el: Element | undefined, top: number): void => {
  const target = scroller(el)
  if (target && "scrollBy" in target && typeof target.scrollBy === "function") {
    target.scrollBy({ top, behavior: "smooth" })
    return
  }
  if (target && "scrollTop" in target) {
    target.scrollTop += top
  }
}
