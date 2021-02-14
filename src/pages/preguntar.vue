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



    mostrarPreguntes: function() {
      console.log("métod mostrarPreguntes")

      var arrPRSeleccionades2 = []
      // array del Ids dels nodes seleccionats. Sempre son els nodes on hi ha l'array de preguntes-respostes
      console.log("this.ticked")
      console.info(this.ticked)

      // array d'objectes (nodes) del dataTree
      // console.log("this.dataTree")
      // console.log(JSON.stringify(this.dataTree))

      // per cada id dels nodes sel·leccionats, afegim l'array de preguntes-respostes d'aquest node a arrPRSeleccinades2
      this.ticked.forEach(function(itemID){
        // arrPRSeleccionades2.push(trobarPR_seleccionades(this.dataTree, itemID))
        trobarPR_seleccionades(this.dataTree, itemID)
      }, this)
       
      console.log("arrPRSeleccionades2")
      console.log(arrPRSeleccionades2)

      this.$store.dispatch("modulPR/actGenerarPRSeleccionades", arrPRSeleccionades2)
      this.$router.push({ path: "/avaluar" })
      

      // funcio recursiva
      function trobarPR_seleccionades(array, Id) {
        console.log("FUNCIO trobarPR_seleccionades")

        for ( var index=0 ; index < array.length ; index++ ) {
          // "array" es un array d'objectes
          if (array[index].id === Id) {
            // si la propietat "id" del objecte es igual al Id que estem buscant
            console.log("ID TROBAT!! array[index].id: " + array[index].id)
            console.log("\tA continuacio retornem l'array de preguntes d'aquest Id")
            console.info(array[index])
            // 
            // return JSON.parse(JSON.stringify(array[index]))
            arrPRSeleccionades2.push( JSON.parse(JSON.stringify(array[index])) )
          } else {
            console.log("ID " + Id + " no coincideix amb el del node amb id: " + array[index].id)
            // si existeix al propietat "children". Casos de que no existeixi seran nodes d'altres preguntes-respostes
            if (array[index].children !== undefined){
              console.log ("\ten el node SI existeix propietat CHILDREN")
              trobarPR_seleccionades(array[index].children, Id)
            } else {
              console.log ("\tEn el node NO existeix CHILDREN")
              // return
            }
          }
        }
      }

      
    }



  }

}
</script>
