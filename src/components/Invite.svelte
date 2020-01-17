<script>
  import { onDestroy } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { writable } from 'svelte/store'
  import { invitation, notifications } from '../store'
  import isEmail from 'validator/es/lib/isEmail'
  import api from '../utils/api'
  import Button from '../components/Button.svelte'
  import Invite from '../models/Invite'

  let email = writable('');
  let isValid = false;

  const unsubscribe = email.subscribe(text => {
    isValid = isEmail(text)
  })

  async function onSubmit() {
    try {
      if (!isValid) { return; }
      const response = await api.invite(new Invite(email));
      
      if (!response.ok && response.message) {
        notifications.add(response.message)
        return;
      }
      notifications.add(response.message, 'is-success')
      invitation.toggle()
      email.set('')
    } catch (error) {
      console.error('Invitation response', error);
      notifications.add('Oops, something went wrong')
    }
  }

  onDestroy(() => unsubscribe())
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
          <div class="control has-icons-left has-icons-right">
            <input 
              type="email"
              placeholder="joandoe@example.com"
              class="input is-rounded is-medium"
              bind:value={$email}>
            <span class="icon is-left" class:has-text-primary={isValid}>
              <i class="fas fa-envelope"></i>
            </span>
            {#if isValid}
              <span class="icon is-right has-text-primary">
                <i class="fas fa-check"></i>
              </span>
            {/if}
          </div>
        </div>
        <div class="field has-text-centered">
          <Button disabled={!isValid} size="medium" on:click={onSubmit}>Send Request</Button>
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