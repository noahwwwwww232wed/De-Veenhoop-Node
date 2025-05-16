<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      <h1 class="dashboard-title">Welkom op je dashboard!</h1>
      <p class="dashboard-text">Je bent succesvol ingelogd.</p>
      <router-link to="/" class="dashboard-link">Terug naar Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
};
</script>

<style scoped>
.dashboard-page {
  background: linear-gradient(to bottom right, #eef2ff, #c3dafe);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.dashboard-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.dashboard-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.dashboard-text {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
}

.dashboard-link {
  display: inline-block;
  background-color: #667eea;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dashboard-link:hover {
  background-color: #5a67d8;
}
</style>
