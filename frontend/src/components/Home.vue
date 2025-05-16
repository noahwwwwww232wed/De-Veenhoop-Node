<template>
  <div class="home-page">
    <div class="home-container">
      <h2 class="home-title">De Veenhoop</h2>
      <p class="home-text">
        Welkom bij De Veenhoop. Je kunt inloggen of een nieuw account aanmaken.
      </p>

      <nav class="home-nav">
        <router-link to="/login">Inloggen</router-link>
        <span class="divider">|</span>
        <router-link to="/register">Registreren</router-link>
      </nav>
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
  background: linear-gradient(to bottom right, #eef2ff, #c3dafe);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.home-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
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
  justify-content: center;
  gap: 1rem;
}

router-link {
  text-decoration: none;
  color: #667eea;
  font-weight: bold;
  transition: color 0.3s;
}

router-link:hover {
  text-decoration: underline;
}

.divider {
  color: #999;
}
</style>
