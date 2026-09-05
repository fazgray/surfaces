import type { Module } from "../../types"
import {
  scrollBottom,
  scrollDown,
  scrollTop,
  scrollUp,
  zoomIn,
  zoomOut,
  zoomReset,
} from "./methods/index"

export const dom: Module = {
  id: "dom",
  actions: [
    {
      id: "dom.scroll.down",
      description: "Scroll this surface down",
      run: scrollDown,
    },
    {
      id: "dom.scroll.up",
      description: "Scroll this surface up",
      run: scrollUp,
    },
    {
      id: "dom.scroll.top",
      description: "Scroll this surface to the top",
      run: scrollTop,
    },
    {
      id: "dom.scroll.bottom",
      description: "Scroll this surface to the bottom",
      run: scrollBottom,
    },
    {
      id: "dom.zoom.in",
      description: "Zoom in on this surface",
      run: zoomIn,
    },
    {
      id: "dom.zoom.out",
      description: "Zoom out on this surface",
      run: zoomOut,
    },
    {
      id: "dom.zoom.reset",
      description: "Reset zoom on this surface",
      run: zoomReset,
    },
  ],
}
