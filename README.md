# @fazgray/surfaces

Build web UIs that LLMs can act on.

## Install

```bash
pnpm add @fazgray/surfaces
```

## Usage

You're on the page. You say "scroll down."

```ts
import { create } from "@fazgray/surfaces"
import { dom } from "@fazgray/surfaces/modules/dom"

const ui = create({ modules: [dom] })

ui.registerSurface({
  name: "chat",
  description: "The chat page",
  element: pageEl,
})
ui.focus.enter("chat")

await ui.run(await model(ui.schema(), "scroll down"))
```

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
await ui.run(result)
```

- **`maxLive`** — how many surfaces can be live at once. Default `8`.
- **`modules`** — optional action groups. Pass `[dom]` for scroll and zoom, or omit to turn them off.
- **`focus`** — the live set. `enter` / `leave` move surfaces in and out. `pin` keeps a surface live and makes it the default target when the same action exists on more than one surface.
- **`schema()`** — only the live surfaces, as JSON (descriptions + JSON Schema). That is what you send to a model.
- **`run`** — validates params and executes the handler. Pass `surface` when the `actionId` is ambiguous.

## DOM module

```ts
import { dom } from "@fazgray/surfaces/modules/dom"
```

Adds `dom.scroll.down`, `dom.scroll.up`, `dom.scroll.top`, `dom.scroll.bottom`, `dom.zoom.in`, `dom.zoom.out`, and `dom.zoom.reset`. They use the surface’s `element` when present, otherwise the window.
