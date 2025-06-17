<template>
  <div class="dashboard-container">
    <Navbar 
      :isLoggedIn="isLoggedIn" 
      :userRole="userRole" 
      @logout="handleLogout" 
    />
    <div class="dashboard-main">
      <h1>Cijfers Overzicht</h1>
      <div class="dashboard-cards">
        <div v-if="loading">Cijfers laden...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="card" v-for="cijfer in cijfers" :key="cijfer.id">
          <h2>{{ cijfer.vak }}</h2>
          <p>Cijfer: {{ cijfer.cijfer }}</p>
          <p>Leerling: {{ cijfer.leerlingNaam }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

export default {
  name: 'CijfersOverzicht',
  components: { Navbar },
  data() {
    return {
      cijfers: [],
      loading: true,
      error: null,
      isLoggedIn: !!localStorage.getItem('authToken'),
      userRole: null,
      userName: null,
    };
  },
  created() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = this.parseJwt(token);
      this.userRole = payload?.role || null;
      this.userName = payload?.name || null;
    }
    this.fetchCijfers();
  },
  methods: {
    async fetchCijfers() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3000/api/cijfers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.cijfers = response.data;
      } catch (err) {
        this.error = 'Fout bij laden van cijfers.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
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
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      );
      return JSON.parse(jsonPayload);
    },
  },
};
</script>

<style scoped>
/* Zelfde styling als in je voorbeeld */
.dashboard-container {
  background-color: #e8f0fe, #cde0fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-main {
  flex-grow: 1;
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  color: #333;
  font-weight: 700;
  margin-bottom: 2rem;
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
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.card h2 {
  color: #667eea;
  font-weight: 700;
}

.card p {
  color: #555;
  margin: 0.5rem 0;
}
</style>
