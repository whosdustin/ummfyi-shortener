<script>
  export let color = 'primary';
  export let size = 'normal';
  $: classList = `button is-rounded is-outlined is-uppercase is-${color} is-${size}`;
</script>

<button class="{classList}" on:click|preventDefault>
  <slot />
</button>