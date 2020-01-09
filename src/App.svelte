<script>
	import Form from './Form.svelte'
	let shortenUrl = ''

	function formCallback(event) {
		shortenUrl = event.detail.url
	}
</script>

<main>
	<Form on:response={formCallback}/>
	<a href={shortenUrl}>{shortenUrl}</a>
</main>
