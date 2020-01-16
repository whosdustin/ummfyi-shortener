<script>
  import Nav from '../components/Nav.svelte'
  export let title = 'Home';

  $: fullTitle = `Umm Fyi - URL Shortener | ${title}`
</script>

<svelte:head>
  <title>{fullTitle}</title>
</svelte:head>

<Nav />
<main>
  <slot />
</main>

<style>
main {
  padding-top: var(--navbar-height);
}
</style>