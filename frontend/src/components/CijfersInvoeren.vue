<template>
  <div class="cijfers-invoeren-page">
    <div class="cijfers-invoeren-container">
      <h2 class="form-title">Cijfer invoeren voor leerling ID: {{ leerlingId }}</h2>
      <form @submit.prevent="submitCijfer">
        <label for="periode">Periode:</label>
        <select v-model="selectedPeriode" required>
          <option disabled value="">-- Kies een periode --</option>
          <option v-for="periode in periodes" :key="periode" :value="periode">{{ periode }}</option>
        </select>
 
        <label for="vak">Vak:</label>
        <select v-model="selectedVakId" required>
          <option disabled value="">-- Kies een vak --</option>
          <option v-for="vak in vakken" :key="vak.vak_id" :value="vak.vak_id">{{ vak.naam }}</option>
        </select>
 
        <label for="cijfer">Cijfer:</label>
        <input type="number" v-model="cijfer" min="1" max="10" step="0.1" required />
 
        <button type="submit">Opslaan</button>
      </form>
    </div>
  </div>
</template>
 
<script>
import axios from 'axios';
 
export default {
  name: 'CijfersInvoeren',
  data() {
    return {
      leerlingId: this.$route.params.leerlingId,
      periodes: ['Periode 1', 'Periode 2', 'Periode 3', 'Periode 4'],
      selectedPeriode: '',
      vakken: [],            
      selectedVakId: '',    
      cijfer: ''            
    };
  },
  methods: {
   
    async fetchVakken() {
      try {
        const response = await axios.get('http://localhost:3000/vakken');
        this.vakken = response.data;
      } catch (error) {
        console.error('Fout bij ophalen vakken:', error);
      }
    },
 
   
    async submitCijfer() {
      try {
        console.log('Data verstuurd:', {
          leerlingId: this.leerlingId,
          periode: this.selectedPeriode,
          vakId: this.selectedVakId,
          cijfer: this.cijfer
        });
 
        await axios.post('http://localhost:3000/cijfers', {
          leerlingId: this.leerlingId,
          periode: this.selectedPeriode,
          vakId: this.selectedVakId,
          cijfer: this.cijfer
        });
 
        alert('Cijfer succesvol opgeslagen!');
        this.$router.push('/cijfers');
      } catch (error) {
        console.error('Fout bij opslaan cijfer:', error);
      }
    }
  },
  mounted() {
    this.fetchVakken();
  }
};
</script>
 
<style scoped>
.cijfers-invoeren-page {
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
 
.cijfers-invoeren-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
 
.form-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}
 
label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
  display: block;
}
 
input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border 0.3s;
}
 
input:focus,
select:focus {
  border-color: #667eea;
  outline: none;
}
 
button {
  width: 100%;
  padding: 0.75rem;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}
 
button:hover {
  background-color: #5a67d8;
}
</style>