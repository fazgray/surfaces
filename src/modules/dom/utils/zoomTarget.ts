export const zoomTarget = (el?: Element): HTMLElement | undefined => {
  if (el && "style" in el) return el as HTMLElement
  if (typeof document !== "undefined") return document.documentElement
  return undefined
}
