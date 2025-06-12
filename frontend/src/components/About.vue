<template>
  <div>
    <Navbar :isLoggedIn="isLoggedIn" @logout="handleLogout" />

    <div class="about-page">
      <main class="content">
        <section class="card">
          <h1>Over dit platform</h1>
          <p>
            Dit platform is ontworpen om leerlingen, docenten en ouders te ondersteunen in het
            onderwijsproces. Alles draait om overzicht, eenvoud en betrouwbaarheid.
          </p>
          <p>
            Van roosterbeheer tot resultatenoverzicht: wij zorgen dat jij kunt focussen op wat echt telt.
          </p>
        </section>

        <section class="card">
          <h2>Belangrijkste kenmerken</h2>
          <ul>
            <li>✔️ Gebruiksvriendelijke interface</li>
            <li>✔️ Veilig en AVG-proof</li>
            <li>✔️ Snel inzicht in cijfers en aanwezigheid</li>
            <li>✔️ Ondersteuning voor leerlingen en docenten</li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'About',
  components: {
    Navbar,
  },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('authToken'),
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.about-page {
  background: linear-gradient(to bottom, #e8f0fe, #cde0fc);
  min-height: 100vh;
  padding-top: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card h1,
.card h2 {
  color: #4c51bf;
  margin-bottom: 1rem;
  font-weight: 700;
}

.card p {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card ul {
  list-style: none;
  padding-left: 0;
  font-size: 1rem;
  color: #333;
}

.card ul li {
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
}

.card ul li::before {
  content: '✔';
  color: #667eea;
  position: absolute;
  left: 0;
}
</style>
