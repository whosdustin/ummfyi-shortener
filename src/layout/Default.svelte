<script>
  import { fade } from 'svelte/transition'
  export let title = 'Home';

  $: fullTitle = `Umm Fyi - URL Shortener | ${title}`
</script>

<svelte:head>
  <title>{fullTitle}</title>
</svelte:head>

<main in:fade={{ duration: 500 }}>
  <slot />
</main>