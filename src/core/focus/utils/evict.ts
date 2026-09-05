import type { SurfacesState } from "../../../types"

export const evict = (state: SurfacesState): void => {
  while (state.live.length > state.maxLive) {
    const newest = state.live[state.live.length - 1]
    const evictAt = state.live.findIndex(
      (id) => id !== newest && !state.pinned.has(id)
    )

    const removeAt = evictAt === -1 ? 0 : evictAt
    const removed = state.live[removeAt]
    state.live.splice(removeAt, 1)
    if (removed) {
      state.pinned.delete(removed)
    }
  }
}
