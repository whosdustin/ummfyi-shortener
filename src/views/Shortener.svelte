<script>
  import Layout from '../layout/Default.svelte'
  import RedirectForm from '../components/RedirectForm.svelte'
  import Redirects from '../components/Redirects.svelte'
  import api from '../utils/api'
  import { notifications } from '../store'
</script>

<Layout title="Shorten">
  <section class="section">
    <RedirectForm /> 
  </section>
  <section class="section">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <Redirects />
      </div>
    </div>
  </section>
</Layout>