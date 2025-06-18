<!-- <template>
  <div>
    <Navbar />
    <h2 class="titel">Leerlingen</h2>
  </div>
  <div class="cijfers-pagina">

    <ul class="leerlingen-lijst">
      <li v-for="user in users" :key="user.id" class="leerling-item">

        <div class="leerling-info">
          <span class="leerling-naam"> {{ user.naam }}</span>
          <span class="leerling-klas"><strong>Klas:</strong> {{ user.klas }}</span>-
          <input v-model="user.cijfer" type="number" class="cijfer-input" placeholder="Cijfer" min="1" max="10" maxlength="2"/>
        </div>
      </li>
    </ul>

    <button class="invoeren-knop" @click="verwerkCijfers">Invoeren</button>
  </div>
  </template>


<script>
import Navbar from './Navbar.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      users: [],
      klassen: [],
    };
  }, 
  methods: {
    async verwerkCijfers() {
      try {
        const response = await axios.post('http://localhost:3000/api/cijfers', this.users);
        console.log('Cijfers succesvol ingevoerd:', response.data);
        alert('Cijfers succesvol ingevoerd!');
      } catch (error) {
        console.error('Fout bij invoeren cijfers:', error);
        alert('Er is een fout opgetreden bij het invoeren van de cijfers.');
      }
    },
  },
  async mounted() {

    try {
      const response = await axios.get('http://localhost:3000/api/namen');
      this.users = response.data;
    } catch (error) {
      console.error('Fout bij ophalen studenten:', error);
    }
  },
};
</script>

<style scoped>
.cijfers-pagina {
  max-width: 1200px;
  width: 50vw;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.titel {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.leerlingen-lijst {
  list-style: none;
  padding: 0;
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

.cijfer-input {
  width: 80px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.invoeren-knop {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;
}

.invoeren-knop:hover {
  background-color: #0056b3;
}
</style> -->

<template>
  <div class="cijfers-pagina">
    <Navbar />
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
          </div>
        </li>
      </ul>
    </div>

    <div v-else-if="selectedKlas">
      <p>Geen leerlingen gevonden voor deze klas.</p>
    </div>
  </div>
</template>

<script>



import Navbar from './Navbar.vue';
import axios from 'axios';

export default {
  name: 'KlasLeerlingen',
  components: {
    Navbar
  },
  data() {
    return {
      klassen: [],
      leerlingen: [],
      selectedKlas: '',
    };
  },
  computed: {
    geselecteerdeKlasNaam() {
      const klas = this.klassen.find(k => k.id === parseInt(this.selectedKlas));
      return klas ? klas.naam : '';
    }
  },
  mounted() {
    this.haalKlassenOp();
  },
  methods: {
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
    }
  }
};
</script>

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



