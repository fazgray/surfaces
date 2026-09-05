import type { Surface, SurfacesState } from "../../types"
import { assertSurface } from "./utils/index"

export const registerSurface = (
  state: SurfacesState,
  surface: Surface
): void => {
  assertSurface(surface)

  state.surfaces.set(surface.name, {
    name: surface.name,
    description: surface.description,
    element: surface.element,
    actions: surface.actions ?? [],
  })
}
