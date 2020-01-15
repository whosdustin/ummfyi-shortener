<script>
  import { onMount, tick } from 'svelte'
  import { user, redirects } from '../store'
  import api from '../utils/api'
  import RedirectRow from '../components/RedirectRow.svelte'
  import Await from '../components/Await.svelte'

  let promise = getRedirects()
  
  async function getRedirects() {
    try {
      await tick()
      const response = await api.readRedirects($user.id)
      redirects.init(response.redirects)
    } catch (error) {
      console.log(error)
    }
  }
</script>

<table class="table is-fullwidth is-striped">
  <thead>
    <tr>
      <th>Destination</th>
      <th>Short Url</th>
    </tr>
  </thead>
  {#await promise}
    <Await type='table' />
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
