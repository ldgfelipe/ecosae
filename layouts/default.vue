<template>
  <v-app dark>
    <v-navigation-drawer v-if="statusServer" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>


      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="statusServer" />
      <img src="~/static/icon.png" style="height:60px;" />

      <v-toolbar-title style="font-weight: bold; font-size: large;">{{ title }}</v-toolbar-title>
      <v-spacer />

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Bienvenidos',
          to: '/'
        },
        {
          icon: 'mdi-alarm-panel',
          title: 'Valores',
          to: '/valores'
        },
        {
          icon: 'mdi-cog',
          title: 'Configuración',
          to: '/config'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'EcoSae'
    }
  },
  computed: {
    ...mapState(['statusServer', 'licencia'])
  },
  mounted() {
    this.autoServerInit()
  },
  methods: {
    ...mapActions(['ejecutaInstruccion']),
    ...mapMutations(['updateLicencia']),

    autoServerInit() {

      var licencia = []
      var url = "";
      if (window.location.port !== null) {
        url = 'http://' + window.location.hostname + ':' + window.location.port
      } else {
        url = 'http://' + window.location.hostname
      }

      fetch(url + '/api/validaKey')
        .then(res => res.json())
        .then((res) => {

          licencia = res
          if(this.licencia==="No-licencia"){

          this.updateLicencia(res[0])
          
          }
          if (licencia && licencia[0] && licencia[0].licencia) {

            var payload = {
              action: 'escucha',
              licencia: this.licencia
            }

            fetch('https://apisaecsa.saecsaenergiasolar.com/api/ecosae', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify(payload)
            })

              .then(res => res.json())
              .then((exec) => {

                console.log('....en espera respuesta servidor-----------')
                console.log(exec)
                if(exec.instrucciones.length>0){
                  exec.instrucciones.forEach((data)=>{
                       this.ejecutaInstruccion(data)
                  })
              
                }

                setTimeout(function (scope) {
                  scope.autoServerInit()
                }, 10000, this)
              })
          } else {
            console.log('debe ingresar la licencia para continuar')
          }

        })
    }
  }
}
</script>
