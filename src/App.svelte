<script>
	import { onMount } from 'svelte'
	import netlifyIdentity from 'netlify-identity-widget'
	import Router, { push } from 'svelte-spa-router'
	import { user } from './store'
	import { routes } from './routes'
	import Nav from './components/Nav.svelte'
	
	onMount(() => {
		netlifyIdentity.init()
		getUser()
	});

	function getUser() {
		if (localStorage.getItem('gotrue.user')) {
			user.set(JSON.parse(localStorage.getItem('gotrue.user')))
		} else {
			user.set()
		}
	}
</script>

<Nav />
<Router {routes} on:conditionsFailed={() => push('/')} />

