<!-- src/components/Home.vue -->
<template>
    <div>
      <h2>De Veenhoop</h2>
      <p>Welkom bij De Veenhoop. Je kunt inloggen of een nieuw account aanmaken.</p>
  
      <nav>
        <router-link to="/login">Inloggen</router-link> |
        <router-link to="/register">Registreren</router-link>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  nav {
    margin-top: 20px;
  }
  
  router-link {
    margin-right: 10px;
    text-decoration: none;
    color: #42b983;
  }
  
  router-link:hover {
    text-decoration: underline;
  }
  </style>
  