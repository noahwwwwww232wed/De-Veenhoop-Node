<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn" @logout="handleLogout" />

    <div class="p-6 max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Cijfers</h1>

      <!-- Leerling weergave -->
      <div v-if="role === 'leerling'">
        <p class="mb-2 font-semibold">Gemiddelde: {{ gemiddelde.toFixed(2) }}</p>
        <ul class="list-disc pl-5">
          <li v-for="cijfer in cijfers" :key="cijfer.id">
            {{ cijfer.vak }} - {{ cijfer.waarde }} ({{ new Date(cijfer.datum).toLocaleDateString() }})
          </li>
        </ul>
      </div>

      <!-- Leraar formulier -->
      <div v-else-if="role === 'leraar'">
        <form @submit.prevent="voegCijferToe" class="space-y-4">
          <div>
            <label>Leerling ID:</label>
            <input
              v-model="form.leerlingId"
              class="border px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div>
            <label>Vak:</label>
            <input
              v-model="form.vak"
              class="border px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div>
            <label>Cijfer:</label>
            <input
              v-model.number="form.waarde"
              type="number"
              step="0.1"
              class="border px-2 py-1 rounded w-full"
              required
            />
          </div>
          <button class="bg-blue-500 text-white px-4 py-2 rounded">Opslaan</button>
          <p v-if="melding" class="mt-2 text-green-600">{{ melding }}</p>
        </form>
      </div>

      <div v-else>
        <p>Je bent niet ingelogd of rol onbekend.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Cijfers",
  components: {
    Navbar,
  },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("authToken"),
      role: "", // 'leraar' of 'leerling'
      cijfers: [],
      gemiddelde: 0,
      form: {
        leerlingId: "",
        vak: "",
        waarde: ""
      },
      melding: ""
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("authToken");
      this.$router.push("/");
    },
    haalRolOp() {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.role = payload.role;
      } catch (err) {
        console.error("Ongeldig token:", err);
      }
    },
    async haalCijfersOp() {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get("http://localhost:3000//leerling/cijfers", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.cijfers = res.data.cijfers;
        this.gemiddelde = res.data.gemiddelde;
      } catch (err) {
        console.error("Fout bij ophalen cijfers:", err);
      }
    },
    async voegCijferToe() {
      const token = localStorage.getItem("authToken");
      try {
        await axios.post("http://localhost:3000//leraar/cijfers", this.form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.melding = "Cijfer succesvol toegevoegd!";
        this.form = { leerlingId: "", vak: "", waarde: "" };
      } catch (err) {
        console.error("Fout bij opslaan cijfer:", err);
      }
    }
  },
  mounted() {
    this.haalRolOp();
    if (this.role === "leerling") {
      this.haalCijfersOp();
    }
  }
};
</script>

<style scoped>
input {
  border: 1px solid #ccc;
}
</style>
