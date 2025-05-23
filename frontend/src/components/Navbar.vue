<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img
        src="https://static.edutorial.nl/projecten/veenhoop/logo_veenhoop.jpg"
        alt="Logo"
        class="logo"
      />
    </div>

    <div class="navbar-center">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
    </div>

    <div class="navbar-right">
      <button @click="$emit('logout')" class="logout-button">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 0 2rem;
  height: 70px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar-left .logo {
  height: 40px;
}

.navbar-center {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.navbar-center .nav-link {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.navbar-center .nav-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.logout-button {
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #5a67d8;
}
</style>
