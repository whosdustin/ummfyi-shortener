<script>
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  const dispatch = createEventDispatcher();
  const destination = writable('');
  
  async function onSubmit() {
    try {
      const response = await fetch('/.netlify/functions/generate-route?to=' + $destination)
      const data = await response.json()
      dispatch('response', data)
    } catch (error) {
      console.log(error)
    }
  }
</script>

<form>
  <div class="field">
    <label class="label" for="destination">URL</label>
    <input class="input is-large" type="text" bind:value={$destination} />
  </div>
  <div class="field">
    <div class="control has-text-centered">
      <button 
        on:click={onSubmit}
        class="button is-primary is-outlined is-rounded is-large">
        Shorten URL
      </button>
    </div>
  </div>
</form>