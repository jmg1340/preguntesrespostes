<template>
  <q-page class="q-pa-md doc-container">
    
  <div class="q-pa-xs">
    <q-carousel
      v-model="slideInicial"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      arrows
      padding
      control-color="red"
      class="bg-grey-3 rounded-borders"
    >
      <q-carousel-slide  v-for="(obj, index) in arrPRSeleccionadesAleatories" :key="`PR-${index}`" :name="`diapo-${index}`" class="column no-wrap ">

 
        <q-card bordered flat>
          
          <q-card-section >
            <div class="text-right">
              <q-btn @click="mostrarResultats">
                {{ index + 1 }} / {{ arrPRSeleccionadesAleatories.length }}
              </q-btn>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-white text-h5 bg-blue-10 q-mb-md q-pa-sm">
              {{ obj.materia }}
            </div>
          </q-card-section>


          <q-card-section>
            <q-expansion-item
              header-class="bg-orange-2 text-black"
              expand-separator
              class=""
            >
              <template v-slot:header >
                <q-item-section >
                  <div class="text-red-10">
                    {{ obj.objPR.pregunta}}
                  </div>
                </q-item-section>
              </template>
              
              <q-card bordered flat>
                <q-card-section>
                  {{ obj.objPR.resposta}}
                </q-card-section>
              </q-card>
           </q-expansion-item>

          </q-card-section>


        </q-card>

        


        <q-card>
          <q-card-section>
            <div class="">
              <q-radio v-model="obj.puntuacio" val="1" label="Bé" />
              <q-radio v-model="obj.puntuacio" val="0.5" label="Regular" />
              <q-radio v-model="obj.puntuacio" val="0" label="Malament" />
            </div>
          </q-card-section>
        </q-card>

      </q-carousel-slide>
    </q-carousel>

    


    </div>

  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  created () {
    
    new Promise((resolver, rechazar) => {
        this.arrPreguntesRespostes = this.generarArrPreguntesRespostes()

        resolver();
    })
    .then(() => {
        this.arrPRSeleccionadesAleatories = this.generarArrPRSeleccionadesAleatories()
            
    })
    .catch(() => {
        console.log('Hi ha hagut algun fallo a la Promise de Created');
    })

    
  },

  data () {
  	return {
      arrPreguntesRespostes: [],
      arrPRSeleccionadesAleatories: [],
      slideInicial: "diapo-0"
  	}
  },
  
  methods: {
  	generarArrPreguntesRespostes: function (){
  		/**
        array d'objectes del tipus { id, materia, objPR }
      */
      var arrOriginal = this.$store.state.modulPR.arrPRSeleccionades
      var arrPR = []

      arrOriginal.forEach( function(objOrig, index, array) {
        objOrig.PR.forEach( function( objPR, idx, arrPR2) {
            arrPR.push({
              id: objOrig.id,
              materia: objOrig.label,
              objPR: objPR,
              puntuacio: null
            })
        })
      })
      //console.log("arrPR")
      //console.log(arrPR)
      return arrPR
  	},


    generarArrPRSeleccionadesAleatories: function () {
      var arrOriginal = this.arrPreguntesRespostes.slice()
      
      var arrAleatori = []
      var lengthArrOriginal = arrOriginal.length

      for (var i=1; i<= lengthArrOriginal; i++) {
            //console.log("arrOriginal.length: " + arrOriginal.length)
            var objSeleccionat = getItemArray()[0]
            arrAleatori.push( objSeleccionat )
      }


      //console.log("arrAleatori")
      //console.log(arrAleatori)

      return arrAleatori



      function getItemArray () {
        // sorteig de la posicio de la matriu
        var numeroPosicio = Math.floor(Math.random() * arrOriginal.length);
        return arrOriginal.splice(numeroPosicio,1)
      }


    },


    mostrarResultats: function() {
      var missatge = 
        "Total preguntes: " + this.arrPRSeleccionadesAleatories.length + "<br/>" + 
        "Preguntes contestades: " + (this.arrPRSeleccionadesAleatories.length - this.comptar(null)) + "<br/>" + 
        "<br/>" + 
        "----------------------<br/>" + 
        "<br/>" + 
        "Respostes 'BE': " + this.comptar(1) + "<br/>" + 
        "Respostes 'REGULAR': " + this.comptar(0.5) + "<br/>" + 
        "Respostes 'MALAMENT': " + this.comptar(0) + "<br/>" + 
        "<br/>" + 
        "----------------------<br/>" + 
        "<br/>" + 
        "Nota amb només respostes fetes: " + this.notaNomesRespostesFetes() + "<br/>" + 
        "NOTA: " + this.nota()


      this.$q.dialog({
        dark: true,
        html: true,
        title: 'Puntuacions',
        message: missatge
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })



      console.log("comptar(null): " + this.comptar(null))
      console.log("comptar(1): " + this.comptar(1))
      console.log("comptar(0.5): " + this.comptar(0.5))
      console.log("comptar(0): " + this.comptar(0))
      console.log("------------------")
      console.log("sumar: " + this.sumar())
    },

    comptar:function (valor) {
      var comptador = 0
      this.arrPRSeleccionadesAleatories.forEach(function(item){
        //console.log("item.puntuacio: " + item.puntuacio)
        if (item.puntuacio == valor) comptador++
      })
      return comptador
    },

    sumar:function () {
      var suma = 0
      this.arrPRSeleccionadesAleatories.forEach(function(item){
        if (item.puntuacio != null) suma += parseFloat(item.puntuacio)
      })
      return suma
    },

    notaNomesRespostesFetes: function() {
      var nota = (this.sumar() / (this.arrPRSeleccionadesAleatories.length - this.comptar(null))) * 10
      return Math.round(nota * 100) / 100
    },

    nota: function() {
      var nota = (this.sumar() / this.arrPRSeleccionadesAleatories.length) * 10
      return Math.round(nota * 100) / 100
    }


  
  }



}
</script>
