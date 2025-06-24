<template>
  <div class="vak-pagina">
    <Navbar :isLoggedIn="isLoggedIn" @logout="handleLogout" />
    <h1 class="titel">Cijfers voor Wiskunde</h1>
    <ul class="cijfer-lijst" v-if="cijfers.length">
      <li v-for="(item, index) in cijfers" :key="index" class="cijfer-item">
        <span class="leerling">{{ item.leerling_naam }}</span>
        <span class="cijfer">{{ item.cijfer }}</span>
      </li>
    </ul>
    <p v-else>Geen cijfers gevonden voor dit vak.</p>
  </div>
</template>
 
<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
 
export default {
  name: 'Wiskunde',
  components: { Navbar },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('authToken'),
      userRole: localStorage.getItem('userRole') || null,
      cijfers: []
    };
  },
  mounted() {
    this.haalCijfersOp();
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$router.push('/login');
    },
    async haalCijfersOp() {
      try {
        const res = await axios.get('http://localhost:3000/api/cijfers/wiskunde');
        this.cijfers = res.data;
      } catch (err) {
        console.error('Fout bij ophalen cijfers:', err);
      }
    }
  }
};
</script>
 
<style scoped>

.titel {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}
.cijfer-lijst {
  list-style: none;
  padding: 0;
  max-width: 600px;
  margin: 0 auto;
  color: #333;
}
.cijfer-item {
  display: flex;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 1rem 1.5rem;
  margin-bottom: 0.75rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.leerling {
  font-weight: 500;
}
.cijfer {
  font-size: 1.2rem;
  color: #4a5568;
}
</style>
 