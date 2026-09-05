<script lang="ts">
  import { onMount } from "svelte"
  import { z } from "zod"
  import { create, type RunInput } from "@fazgray/surfaces"
  import { dom } from "@fazgray/surfaces/modules/dom"

  const ui = create({ modules: [dom] })
  const domActions = [
    ["dom.scroll.down", "Scroll down"],
    ["dom.scroll.up", "Scroll up"],
    ["dom.scroll.top", "Scroll to top"],
    ["dom.scroll.bottom", "Scroll to bottom"],
    ["dom.zoom.in", "Zoom in"],
    ["dom.zoom.out", "Zoom out"],
    ["dom.zoom.reset", "Reset zoom"],
  ] as const

  let articleEl: HTMLElement | undefined
  let name = $state("Choice")
  let instructions = $state('Refer to me as "boss".')
  let nameDraft = $state("Choice")
  let instructionsDraft = $state('Refer to me as "boss".')
  let schemaText = $state('{\n  "surfaces": []\n}')
  let flash = $state(false)
  let lastRun = $state("Interact — schema() updates here")
  let live = $state<string[]>([])
  let pinned = $state<string[]>([])
  let flashTimer: ReturnType<typeof setTimeout>

  const isLive = (surfaceName: string) => live.includes(surfaceName)
  const isPinned = (surfaceName: string) => pinned.includes(surfaceName)

  const publish = (label?: string) => {
    schemaText = JSON.stringify(ui.schema(), null, 2)
    live = ui.schema().surfaces.map((surface) => surface.name)
    if (label) lastRun = label
    flash = false
    requestAnimationFrame(() => {
      flash = true
      clearTimeout(flashTimer)
      flashTimer = setTimeout(() => {
        flash = false
      }, 700)
    })
  }

  const act = async (input: RunInput) => {
    const [result] = await ui.run(input)
    const where = input.surface ?? "?"
    if (result?.status === "rejected") {
      publish(`${input.actionId} on ${where}: ${String(result.reason)}`)
      return
    }
    publish(`run ${input.actionId} on ${where}`)
  }

  const enter = (surfaceName: string) => {
    ui.focus.enter(surfaceName)
    publish(`focus.enter("${surfaceName}")`)
  }

  const leave = (surfaceName: string) => {
    ui.focus.leave(surfaceName)
    pinned = pinned.filter((item) => item !== surfaceName)
    publish(`focus.leave("${surfaceName}")`)
  }

  const pin = (surfaceName: string) => {
    ui.focus.pin(surfaceName)
    pinned = [...new Set([...pinned, surfaceName])]
    publish(`focus.pin("${surfaceName}")`)
  }

  const clearFocus = () => {
    ui.focus.clear()
    pinned = []
    publish("focus.clear()")
  }

  onMount(() => {
    if (!articleEl) return

    ui.registerSurface({
      name: "article",
      description: "A long article you can scroll and zoom",
      element: articleEl,
    })
    ui.registerSurface({
      name: "profile",
      description: "AI name and instructions",
      actions: [
        {
          id: "updateName",
          description: "Updates the AI name",
          params: z.object({ name: z.string() }),
          run: ({ name: next }) => {
            name = next
          },
        },
        {
          id: "updateInstructions",
          description: "Updates the AI instructions",
          params: z.object({ instructions: z.string() }),
          run: ({ instructions: next }) => {
            instructions = next
          },
        },
      ],
    })
    ui.focus.enter("article")
    ui.focus.enter("profile")
    publish("registered article + profile")
  })
</script>

