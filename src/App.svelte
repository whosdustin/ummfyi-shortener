<script>
	import { onMount } from 'svelte'
	import Router, { push } from 'svelte-spa-router'
	import netlifyIdentity from 'netlify-identity-widget'
	import { routes } from './routes'
	import Nav from './components/Nav.svelte'
	
	onMount(() => netlifyIdentity.init());
</script>

<Nav />
<Router {routes} on:conditionsFailed={() => push('/')} />

