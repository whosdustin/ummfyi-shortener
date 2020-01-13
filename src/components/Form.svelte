<script>
  import { createEventDispatcher } from 'svelte';
  import { writable, get } from 'svelte/store';
  import { user } from '../store'
  import api from '../utils/api'
  const dispatch = createEventDispatcher();

  let destination;

  async function onSubmit() {
    try {
      const redirect = {
        user: {
          id: $user.id,
          email: $user.email
        },
        destination
      }
      const response = await api.create(redirect)
      dispatch('response', response)
    } catch (error) {
      console.log(error)
    }
  }
</script>

<form>
  <div class="field">
    <label class="label" for="destination">URL</label>
    <input class="input is-large" type="text" bind:value={destination} />
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