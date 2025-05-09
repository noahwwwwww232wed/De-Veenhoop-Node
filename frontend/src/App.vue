<template>
  <div id="app">
    <h1>Welkom bij mijn Vue-app!</h1>
    <Component />
  </div>
</template>

<script>
import Component from './components/component.vue'

export default {
  name: 'App',
  components: {
    Component // Hier gebruik je ook een hoofdletter
  }
}
</script>

<style scoped>
/* Stijlen voor App.vue */
</style>
