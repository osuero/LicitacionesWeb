<template>
   <nav>
       <v-app-bar  color="cyan darken-1" dark app >
           <v-app-bar-nav-icon @click.stop="drawer = !drawer"  v-if="$store.getters.isAuthenticated"></v-app-bar-nav-icon>
           <v-toolbar-title class="text-uppercase ">
               <span class="font-weight-light">Licitaciones</span>
              
           </v-toolbar-title>
           <v-spacer></v-spacer>
           <v-menu offset-y>
      <template  v-if="$store.getters.isAuthenticated" v-slot:activator="{ on }">
        <v-btn
          text
          v-on="on"
        >
          <v-icon left>expand_more</v-icon>
            <span>Menu</span>
        </v-btn>
      </template>
      <v-list flat>
        <v-list-item v-for="link in links"  :key="link.text" router :to="link.route" active-class="border">
          <v-list-item-title >{{link.text}}</v-list-item-title>
        </v-list-item>
      </v-list>
            </v-menu>
            <v-btn text  v-if="$store.getters.isAuthenticated" @click="salir">
                <span>Salir</span>
                <v-icon right>exit_to_app</v-icon>
             </v-btn>
       </v-app-bar>
      <v-navigation-drawer  v-if="$store.getters.isAuthenticated" v-model="drawer" dark app class="blue-grey darken-4">
          <v-layout column align-center>
               <v-flex class="mt-5"> 
                    <v-avatar size="100">
                            <img src="/img1.png" alt="">
                    </v-avatar>
                    <p class="white--text subheading mt-1 text-center">Usuario</p>
               </v-flex>
               <v-flex class="mt-4 mb-4">
                <Popup />
               </v-flex>
          </v-layout>
          <v-list flat>
              <v-list-item v-for="link in links"  :key="link.text" router :to="link.route" active-class="border">
                  <v-list-item-action>
                     <v-icon >{{link.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content >
                      <v-list-item-title >{{link.text}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
      </v-navigation-drawer>
   </nav>
</template>
<script>
import Popup from './Popup.vue'
import {LOGOUT} from '../store/actions-constant'
export default {
   data: () => ({
      drawer: true,
      links :[
          {icon: 'home', text:'Inicio', route: '/'},
          {icon: 'folder', text:'Empresa', route: '/empresa'},
          {icon: 'folder', text:'Licitaciones', route: '/licitaciones'},
          {icon: 'file_present', text:'Gestor de archivos', route: '/archivo'},
          {icon: 'person', text:'Usuarios', route: '/perfil'}
      ]
     
    }),
    components: {
    Popup
  },
  methods: {
    salir () {
      this.$store.dispatch(LOGOUT);
      this.$router.push('login')
    }
  },

   
}
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>
