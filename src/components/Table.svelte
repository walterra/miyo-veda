<script>
  import Table from "sveltestrap/src/Table.svelte";
	import Progress from 'sveltestrap/src/Progress.svelte';

  // const tableHeading = ["#", "First Name", "Last-Name", "Username"];
  // const tableData = [
  //   { SNo: "1", firstName: "Mark", lastName: "Otto", userName: "@mdo" },
  //   { SNo: "2", firstName: "Jacob", lastName: "Thornton", userName: "@fat" },
  //   { SNo: "3", firstName: "Larry", lastName: "the Bird", userName: "@twitter" }
  // ];
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
            <Progress multi>
              <Progress bar color="transparent" value={d[0]} />
              <Progress bar value={d[1] - d[0]}>{d[0]} - {d[1]}</Progress>
            </Progress>
          {:else}
            {d}
          {/if}
        </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</Table>
