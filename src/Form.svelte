<script>
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  const dispatch = createEventDispatcher();
  const destination = writable('');
  
  async function onSubmit() {
    try {
      const response = await fetch('/.netlify/functions/generate-route?to=' + $destination)
      const data = await response.text()
      dispatch('response', data)
    } catch (error) {
      console.log(error)
    }
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