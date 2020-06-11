<script context="module">
	export async function preload(page, session) {
		try {
			const res = await this.fetch(`api/circuit/all.json`);
			const all = await res.json();
			console.log('all', all);
			return { all };
		} catch(e) {
			console.error(e)
		}
	}
</script>

<script>
	import fetch from 'cross-fetch';

	import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import CardText from "sveltestrap/src/CardText.svelte";
  import CardSubtitle from "sveltestrap/src/CardSubtitle.svelte";
	import Row from "sveltestrap/src/Row.svelte";

  import DashboardCard from "../components/DashboardCard.svelte";
  import CustomCard from "../components/CustomCard.svelte";
  import Table from "../components/Table.svelte";
  import AreaChart from "../components/Charts/AreaChart.svelte";
  import BarChart from "../components/Charts/BarChart.svelte";

	let title = "miyo veda";

	export let all;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1 class="mt-4">MIYO Status</h1>
<CustomCard cardTitle="Circuits" cardIcon="fas fa-table">
  <Table
		tableHeading={['Name', 'Irrigation Bounds', 'Moisture', 'Temperature', 'Brightness', 'Irrigation']}
		tableData={Object.keys(all.params.circuits).map((id) => {
			const item = all.params.circuits[id];
			return [
				item.name,
				[item.params.borderBottom, item.params.borderTop],
				`${item.sensorData.stateTypes[0].value}%`,
				`${item.sensorData.stateTypes[1].value} lux`,
				`${item.sensorData.stateTypes[2].value}°C`,
				item.stateTypes[0].value
			];
		})}
	/>
</CustomCard>

