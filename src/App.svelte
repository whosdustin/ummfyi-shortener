<script>
	import { onMount } from 'svelte'
	import netlifyIdentity from 'netlify-identity-widget'
	import Router, { push } from 'svelte-spa-router'
	import { user } from './store'
	import api from './utils/api'
	import { routes } from './routes'
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
			console.log(path)
			if (path !== '/') {
				const response = await api.redirect(path.replace('/', ''))
				return response.json()
			}
		} catch (error) {
			document.location.pathname = `/?error=${error}`
		}
	}
	redirectIfRequired()
</script>

<Router {routes} on:conditionsFailed={() => push('/')} />
<Notifications />
