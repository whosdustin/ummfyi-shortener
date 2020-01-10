<script>
  import { onMount } from 'svelte'
  import RedirectRow from '../components/RedirectRow.svelte'
  import Await from '../components/Await.svelte'

  let redirects = [];

  onMount(() => getRedirects())
  
  async function getRedirects() {	
		const response = await fetch('/.netlify/functions/routes')
		const body = await response.json()

		redirects = [...body]
  }

	function buildRedirects(code) {
		return `https://umm.fyi/${code}`
	}
</script>

<table class="table is-fullwidth is-striped">
  {#await getRedirects}
    <Await type='table' />
  {:then}
    <thead>
      <tr>
        <th>Destination</th>
        <th>Short Url</th>
      </tr>
    </thead>
    {#each redirects as route}
      <RedirectRow 
        code={route.data.code} 
        destination={route.data.destination}
      />
    {/each}
    <tfoot>
      <tr>
        <th>Destination</th>
        <th>Short Url</th>
      </tr>
    </tfoot>
  {/await}
</table>
