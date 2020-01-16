<script>
  export let color = 'primary';
  export let size = 'normal';
  export let title;
  $: classList = `button is-rounded is-outlined is-uppercase is-${color} is-${size}`;
</script>

<button {title} class="{classList}" on:click|preventDefault>
  <slot />
</button>