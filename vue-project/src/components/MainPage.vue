<template>
    <div>
        <h1>[MainPage.vue]</h1>
        {{ p_data }}
    </div>
</template>

<script>
import p_data from "../assets/data/programmers.json"
export default {
    setup() {
    },
    data() {
        return {}
    },
    computed() {
        return p_data.map((d) => {
            return d;
        })
    }
}
</script>

<style>

</style>