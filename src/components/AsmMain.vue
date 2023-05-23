<template>
  <div>
		<h1>{{ msg }}</h1>
		<div>
			<div class="w-flex wrap mb3">
				<w-button
					class="mr2 mb1"
					@click="table.activeFilter=0"
					:outline="table.activeFilter!==0"
				>
				All
				</w-button>
				<w-button
					class="mr2 mb1"
					@click="table.activeFilter=1"
					:outline="table.activeFilter!==1"
				>
				Solved
				</w-button>
				<w-button
					class="mr2 mb1"
					@click="table.activeFilter=2"
					:outline="table.activeFilter!==2"
				>
				Unsolved
				</w-button>
			</div>
			<w-table
				:headers="table.headers"
				:items="table.items"
				:filter="table.filters[table.activeFilter]"
			>
			</w-table>
		</div>
  </div>
</template>

<script setup>
import programmers from '../data/programmers.json'
import { computed } from 'vue';

const p_data = programmers;
// let table = {
const table = computed(() => {
	return {
		headers: [
			{label: "title", key: "title"},
			{label: "part", key: "part"},
			{label: "link", key: "link"},
			{label: "level", key: "level"},
			{label: "finished_count", key: "finished_count"},
			{label: "acceptance_rate", key: "acceptance_rate"},
			{label: "solved", key: "solved"},
		],
		items: p_data,
		filters: [
			null,
			item => item.solved==='solved',
			item => item.solved==='unsolved'
		],
		activeFilter: 0
	}
})

defineProps({
	msg: String
})

</script>

<style>

</style>