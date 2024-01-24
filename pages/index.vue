<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline center-text">
     Bienvenido a ECOSAE    
    </v-card-title>
        <v-card-text style="text-align: center;">
      Administración de sistema Analogica-Digital
         <v-card class="pa-5" v-if="statusServer">
          <v-card-text>
            Licencia:  {{ licencia }}
          </v-card-text>
         </v-card>

         <v-card class="pa-5" v-if="!statusServer">
          <v-card-text>
           <v-text-field outlined label="Ingrese su numero de licencia"></v-text-field>

           <v-btn class="red white--text">Validar</v-btn>
          </v-card-text>
         </v-card>


        </v-card-text>
        <v-card-actions>
          <v-spacer />
         
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState} from 'vuex'
export default {
  name: 'IndexPage',
  data(){
    return {
    }
  },
  computed:{
    ...mapState(['datoslicencia','licencia','statusServer'])
  },
  methods:{
    ...mapActions(['revisaLicencia'])
  },
  created(){
    this.revisaLicencia()
  }
}
</script>
