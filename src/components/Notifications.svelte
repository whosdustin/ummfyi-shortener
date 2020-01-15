<script>
  import { notifications } from '../store'
  import { fade, fly } from 'svelte/transition'

  $: classList = (state) => (`notification ${state}`)
</script>

<style>
.notifications {
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  top: 0;
  right: 0;
  z-index: 40;
}

.notification {
  width: 300px;
  margin: 1em 1em 0 0;
}
</style>

{#if $notifications.length > 0}  
  <div class="notifications">
    {#each $notifications as {message, state}}
      <div class={classList(state)} in:fly="{{ x: 300, duration: 400 }}" out:fade>
        <p>{message}</p>
        <button class="delete" on:click={() => notifications.remove(message)} />
      </div>
    {/each}
  </div>
{/if}
