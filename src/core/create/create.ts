import type { Surface } from "../../types"
import { createFocus, type Focus } from "../focus/index"
import { registerSurface, unregisterSurface } from "../register-surface/index"
import { run, type RunInput } from "../run/index"
import { schema, type Schema } from "../schema/index"
import { createState, type CreateOptions } from "./utils/index"

export interface Surfaces {
  registerSurface(surface: Surface): void
  unregisterSurface(surfaceName: string): void
  focus: Focus
  schema(): Schema
  run(input: RunInput | RunInput[]): Promise<PromiseSettledResult<unknown>[]>
}

export const create = (options: CreateOptions = {}): Surfaces => {
  const state = createState(options)

  return {
    registerSurface: (surface) => registerSurface(state, surface),
    unregisterSurface: (surfaceName) => unregisterSurface(state, surfaceName),
    focus: createFocus(state),
    schema: () => schema(state),
    run: (input) => run(state, input),
  }
}
