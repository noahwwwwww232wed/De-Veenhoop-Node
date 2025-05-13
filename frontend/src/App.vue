<template>
  <div id="app">
    

    
    <!-- Hier worden de pagina-componenten geladen -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  margin-bottom: 20px;
}

router-link {
  margin-right: 10px;
}
</style>
