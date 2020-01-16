<script>
  import Layout from '../layout/Default.svelte'
  import Button from '../components/Button.svelte'
  import Invite from '../components/Invite.svelte'
  import { invitation } from '../store'
</script>

<Layout>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-size-1">A Condescending<br/> URL Shortener</h1>
        <h2 class="subtitle">Simply tell people what you already know.</h2>
        <Button size="large" on:click={invitation.toggle}>Request Invite</Button>
      </div>
    </div>
  </section>
</Layout>

<Invite />

<style>
.hero {
  margin-top: calc(var(--navbar-height) / -1);
}
</style>
