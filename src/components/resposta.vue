<template>

    <card>
		<card-section class="text-h6"> RESPOSTA </card-section>
		<card-section class="bg-secondary"> {{ resposta }} </card-section>
    </card>

</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  props: ["resposta"]
}
</script>
