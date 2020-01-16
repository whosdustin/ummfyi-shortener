<script>
  import { fly } from 'svelte/transition'
  import copy from 'clipboard-copy'
  import Button from './Button.svelte'
  export let redirect;

  $: url = `https://umm.fyi/${redirect.code}`
</script>

{#if redirect}
<div class="box" transition:fly={{ x: -200, duration: 400 }}>
  <div class="media">
    <div class="media-left">
      <span class="icon is-large">
        <i class="fas fa-2x fa-link"></i>
      </span>
    </div>
    <div class="media-content">
      <b class="is-size-5">{redirect.destination}</b>
      <p><a href={url}>{url}</a></p>
    </div>
    <div class="media-right">
      <Button size="small" title="Copy Url" on:click={() => copy(url)}>
        <span class="icon" aria-hidden="true">
          <i class="far fa-copy"></i>
        </span>
      </Button>
    </div>
  </div>
</div>
{/if}

<style>
.box {
  color: var(--white-ter);
  background-color: var(--brand-background-ter); 
}
</style>