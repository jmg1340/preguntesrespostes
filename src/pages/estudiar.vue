<template>
  <q-page class="q-pa-md doc-container">
    <div  class="column q-gutter-xs">

      <!-- <q-list bordered class="rounded-borders"> -->
          
          <q-expansion-item v-for="(item, index) in llista" :key="`llista-${index}`"
            header-class="bg-orange-2 text-black"
            expand-icon-class="text-white"
            expand-separator
            class="q-mb-xs"
          >

            <template v-slot:header >
<!--               
              <q-item-section avatar>
                <q-avatar icon="bluetooth" color="primary" text-color="white" />
              </q-item-section>
 -->

              <q-item-section >
                <q-breadcrumbs gutter="sm" active-color="red-14" separator=">>">
                  <q-breadcrumbs-el
                    v-for="(seccio, index) in item.arrMateries" :key="`item.arrMateries-${index}`"
                    :label="seccio" />
                </q-breadcrumbs>
              </q-item-section>

<!-- 
              <q-item-section side>
                <div class="row items-center">
                </div>
              </q-item-section>
 -->            
            </template>


            <q-card  v-for="(PR, index) in item.arrPreguntesRespostes" :key="`item.arrPreguntesRespostes-${index}`" bordered flat>
              <q-card-section>
                <div class="text-red-10 q-mb-sm">
                  {{ PR.pregunta}}
                </div>

                <!-- <q-separator color="red-10"/> -->

                <div class="">
                  {{ PR.resposta}}
                </div>
              </q-card-section>
              
              

            </q-card>

          </q-expansion-item>
          

      <!-- </q-list> -->

<!-- 
      <div 
        v-for="(item,index) in llista"
        class="row bg-grey-3"
        > {{ item.arrMateries.join(", ") }} </div>
 -->

    </div>




  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  created () {
    // eliminar següent linia quan ja funcioni la pagina
    // this.$store.dispatch("modulPR/actModificarArrPR", "arrDTICauditories")

  	this.crearLlista()

  },

  data () {
  	return {
  		llista: []	// [ {[materies], [preguntes-respostes]}  ]
  	}
  },
  
  computed: {
  	arrPR: function (){
  		return this.$store.state.modulPR.arrPR
  	}
  },

  methods: {
  	crearLlista: function() {

      var arrLlista = []
      var arrMateries = []
      var arrPreguntesRespostes = []
      
    	this.llista = omplirLlista(this.arrPR)


  		function omplirLlista(matriu) {
        
  			
  			for ( let index=0 ; index < matriu.length ; index++ ) {

          //console.log("materia: " + matriu[index].materia)
          arrMateries.push( matriu[index].materia )

  			  if (matriu[index].subMateria != undefined) {
			      omplirLlista( matriu[index].subMateria )
			      //arrLlista.push(objTemp)

  			  } else {
  			  	arrPreguntesRespostes = JSON.parse(JSON.stringify( matriu[index].PR ))
  			    
            // console.log("arrMateries:")
            // console.log(arrMateries)
  			    arrLlista.push({
              arrMateries: arrMateries.slice() , 
              arrPreguntesRespostes
            }) 


  				  arrMateries.pop()
  				  arrPreguntesRespostes = []
  			  
  			  }
  			}
  			return arrLlista
  		}


  	}


  }
}
</script>
