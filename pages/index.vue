<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline center-text">
     Bienvenido a ECOSAE    
    </v-card-title>
        <v-card-text style="text-align: center;">
      Administración de sistema Analogica-Digital
         <v-card class="pa-5">
          <v-card-text>
            Licencia: {{ rows[0].apikey }}
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
export default {
  name: 'IndexPage',
  data(){
    return {
      licencia:"No-licencia",
      rows:[]
    }
  },
  async asyncData({ $mysql }) {
    const rows = await new Promise((resolve, reject) => {
      $mysql.query('SELECT * FROM licencia', (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
    
    return {
      rows,
    }
  }
}
</script>
