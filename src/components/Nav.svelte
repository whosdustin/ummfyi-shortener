<script>
  import { link, push } from 'svelte-spa-router'
  import netlifyIdentity from 'netlify-identity-widget'
  import { user } from '../store'
  import { auth } from '../utils/auth'

  import Button from './Button.svelte'

  let authButton = auth.currentUser() ? 'Log out' : 'Log in'
  let navIsOpen = false;

  const toggleNav = () => navIsOpen = !navIsOpen

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

<nav 
  class="navbar is-spaced is-fixed-top" 
  role="navigation" 
  aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item is-size-4" href="/">
      UMM.FYI
    </a>
    <a 
      on:click={toggleNav}
      href="javascript:;"
      role="button"
      class="navbar-burger burger" 
      aria-label="menu" 
      aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div class="navbar-menu" class:is-active={navIsOpen}>
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
