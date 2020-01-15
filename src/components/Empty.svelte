<script>
  export let type = 'text';
  export let title;
  export let content;
  let list = Array.from('iiiii');
</script>

{#if type === 'table'}
  {#each list as item}
    <tr>
      <td><div class="block"></div></td>
      <td><div class="block"></div></td>
    </tr>
  {/each}
{/if}

{#if type === 'text'}
  <div class="message is-info">
    {#if title}
      <div class="message-header">
        {title}
      </div>
    {/if}
    <div class="message-body">
      {@html content}
    </div>
  </div>
{/if}

<style>
.block {
  width: 300px;
  height: 1em;
  padding: 0.3em;
  background: #eee;
}
</style>
