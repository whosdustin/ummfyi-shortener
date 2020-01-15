<script>
  import api from '../utils/api'
  import { user, redirects, notifications } from '../store'
  import Button from './Button.svelte'

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
      redirects.add(response)
      notifications.add(
        `Successfully shortened: ${response.data.redirect}`, 'is-success'
      )
      destination = ''
    } catch (error) {
      console.log(error)
    }
  }
</script>

<div class="columns">
  <div class="column is-8 is-offset-2">
    <h1 class="title">Add URL</h1>
    <div class="columns">
      <div class="column">
        <input class="input is-large is-rounded" type="text" bind:value={destination} placeholder="example.com" />
      </div>
      <div class="column is-narrow">
        <Button size="large" on:click={onSubmit}>Shrink</Button>
      </div>
    </div>
  </div>
</div>
