# Surfaces

Build web UIs that LLMs can act on.

[Demo](https://fazgray.github.io/surfaces/)

---

<br/>

```ts
import { create } from "@fazgray/surfaces"
import { z } from "zod"

const ui = create()

ui.registerSurface({
  name: "chat",
  description: "The chat thread and composer",
  actions: [
    {
      id: "addChat",
      description: "Send a message to the LLM",
      params: z.object({ message: z.string() }),
      run: ({ message }) => addChat(message),
    },
  ],
})

ui.focus.enter("chat")

const result = await model(ui.schema(), prompt)
await ui.run(result)
```

The focused `schema()` is what you send the model.

## How it works

1. You register surfaces — named regions of your UI — each with actions and handlers.
2. `focus` decides what’s live. Only the live set goes into `schema()`.
3. You send that JSON to a model. It returns `{ actionId, surface, params }`. `run` validates and calls your handler.

- **Focus** — the live surfaces. Several can be live at once, each with its own actions.
- **Actions** — named capabilities with optional Zod params. What the model is allowed to do.
- **Handlers** — your functions. The lib never talks to the model.

No computer-use, no MCP. You own the UI, the tools, and the model call.

## API

```ts
const ui = create({ maxLive?: number, modules?: Module[] })

ui.registerSurface({ name, description, element?, actions? })
ui.unregisterSurface(surfaceName)

ui.focus.enter(surfaceName)
ui.focus.leave(surfaceName)
ui.focus.pin(surfaceName)
ui.focus.clear()

ui.schema()
await ui.run({ actionId, surface?, params? })
```

## DOM module

```ts
import { dom } from "@fazgray/surfaces/modules/dom"

const ui = create({ modules: [dom] })
```

Adds scroll and zoom to live surfaces that have an `element`: `dom.scroll.down`, `dom.scroll.up`, `dom.scroll.top`, `dom.scroll.bottom`, `dom.zoom.in`, `dom.zoom.out`, `dom.zoom.reset`. They use that element, otherwise the window.

## MIT
