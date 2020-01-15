<script>
	import { onMount } from 'svelte'
	import netlifyIdentity from 'netlify-identity-widget'
	import Router, { push } from 'svelte-spa-router'
	import { user } from './store'
	import api from './utils/api'
	import { routes } from './routes'
	import Nav from './components/Nav.svelte'
	import Notifications from './components/Notifications.svelte'
	
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

	async function redirectIfRequired() {
		try {
			const path = window.location.pathname
			if (path !== '/') {
				const response = await api.find(path.replace('/', ''))
				document.location.href = response.destination
			}
		} catch (error) {
			console.log(error)
			document.location.pathname = '/'
		}
	}
	redirectIfRequired()
</script>

<Nav />
<Router {routes} on:conditionsFailed={() => push('/')} />
<Notifications />
