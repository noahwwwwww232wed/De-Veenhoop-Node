<template>
  <div class="home-page">
    <!-- Navbar bovenaan -->
    <nav class="navbar">
      <div class="navbar-left">
        <img src="https://static.edutorial.nl/projecten/veenhoop/logo_veenhoop.jpg" alt="Logo" class="logo" />
      </div>
      <div class="navbar-links">
        <a href="/">Home</a>
        <a href="/about">About</a>        
      </div>
    </nav>

    <!-- Content links uitgelijnd -->
    <div class="home-container">
      <h2 class="home-title">De Veenhoop</h2>
      <p class="home-text">
        Welkom bij De Veenhoop. Je kunt inloggen of een nieuw account aanmaken.
      </p>
      <div class="home-nav">
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
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  height: 40px;
}

.navbar-links a {
  margin-left: 1.5rem;
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  transition: color 0.3s;
}

.navbar-links a:hover {
  color: #5a67d8;
}

/* Form links */
.home-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 3rem 0 0 2rem; /* links uitgelijnd */
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
  color: #667eea; /* Blauw */
  font-weight: bold;
  transition: color 0.3s;
}

.home-nav a:hover {
  text-decoration: underline;
  color: #5a67d8; /* Donkerder blauw bij hover */
}



.divider {
  color: #999;
}
</style>
