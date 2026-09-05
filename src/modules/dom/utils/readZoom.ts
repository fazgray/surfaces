export const readZoom = (el: HTMLElement): number => {
  const parsed = parseFloat(el.style.zoom)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}
