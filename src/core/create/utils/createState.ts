import type { Module, SurfacesState } from "../../../types"

export const DEFAULT_MAX_LIVE = 8

export interface CreateOptions {
  maxLive?: number
  modules?: Module[]
}

export const createState = (options: CreateOptions = {}): SurfacesState => {
  const maxLive = options.maxLive ?? DEFAULT_MAX_LIVE
  if (maxLive < 1) {
    throw new Error("maxLive must be at least 1")
  }

  return {
    maxLive,
    modules: options.modules ?? [],
    surfaces: new Map(),
    live: [],
    pinned: new Set(),
  }
}
