<script>
  import { onMount } from 'svelte'
  import RedirectRow from '../components/RedirectRow.svelte'
  import Await from '../components/Await.svelte'

  let redirects = [];
  let promise = getRedirects()
  
  onMount(() => promise)
  
  async function getRedirects() {
    try {
      const response = await fetch('/.netlify/functions/routes')
      const body = await response.json()

      redirects = [...body]
    } catch (error) {
      console.log(error)
    }	
		
  }

	function buildRedirects(code) {
		return `https://umm.fyi/${code}`
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
    {#each redirects as route}
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
