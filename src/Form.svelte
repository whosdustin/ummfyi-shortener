<script>
  import { createEventDispatcher } from 'svelte'
  import { writable } from 'svelte/store'
  const dispatch = createEventDispatcher()
  const destination = writable('')
  
  const onSubmit = async () => {
    const response = await fetch(`/.netlify/functions/generate-route?to=${$destination}`)
    const json = await response.json()
    dispatch('response', json)
  }
</script>

<form name="make-url">
  <div class="field">
    <label class="label" for="destination">URL</label>
    <input class="input" type="text" bind:value={$destination} />
  </div>
  <div class="field">
    <div class="control">
      <button on:click|preventDefault={onSubmit} class="button">Shorten</button>
    </div>
  </div>
</form>