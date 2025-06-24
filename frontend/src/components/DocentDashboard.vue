<template>
  <div class="dashboard-container">
    <Navbar 
      :isLoggedIn="isLoggedIn" 
      :userRole="userRole" 
      @logout="handleLogout" 
    />
    <div class="dashboard-main">
      <h1>Welkom, {{ userName || 'docent' }}!</h1>
      <div class="dashboard-cards">
        <div class="card">
          <h2>Leerling Overzicht</h2>
          <p>Bekijk en beheer de cijfers van je leerlingen.</p>
          <router-link to="/cijfers" class="btn">Bekijk Leerlingen</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'DocentDashboard',
  components: { Navbar },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('authToken'),
      userRole: null,
      userName: null,
    };
  },
  created() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = this.parseJwt(token);
      console.log('Decoded JWT payload (docent):', payload);
      this.userRole = payload?.rol || null; 
      this.userName = payload?.name || null;
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('authToken');
      this.isLoggedIn = false;
      this.userRole = null;
      this.userName = null;
      this.$router.push('/login');
    },
    parseJwt(token) {
      if (!token) return null;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  background: linear-gradient(135deg, #e8f0fe 0%, #cde0fc 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-main {
  flex-grow: 1;
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

h1 {
  color: #333;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.dashboard-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.card {
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 1.5rem;
  width: 280px;
  text-align: center;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.card h2 {
  color: #667eea;
  font-weight: 700;
  margin-bottom: 1rem;
}

.card p {
  color: #555;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.btn {
  display: inline-block;
  background-color: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #5a67d8;
}
</style>
