import type { SurfacesState } from "../../types"
import { execute } from "./utils/index"

export interface RunInput {
  actionId: string
  surface?: string
  params?: unknown
}

export const run = (
  state: SurfacesState,
  input: RunInput | RunInput[]
): Promise<PromiseSettledResult<unknown>[]> => {
  const calls = Array.isArray(input) ? input : [input]
  return Promise.allSettled(calls.map((call) => execute(state, call)))
}