{#snippet focusControls(surfaceName: string)}
  <div class="focus">
    <span>Focus</span>
    <button type="button" onclick={() => enter(surfaceName)}>Enter</button>
    <button type="button" onclick={() => leave(surfaceName)}>Leave</button>
    <button type="button" onclick={() => pin(surfaceName)}>Pin</button>
  </div>
{/snippet}

<div class="page">
  <div class="ui">
    <header>
      <div>
        <h1>surfaces</h1>
        <p class="lede">Web UIs that LLMs can act on.</p>
      </div>
      <div class="focus">
        <span>Focus</span>
        <button type="button" onclick={clearFocus}>Clear</button>
      </div>
    </header>

    <section class="surface" class:off={!isLive("profile")}>
      <div class="surface-bar">
        <div>
          <strong>1. Profile</strong>
          <span class="state">
            Status: {isLive("profile") ? "Live" : "Not live"}{isPinned("profile")
              ? " · pinned"
              : ""}
          </span>
        </div>
        {@render focusControls("profile")}
      </div>
      <hr />
      <h3>Actions</h3>
      <label>
        AI name
        <input bind:value={nameDraft} />
      </label>
      <button
        type="button"
        onclick={() =>
          act({
            actionId: "updateName",
            surface: "profile",
            params: { name: nameDraft },
          })}
      >
        Update
      </button>
      <label>
        AI instructions
        <textarea bind:value={instructionsDraft} rows="4"></textarea>
      </label>
      <button
        type="button"
        onclick={() =>
          act({
            actionId: "updateInstructions",
            surface: "profile",
            params: { instructions: instructionsDraft },
          })}
      >
        Update
      </button>
    </section>

    <section class="surface" class:off={!isLive("article")}>
      <div class="surface-bar">
        <div>
          <strong>2. Article</strong>
          <span class="state">
            Status: {isLive("article") ? "Live" : "Not live"}{isPinned("article")
              ? " · pinned"
              : ""}
          </span>
        </div>
        {@render focusControls("article")}
      </div>
      <hr />
      <h3>Actions</h3>
      <div class="actions">
        {#each domActions as [id, label]}
          <button
            type="button"
            onclick={() => act({ actionId: id, surface: "article" })}
          >
            {label}
          </button>
        {/each}
      </div>
      <article bind:this={articleEl}>
        <h2>How it works</h2>
        <p>
          You register surfaces — named regions of your UI — each with actions
          and handlers.
        </p>
        <p>
          Focus decides what’s live. Only the live set goes into schema(). The
          focused schema() is what you send the model.
        </p>
        <p>
          You send that JSON to a model. It returns an actionId, a surface, and
          params. run() validates and calls your handler.
        </p>
        <p>
          Focus — the live surfaces. Several can be live at once, each with
          its own actions.
        </p>
        <p>
          Actions — named capabilities with optional Zod params. What the
          model is allowed to do.
        </p>
        <p>
          Handlers — your functions. The lib never talks to the model.
        </p>
        <p>
          No computer-use, no MCP. You own the UI, the tools, and the model
          call.
        </p>
        <p>
          registerSurface, unregisterSurface, focus.enter, focus.leave,
          focus.pin, focus.clear, schema(), and run().
        </p>
        <p>
          The DOM module adds scroll and zoom to live surfaces that have an
          element: scroll down, scroll up, scroll top, scroll bottom, zoom in,
          zoom out, and zoom reset. They use that element, otherwise the
          window.
        </p>
      </article>
    </section>
  </div>

  <aside class:flash class="schema" aria-live="polite">
    <div class="schema-bar">
      <div class="schema-title">
        <strong>schema()</strong>
        <span class="schema-hint">what the LLM sees</span>
      </div>
      <span class="schema-run">{lastRun}</span>
    </div>
    <pre>{schemaText}</pre>
  </aside>
</div>

<style>
  :global(html, body, #app) {
    margin: 0;
    min-height: 100%;
  }

  :global(html) {
    font: 15px/1.45 system-ui, sans-serif;
    color: #111;
  }

  .page {
    display: grid;
    min-height: 100vh;
  }

  @media (min-width: 900px) {
    .page {
      grid-template-columns: 1fr 1fr;
    }
  }

  .ui {
    background: #efe8d8;
    padding: 1.25rem 1.25rem 2rem;
  }

  .schema {
    background: #1c1d20;
    color: #e6e4dc;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    min-height: 20rem;
  }

  @media (min-width: 900px) {
    .schema {
      position: sticky;
      top: 0;
      height: 100vh;
      min-height: 0;
    }
  }

  .schema.flash {
    background: #3d3518;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  h1 {
    margin: 0;
    font-size: 1.2rem;
  }

  .lede {
    margin: 0.2rem 0 0;
    color: #4a453a;
    font-size: 0.9rem;
  }

  .state {
    color: #4a453a;
    margin: 0.35rem 0 0.6rem;
  }

  .schema-bar {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .schema-title {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .schema-bar strong {
    font-size: 1.2rem;
  }

  .schema-hint,
  .schema-run {
    color: #b4b19f;
    font-size: 0.85rem;
  }

  .schema-run {
    text-align: right;
  }

  pre {
    margin: 0;
    flex: 1;
    overflow: auto;
    font: 12px/1.4 ui-monospace, monospace;
    white-space: pre-wrap;
  }

  .surface {
    background: #f7f3ea;
    border: 1px solid #cfc6b0;
    padding: 0.85rem;
    margin-top: 1rem;
  }

  .surface.off {
    opacity: 0.45;
  }

  .surface-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    margin-bottom: 0;
  }

  hr {
    border: 0;
    border-top: 1px solid #cfc6b0;
    margin: 0.85rem 0 0.7rem;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.05rem;
    font-weight: 650;
  }

  .state {
    display: block;
    margin: 0.15rem 0 0;
    font-size: 0.85rem;
  }

  .focus,
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    align-items: center;
  }

  .focus span {
    font-size: 0.85rem;
    color: #4a453a;
    margin-right: 0.15rem;
  }

  button,
  input,
  textarea {
    font: inherit;
  }

  button {
    padding: 0.2rem 0.5rem;
    cursor: pointer;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin: 0.5rem 0 0.35rem;
  }

  input,
  textarea {
    width: 100%;
    box-sizing: border-box;
  }

  article {
    height: 14rem;
    overflow: auto;
    margin-top: 0.75rem;
    padding: 0.5rem 0.6rem;
    background: #fff;
    border: 1px solid #cfc6b0;
  }

  article h2 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
  }

  article p {
    margin: 0 0 0.7rem;
  }

</style>
