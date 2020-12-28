<template>

    <card>
		<card-section class="text-h6"> PREGUNTA </card-section>
		<card-section class="bg-fade"> {{ pregunta }} </card-section>
    </card>

</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  props: ["pregunta"]
}
</script>
