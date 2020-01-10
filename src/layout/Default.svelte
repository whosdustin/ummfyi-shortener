<script>
  import { fade } from 'svelte/transition'
</script>
<main class="container" in:fade={{ duration: 500 }}>
  <slot />
</main>