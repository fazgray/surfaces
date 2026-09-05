import { readZoom } from "./readZoom"
import { zoomTarget } from "./zoomTarget"

export const ZOOM_STEP = 0.1
export const ZOOM_MIN = 0.5
export const ZOOM_MAX = 3

const zoomLevels = new WeakMap<Element, number>()

export const setZoom = (
  el: Element | undefined,
  next: (current: number) => number
): void => {
  const target = zoomTarget(el)
  if (!target) return

  const current = zoomLevels.get(target) ?? readZoom(target)
  const value = next(current)
  zoomLevels.set(target, value)
  target.style.zoom = String(value)
}
