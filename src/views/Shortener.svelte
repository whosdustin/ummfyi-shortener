<script>
  import Layout from '../layout/Default.svelte'
  import Form from '../components/Form.svelte'
  import Redirects from '../components/Redirects.svelte'
  import api from '../utils/api'

  let shortenUrl;

  function formCallback(event) {
		shortenUrl = event.detail.url
  }
</script>

<Layout title="Shorten">
  <section class="section">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1 class="title">URL Shortener</h1>
              <Form on:response={formCallback}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <Redirects />
      </div>
    </div>
  </section>
</Layout>