<template>
  <div class="home-page">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-left">
        <img src="https://static.edutorial.nl/projecten/veenhoop/logo_veenhoop.jpg" alt="Logo" class="logo" />
      </div>
      <div class="navbar-center">
        <a href="/">Home</a>
        <a href="/about">About</a>
      </div>
    </nav>

    <!-- Content blokken -->
    <div class="home-content-row">
      <!-- Login/Register blok -->
      <div class="home-container">
        <h2 class="home-title">De Veenhoop</h2>
        <p class="home-text">
          Welkom bij De Veenhoop. Je kunt inloggen of een nieuw account aanmaken.
        </p>

        <div class="home-nav" v-if="!isLoggedIn">
          <router-link to="/login">Inloggen</router-link>
          <span class="divider">|</span>
          <router-link to="/register">Registreren</router-link>
        </div>
      </div>

      <!-- Informatief blok met afbeelding -->
      <div class="home-container info-block">
        
        <div>
          <h2 class="home-title">Integraal platform voor persoonlijke talentontwikkeling</h2>
          <p class="home-text">
            Alles wat u nodig heeft om elke leerling goed uit te rusten voor de toekomst. 
            Op één integraal platform dat al uw leer- en werkprocessen ondersteunt. 
            Waar iedereen soepel samenwerkt. Natuurlijk passend binnen uw onderwijsvisie. 
            En modulair van opzet, dus altijd klaar voor innovaties. Zo dynamisch is De Veenhoop.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    isLoggedIn() {
      return localStorage.getItem('authToken') !== null;
    }
  },
  created() {
    if (localStorage.getItem('authToken')) {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #e8f0fe, #cde0fc);
  min-height: 100vh;
}

/* Navbar */
.navbar {
  width: 100%;
  height: 70px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.navbar-left {
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

.navbar-center {
  display: flex;
  gap: 2rem;
}

.navbar-center a {
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s;
}

.navbar-center a:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.logo {
  height: 40px;
}

/* Content row */
.home-content-row {
  display: flex;
  gap: 2rem;
  margin: 3rem auto;
  flex-wrap: wrap;
  justify-content: center;
}

/* Content blocks */
.home-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.home-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.home-text {
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
}

.home-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.home-nav a {
  text-decoration: none;
  color: #667eea;
  font-weight: bold;
  transition: color 0.3s;
}

.home-nav a:hover {
  text-decoration: underline;
  color: #5a67d8;
}

.divider {
  color: #999;
}

/* Info block met afbeelding */
.info-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-image {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  margin-bottom: 1rem;
}
</style>
