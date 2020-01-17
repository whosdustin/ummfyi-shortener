<script>
  import api from '../utils/api'
  import { user, redirects, notifications } from '../store'
  import Button from './Button.svelte'

  let destination;
  let loading = false

  async function onSubmit() {
    try {
      loading = true
      const redirect = {
        user: {
          id: $user.id,
          email: $user.email
        },
        destination
      }
      const response = await api.create(redirect)
      redirects.add(response)
      notifications.add(response.message, 'is-success')
      loading = false
      destination = ''
    } catch (error) {
      console.error(error)
      notifications.add('Oops, something went wrong')
    }
  }
</script>

<div class="columns">
  <div class="column is-8 is-offset-2">
    <h1 class="title">Add URL</h1>
    <div class="columns">
      <div class="column">
        <div class="control has-icons-right">
          <input 
            class="input is-large is-rounded"
            type="text" bind:value={destination}
            placeholder="example.com" />
          {#if loading}
            <span class="icon is-right">
              <i class="fas fa-compact-disc fa-spin"></i>
            </span>
          {/if}
        </div>
      </div>
      <div class="column is-narrow">
        <Button disabled={loading} size="large" on:click={onSubmit}>
          Shrink
        </Button>
      </div>
    </div>
  </div>
</div>
