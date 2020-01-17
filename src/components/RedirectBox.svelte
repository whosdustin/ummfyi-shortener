<script>
  import { fly } from 'svelte/transition'
  import { redirects, notifications } from '../store'
  import api from '../utils/api'
  import copy from 'clipboard-copy'
  import Button from './Button.svelte'
  export let redirect;

  $: url = `https://umm.fyi/${redirect.code}`

  async function deleteRedirect() {
    try {
      const response = await api.remove(redirect.code)
      if (response.ok) {
        redirects.remove(response.data)
        notifications.add(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
</script>

{#if redirect}
<div class="box" 
  in:fly={{ x: -100, duration: 250 }} 
  out:fly={{ y: -50, duration: 400 }}>
  <div class="media">
    <div class="media-left">
      <span class="icon is-large">
        <i class="fas fa-2x fa-link"></i>
      </span>
    </div>
    <div class="media-content">
      <b class="is-size-5">{redirect.destination}</b>
      <p><a href={url}>{url}</a></p>
    </div>
    <div class="media-right">
      <div class="buttons">
        <Button size="small" title="Copy Url" on:click={() => copy(url)}>
          <span class="icon" aria-hidden="true">
            <i class="far fa-copy"></i>
          </span>
        </Button>
        <Button size="small" color="danger" on:click={deleteRedirect}>
          <span class="icon" aria-hidden="true">
            <i class="far fa-trash-alt"></i>
          </span>
        </Button>
      </div>
    </div>
  </div>
</div>
{/if}

<style>
.box {
  color: var(--white-ter);
  background-color: var(--brand-background-ter); 
}
</style>