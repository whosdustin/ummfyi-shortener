<script>
  import { onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import { user, redirects, notifications } from '../store'
  import api from '../utils/api'
  import isURL from 'validator/es/lib/isURL'
  import Button from './Button.svelte'

  let destination = writable('');
  let loading = false
  let isValid = false
  let submitAttempt = false

  const unsubscribe = destination.subscribe(url => {
    isValid = isURL(url)
  })

  async function onSubmit() {
    try {
      if (!isValid) {
        submitAttempt = true 
        notifications.add('That doesn\'t look like a real URL. Try again.')
        return;
      }
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
      destination.set('')
    } catch (error) {
      console.error(error)
      notifications.add('Oops, something went wrong')
    }
  }

  onDestroy(() => unsubscribe())
</script>

<div class="columns">
  <div class="column is-8 is-offset-2">
    <h1 class="title">Add URL</h1>
    <div class="columns">
      <div class="column">
        <div class="control has-icons-right">
          <input
            class="input is-large is-rounded"
            type="text" bind:value={$destination}
            placeholder="example.com" />
          {#if loading}
            <span class="icon is-right">
              <i class="fas fa-compact-disc fa-spin"></i>
            </span>
          {/if}
          {#if submitAttempt && !isValid}
            <span class="icon is-right has-text-danger">
              <i class="fas fa-exclamation-circle"></i>
            </span>
          {/if}
          {#if isValid}
            <span class="icon is-right has-text-primary">
              <i class="fas fa-check"></i>
            </span>
          {/if}
        </div>
      </div>
      <div class="column is-narrow">
        <Button disabled={loading} size="large" on:click={onSubmit}>
          <span>Shrink</span>
        </Button>
      </div>
    </div>
  </div>
</div>
