<script>
  import { link } from 'svelte-spa-router'
</script>
<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
  <div class="navbar-menu">
    <div class="navbar-end">
      <a class="navbar-item" href="/" use:link>Home</a>
      <a class="navbar-item" href="/shortener" use:link>Shortener</a>
      <div data-netlify-identity-menu></div>
    </div>
  </div>
</nav>