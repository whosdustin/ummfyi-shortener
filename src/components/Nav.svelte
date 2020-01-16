<script>
  import { link, push } from 'svelte-spa-router'
  import netlifyIdentity from 'netlify-identity-widget'
  import { user } from '../store'
  import { auth } from '../utils/auth'

  import Button from './Button.svelte'

  let authButton = auth.currentUser() ? 'Log out' : 'Log in'

  netlifyIdentity.on('login', u => {
    user.set(u)
    authButton = 'Log out'
    netlifyIdentity.close()
    push('/shortener')
  });

  netlifyIdentity.on('logout', u => {
    netlifyIdentity.close()
    location.reload()
  });
</script>

<nav class="navbar is-spaced is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-menu">
    <div class="navbar-end">
      <a class="navbar-item" href="/" use:link>Home</a>
      <a class="navbar-item" href="/shortener" use:link>Shortener</a>
      {#if $user}
        <div class="navbar-item">{$user.email}</div>
      {/if}
      <div class="navbar-item buttons">
        <Button on:click={() => netlifyIdentity.open()}>{authButton}</Button>
      </div>
    </div>
  </div>
</nav>
