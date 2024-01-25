<template>
  <v-app dark>
    <v-navigation-drawer v-if="statusServer"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >

    
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"  v-if="statusServer" />
      <img src="~/static/icon.png" style="height:60px;"/>
     
      <v-toolbar-title style="font-weight: bold; font-size: large;">{{ title }}</v-toolbar-title>
      <v-spacer />
    
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DefaultLayout',
  data () {
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
  computed:{
    ...mapState(['statusServer'])
  }
}
</script>
