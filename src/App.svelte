<script>
	import { onMount } from 'svelte'
	import Form from './Form.svelte'
	import RouteRow from './RouteRow.svelte'

	let shortenUrl = ''
	let routes = []

	onMount(() => getRoutes())

	function formCallback(event) {
		shortenUrl = event.detail.url
		getRoutes()
	}

	async function getRoutes() {
		const response = await fetch('/.netlify/functions/routes')
		const body = await response.json()

		routes = [...body]
	}

	function buildRoute(code) {
		return `https://umm.fyi/${code}`
	}
</script>

<main class="container">
	<div class="section">
		<div class="columns">
			<div class="column">
				<Form on:response={formCallback}/>
				<a href={shortenUrl}>{shortenUrl}</a>
			</div>
			<div class="column">
				<table class="table is-fullwidth">
					<thead>
						<tr>
							<th>Destination</th>
							<th>Short Url</th>
						</tr>
					</thead>
					{#each routes as route}
						<RouteRow 
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
				</table>
			</div>
		</div>
	</div>
</main>
