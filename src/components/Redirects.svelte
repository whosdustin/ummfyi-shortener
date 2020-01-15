<script>
  import { onMount, tick } from 'svelte'
  import { user, redirects } from '../store'
  import api from '../utils/api'
  import RedirectRow from '../components/RedirectRow.svelte'
  import Empty from '../components/Empty.svelte'

  let promise = getRedirects();
  
  async function getRedirects() {
    try {
      await tick()
      const response = await api.readRedirects($user.id);
      console.log(response)
      redirects.init(response.data.redirects);
    } catch (error) {
      console.log(error)
    }
  }
</script>

{#if $redirects.length}
  <table class="table is-fullwidth is-striped">
    <thead>
      <tr>
        <th>Destination</th>
        <th>Short Url</th>
      </tr>
    </thead>
    {#await promise}
      <Empty type="table" />
    {:then}
      {#each $redirects as route}
        <RedirectRow 
          code={route.data.code} 
          destination={route.data.destination}
        />
      {/each}
    {/await}
    <tfoot>
      <tr>
        <th>Destination</th>
        <th>Short Url</th>
      </tr>
    </tfoot>
  </table>
{:else}
  <Empty title="No URLs have been shrunk yet." content="Once you commence the shrinking process your new born urls will pop out here." />
{/if}
