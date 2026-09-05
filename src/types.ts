import * as zod from "zod"

export interface RunContext {
  surfaceName: string
  element?: Element
}

export interface Action<T = unknown> {
  id: string
  description: string
  params?: zod.ZodType<T>
  run: (params: T, context: RunContext) => unknown | Promise<unknown>
}

export interface Surface {
  name: string
  description: string
  element?: Element
  actions?: Action[]
}

export interface Module {
  id: string
  actions: Action[]
}

export type RegisteredSurface = Omit<Surface, "actions"> & {
  actions: Action[]
}

export interface SurfacesState {
  maxLive: number
  modules: Module[]
  surfaces: Map<string, RegisteredSurface>
  live: string[]
  pinned: Set<string>
}
