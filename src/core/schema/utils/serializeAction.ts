import * as zod from "zod"
import type { Action } from "../../../types"
import type { SchemaAction } from "../index"

export const serializeAction = (action: Action): SchemaAction => {
  const serialized: SchemaAction = {
    id: action.id,
    description: action.description,
  }

  if (action.params) {
    serialized.params = zod.toJSONSchema(action.params)
  }

  return serialized
}
