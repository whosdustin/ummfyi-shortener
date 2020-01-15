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
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h1 class="title">URL Shortener</h1>
          <form>
            <div class="field">
              <label class="label" for="destination">URL</label>
              <input class="input is-large" type="text" bind:value={destination} placeholder="example.com" />
            </div>
            <div class="field">
              <div class="control has-text-centered">
                <Button size="large" on:click={onSubmit}>Shorten URL</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
