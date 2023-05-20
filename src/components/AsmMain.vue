<template>
  <div>
		<h1>{{ msg }}</h1>
		{{ p_data }}
  </div>
</template>

<script setup>
import programmers from '../data/programmers.json'

const p_data = programmers;

defineProps({
	msg: String
})

</script>

<style>

</style>