<script>
  import copy from 'clipboard-copy'
  export let destination;
  export let code;

  $: url = `https://umm.fyi/${code}`

  function copyToClipboard() {
    copy(url)
  }
</script>

<tr>
  <td><b>{destination}</b></td>
  <td>
    <a href={url}>{url}</a>
    <button 
      on:click={copyToClipboard} 
      class="button is-small is-pulled-right">
      <span class="icon">
        <i class="far fa-copy"></i>
      </span>
    </button>
  </td>
</tr>