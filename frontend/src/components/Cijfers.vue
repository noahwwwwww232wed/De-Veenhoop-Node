<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn" @logout="handleLogout" />

    <div v-if="isLoggedIn && userRole === 'docent'" class="cijfers-pagina">
      <h2 class="titel">Selecteer een klas</h2>

      <select v-model="selectedKlas" @change="haalLeerlingenOp" class="dropdown">
        <option value="" disabled>-- Kies een klas --</option>
        <option v-for="klas in klassen" :key="klas.id" :value="klas.id">
          {{ klas.naam }}
        </option>
      </select>

      <div v-if="leerlingen.length > 0">
        <h3>Leerlingen van klas {{ geselecteerdeKlasNaam }}</h3>
        <ul class="leerlingen-lijst">
          <li v-for="leerling in leerlingen" :key="leerling.id" class="leerling-item">
            <div class="leerling-info">
              <span class="leerling-naam">{{ leerling.naam }}</span>
              <button @click="gaNaarCijferPagina(leerling.id)" class="cijfer-knop">
                Cijfer invoeren
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div v-else-if="selectedKlas">
        <p>Geen leerlingen gevonden voor deze klas.</p>
      </div>
    </div>

    <div v-else>
      <p>Alleen bevoegden kunnen deze pagina bezoeken.</p>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

export default {
  name: 'KlasLeerlingen',
  components: { Navbar },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('authToken'),
      userRole: localStorage.getItem('userRole') || null,
      klassen: [],
      leerlingen: [],
      selectedKlas: '',
    };
  },
  computed: {
    geselecteerdeKlasNaam() {
      const klas = this.klassen.find(k => k.id == this.selectedKlas);
      return klas ? klas.naam : '';
    }
  },
  mounted() {
    if (this.isLoggedIn && this.userRole === 'docent') {
      this.haalKlassenOp();
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      this.$router.push('/login');
    },
    async haalKlassenOp() {
      try {
        const response = await axios.get('http://localhost:3000/klassen');
        this.klassen = response.data;
      } catch (error) {
        console.error('Fout bij ophalen van klassen:', error);
      }
    },
    async haalLeerlingenOp() {
      if (!this.selectedKlas) return;
      try {
        const response = await axios.get(`http://localhost:3000/klassen/${this.selectedKlas}/leerlingen`);
        this.leerlingen = response.data;
      } catch (error) {
        console.error('Fout bij ophalen van leerlingen:', error);
        this.leerlingen = [];
      }
    },
    gaNaarCijferPagina(leerlingId) {
      this.$router.push({ name: 'CijfersInvoeren', params: { leerlingId } });
    }
  }
};
</script>

<style scoped>

.cijfer-knop {
  background-color: #5a67d8;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.cijfer-knop:hover {
  background-color: #5a67d8;
}
</style>


<style scoped>
.cijfers-pagina {
  padding: 0px;
  font-family: Arial, sans-serif;
}
.titel {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
.dropdown {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 30px;
}
.leerlingen-lijst {
  list-style: none;
  padding: 0;
  color: #333;
}
.leerling-item {
  background: #ffffff;
  margin-bottom: 15px;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.leerling-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  align-items: center;
  
}
.leerling-naam {
  flex-grow: 1;
}
</style>
