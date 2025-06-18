<template>
    <div id="app">
      <Navbar /> <!-- Gebruik de component -->
      <router-view /> <!-- Vue Router laadt hier de pagina-componenten in -->
    </div>
  </template>
  
  <script>
  import Navbar from './Navbar.vue' // <--- importeer hier
  
  export default {
    name: 'App',
    components: {
      Navbar // <--- registreer de component hier
    }
  }
  </script>