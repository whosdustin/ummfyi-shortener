<script>
  import Layout from '../layout/Default.svelte'
  import Button from '../components/Button.svelte'
  import Invite from '../components/Invite.svelte'
  import { invitation } from '../store'
</script>

<Layout>
  <section class="hero is-fullheight-with-navbar is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-size-1">A Conceited URL Shortener</h1>
        <h2 class="subtitle">Built to inform people what you already know.</h2>
        <Button color="success" on:click={invitation.toggle}>Request Invite</Button>
      </div>
    </div>
  </section>
</Layout>

<Invite />
