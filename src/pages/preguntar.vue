<template>
  <q-page class="q-pa-md doc-container">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->

	<div class="column col items-center">
		
    <q-tree
      :nodes="dataTree"
      node-key="id"
      selected-color="primary"
      tick-strategy="leaf"
      :ticked.sync="ticked"
      default-expand-all
    />
<!-- 
    <div class="col q-my-md">
      {{ dataTree }}
    </div>
 -->    

<!--  
    <div class="col q-my-md">
      {{ ticked.join(", ") }}
    </div>
 -->
    <div class="q-bt-lg">
      <q-btn color="teal" @click="mostrarPreguntes">mostrar preguntes</q-btn>
    </div>

<!-- 
    <div class="col">
      {{ arrPRSeleccionades }}
    </div>
 -->

	</div>


  </q-page>
</template>

<style>
</style>

<script>
import cmp_pregunta from "components/pregunta"
import cmp_resposta from "components/resposta"
//import xxfitxer from "../fitxers/DTICauditories.pr"

export default {
  name: 'PageIndex',
  components: {cmp_pregunta, cmp_resposta},

  created () {
  	
  	this.loadingDataTree()

  	//console.log("DATA TREE:")
  	//console.log(JSON.stringify(this.dataTree))
  
 },
  

  data () {
    return {
      splitterModel: 100,
      selected: '',
      ticked: [],
     
      dataTree: [
        {
          label: 'Relax Hotel',
          children: [
            {
              label: 'Food',
              icon: 'restaurant_menu'
            },
            {
              label: 'Room service',
              icon: 'room_service'
            },
            {
              label: 'Room view',
              icon: 'photo'
            }
          ]
        }
      ],
    }

  },

  
  computed: {
    arrPR: function (){
      return this.$store.state.modulPR.arrPR
    },
    
    arrPRSeleccionades: function (){
      return this.$store.state.modulPR.arrPRSeleccionades
    }
  },


  methods: {
  	// funcio recursiva
  	loadingDataTree: function () {
      
      var comptador = 1
      this.dataTree = omplirDataTree(this.arrPR)

      function omplirDataTree(array) {
        var arrDataTree = []

        for ( var index=0 ; index < array.length ; index++ ) {

          var objTemp = {}
          objTemp.id = comptador++
          objTemp.label = array[index].materia

          if (array[index].subMateria) {
              objTemp.children = omplirDataTree(array[index].subMateria)
              arrDataTree.push(objTemp)

          } else {
            objTemp.icon = "school"
            objTemp.iconColor = "negative"
            objTemp.handler = "mostrarPreguntes"
            objTemp.PR = array[index].PR.slice()
            arrDataTree.push(objTemp)
          
          }
        }
        return arrDataTree

      }

    },



    mostrarPreguntes: function(node) {
      var arrPRSeleccionades2 = []
      
      this.ticked.forEach(function(itemID){
        arrPRSeleccionades2.push(trobarPR_seleccionades(this.dataTree, itemID))
      }, this)
       
      this.$store.dispatch("modulPR/actGenerarPRSeleccionades", arrPRSeleccionades2)
      this.$router.push({ path: "/avaluar" })
      
      function trobarPR_seleccionades(array, Id) {
        for ( var index=0 ; index < array.length ; index++ ) {
          if (array[index].id === Id) {
            return JSON.parse(JSON.stringify(array[index]))
          } else {
            if (array[index].children !== undefined)
              return trobarPR_seleccionades(array[index].children, Id)
          }
        }
      }

      
    }



  }

}
</script>
