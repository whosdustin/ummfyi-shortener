<script>
  import { slide, fade } from 'svelte/transition'
  import { writable } from 'svelte/store'
  import { openInvite } from '../store'
  import Button from '../components/Button.svelte'

  let email;
  
  const toggleOpen = () => openInvite.update(open => open = !open)

  async function onSubmit() {
    try {
      const response = await fetch('/.netlify/functions/summit-invite?email=' + email)
      const data = await response.json()
      if (data.ok) { toggleOpen() }
    } catch (error) {
      console.log(error)
    }
  }
</script>
{#if $openInvite}
<div class="modal" class:is-active={$openInvite} transition:fade>
  <div on:click={toggleOpen} class="modal-background"></div>
  
  <div class="modal-card" in:slide={{ duration: 500 }} out:fade>
    <section class="modal-card-body">
      <div class="field has-text-centered">
        <h2 class="is-size-2">Request an invite.</h2>
        <p>Toss your email and in the form and wait patiently.</p>
      </div>
      <form>
        <div class="field">
          <label for="email" class="label">Email</label>
          <input type="email" placeholder="joandoe@example.com" class="input" bind:value={email}>
        </div>
        <div class="has-text-centered">
          <Button on:click={onSubmit}>Send Request</Button>
        </div>
      </form>
    </section>
  </div>
  
  <button 
    on:click={toggleOpen}
    class="modal-close is-large"
    aria-label="close">
  </button>
</div>
{/if}