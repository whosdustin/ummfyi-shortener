<script>
  export let title = 'Home';

  $: fullTitle = `Umm Fyi - URL Shortener | ${title}`
</script>

<svelte:head>
  <title>{fullTitle}</title>
</svelte:head>

<main>
  <slot />
</main>