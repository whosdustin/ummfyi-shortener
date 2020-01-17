<script>
  import { onMount, tick } from 'svelte'
  import { user, redirects } from '../store'
  import api from '../utils/api'
  import RedirectBox from '../components/RedirectBox.svelte'
  import Empty from '../components/Empty.svelte'

  let promise = getRedirects();
  
  async function getRedirects() {
    try {
      await tick()
      const response = await api.readRedirects($user.id);
      redirects.init(response.data);
    } catch (error) {
      console.log(error)
    }
  }
</script>


{#await promise}
  <div class="has-text-centered">
    <span class="icon is-large">
      <i class="fas fa-compact-disc fa-spin fa-3x"></i>
    </span>
  </div>
{:then}
  {#if $redirects.length}
    {#each $redirects as redirect}
      <RedirectBox redirect={redirect.data} />
    {/each}
  {:else}
    <Empty 
      title="No URLs have been shrunk yet." 
      content="Once you commence the shrinking process your new born urls will pop out here." />
  {/if}
{/await}
