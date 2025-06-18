<template>
  <div class="home-page">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-left">
        <img src="https://static.edutorial.nl/projecten/veenhoop/logo_veenhoop.jpg" alt="Logo" class="logo" />
      </div>
      <div class="navbar-center">
        <a href="/">Home</a>
        <a href="/cijfers">Cijfers</a>
        <a href="/about">About</a>
      </div>
      <div class="navbar-right"></div> <!-- lege div om ruimte rechts te houden -->
    </nav> 
    <!-- Content -->
    <div class="home-container">
      <h2 class="home-title">De Veenhoop</h2>
      <p class="home-text">
        Welkom bij De Veenhoop. Je kunt inloggen of een nieuw account aanmaken.
      </p>

      <!-- Alleen tonen als niet ingelogd -->
      <div class="home-nav" v-if="!isLoggedIn">
        <router-link to="/login">Inloggen</router-link>
        <span class="divider">|</span>
        <router-link to="/register">Registreren</router-link>
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
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Navbar */
.navbar {
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
  /* verdeel ruimte: logo links, links in midden, rechts lege ruimte */
  justify-content: space-between;
}

.logo {
  height: 40px;
}

/* Navbar flex zones */
.navbar-left {
  flex: 0 0 auto;
}

.navbar-center {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
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

.navbar-right {
  flex: 0 0 100px; /* zorgt voor ruimte rechts, zodat midden echt in het midden staat */
}

/* Content */
.home-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 3rem 0 0 2rem;
  text-align: left;
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
</style>
