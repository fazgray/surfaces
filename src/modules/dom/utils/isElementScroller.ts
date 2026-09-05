export const isElementScroller = (el: Element): el is HTMLElement =>
  "clientHeight" in el
