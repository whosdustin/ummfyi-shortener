<script>
  export let color = 'primary';
  export let size = 'normal';
  export let title = '';
  export let disabled = false;
  $: classList = `button is-rounded is-outlined is-uppercase is-${color} is-${size}`;
</script>

<button {title} {disabled} class="{classList}" on:click|preventDefault>
  <slot />
</button>