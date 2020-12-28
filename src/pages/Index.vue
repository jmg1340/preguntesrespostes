<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->

    <div class="column">
       
      <div class=".col-4">Seleccionar tema</div>
      
      <div class=".col-4">
      	<q-select color="lime-11" bg-color="green-2" filled v-model="temaSeleccionat" :options="options"  @input="carregaLlistaFitxers" class="text-h4">
      		<template v-slot:prepend>
      		  <q-icon name="event" />
      		</template>
      	</q-select>
      </div> 
    
    </div>
  

  </q-page>
</template>

<style>
</style>

<script>

export default {
  name: 'PageIndex',

  created() {
    //console.log("estic a CREATED")

  	this.temaSeleccionat = this.options.find(function(objOption) {
      return objOption.value === this.$store.state.modulPR.temaSeleccionat
    },this)
    //console.log("this.$store.state.modulPR.temaSeleccionat: " + this.$store.state.modulPR.temaSeleccionat)

  },

  data () {
  	return {
  		temaSeleccionat: "",
      options: [ 
        { label: 'Curs Auditories', value: 'arrCursAuditories' }, 
        { label: 'DTIC auditories', value: 'arrDTICauditories' } 
      ]
  	}
  },

  computed: {
    //arrPR = store.state.modulPR.arrPR
  },

  methods: {
  	carregaLlistaFitxers: function() {
  		console.log("tema seleccionat: " + this.temaSeleccionat.value)
      this.$store.dispatch("modulPR/actModificarArrPR", this.temaSeleccionat.value)
  	}
  }
}
</script>
