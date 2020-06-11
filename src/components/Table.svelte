<script>
  import Table from "sveltestrap/src/Table.svelte";
	import Progress from 'sveltestrap/src/Progress.svelte';

  export let tableHeading;
  export let tableData;
</script>

<Table bordered responsive>
  <thead>
    <tr>
      {#each tableHeading as heading}
        <th>{heading}</th>
      {/each}
    </tr>
  </thead>
  <tbody>

    {#each tableData as data}
      <tr>
        {#each data as d}
        <td>
          {#if Array.isArray(d)}
            <div style="float:left; width: 60px">{d[0]}-{d[1]}</div>
            <div style="padding-top: 5px">
              <Progress multi>
                <Progress bar color="transparent" value={d[0]} />
                <Progress bar value={d[1] - d[0]} />
              </Progress>
            </div>
          {:else}
            {d}
          {/if}
        </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</Table>
