<template>

    <card>
		<card-section class="text-h6"> RESPOSTA </card-section>
		<card-section class="bg-secondary resposta" v-html="resposta2"> </card-section>
    </card>

</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  props: ["resposta"],

  computed: {
    resposta2(){
      console.log(this.resposta.replace(/\n/ig,"<br/><br/>"))
      return this.resposta.replace(/\n/ig,"<br/><br/>")
    }
  }
}
</script>
