<script>
  import { fade, fly } from 'svelte/transition'
  import { invitation, notifications } from '../store'
  import api from '../utils/api'
  import Button from '../components/Button.svelte'
  import Invite from '../models/Invite'

  let email;

  async function onSubmit() {
    try {
      const response = await api.invite(new Invite(email));
      
      if (!response.ok && response.message) {
        notifications.add(response.message)
        return;
      }
      notifications.add(response.message, 'is-success')
      invitation.toggle()
      email = ''
    } catch (error) {
      console.error('Invitation response', error);
      notifications.add('Oops, something went wrong')
    }
  }
</script>

{#if $invitation}
<div class="modal" class:is-active={$invitation} transition:fade>
  <div on:click={invitation.toggle} class="modal-background"></div>
  
  <div class="modal-card" transition:fly={{ y: -80, duration: 400 }}>
    <section class="modal-card-body">
      <div class="field has-text-centered">
        <h2 class="title">REQUEST AN INVITE.</h2>
        <p class="subtitle">Toss your email in the form and wait patiently.</p>
      </div>
      <form>
        <div class="field">
          <label for="email" class="label is-sr-only">Email</label>
          <input type="email" placeholder="joandoe@example.com" class="input is-rounded is-medium" bind:value={email}>
        </div>
        <div class="field has-text-centered">
          <Button size="medium" on:click={onSubmit}>Send Request</Button>
        </div>
      </form>
    </section>
  </div>
  
  <button 
    on:click={invitation.toggle}
    class="modal-close is-large"
    aria-label="close">
  </button>
</div>
{/if}

<style>
.modal-card-body {
  border-radius: 0.5em;
}
form {
  padding: 1rem;
}
</style>