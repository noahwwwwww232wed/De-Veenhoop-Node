<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2 class="form-title">Registreren</h2>
      <form @submit.prevent="handleRegister">
        <label for="naam">Voornaam</label>
        <input v-model="naam" type="text" id="naam" placeholder="Voornaam" required />

        <label for="tussenvoegsels">Tussenvoegsels</label>
        <input v-model="tussenvoegsels" type="text" id="tussenvoegsels" placeholder="Tussenvoegsels" />

        <label for="achternaam">Achternaam</label>
        <input v-model="achternaam" type="text" id="achternaam" placeholder="Achternaam" required />

        <label for="email">E-mail</label>
        <input v-model="email" type="email" id="email" placeholder="E-mail" required />

        <label for="password">Wachtwoord</label>
        <input v-model="password" type="password" id="password" placeholder="Wachtwoord" required />

        <label for="WWbevestigen">Wachtwoord Bevestigen</label>
        <input v-model="confirmPassword" type="password" id="WWbevestigen" placeholder="Wachtwoord bevestigen" required />

        <div class="remember-me">
          <label class="remember-label">
            <input type="checkbox" v-model="rememberMe" />
            <span>Onthoud mij</span>
          </label>
        </div>

        <button type="submit">Registreer</button>
        <p>{{ message }}</p>
        <router-link class="switch-link" to="/login">Al een account? Inloggen</router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      naam: '',
      tussenvoegsels: '',
      achternaam: '',
      email: '',
      password: '',
      confirmPassword: '', // Toegevoegd
      rememberMe: false,
      message: ''
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.message = 'Wachtwoorden komen niet overeen.';
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            naam: this.naam,
            tussenvoegsels: this.tussenvoegsels,
            achternaam: this.achternaam,
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();
        if (response.ok) {
          this.message = 'Registratie gelukt!';
          this.$router.push('/login'); // Ga naar de login pagina na succesvol registratie
        } else {
          this.message = data.message;
        }
      } catch (error) {
        console.error('Fout bij registratie:', error);
        this.message = 'Netwerkfout';
      }
    }
  }
};
</script>

<style scoped>
.auth-page {
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


.auth-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh; /* Maximaal 90% van het scherm */
  overflow-y: auto; /* Scroll als het formulier te hoog is */
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

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border 0.3s;
}

input:focus {
  border-color: #667eea;
  outline: none;
}

.remember-me {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.remember-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #333;
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

p {
  text-align: center;
  font-weight: bold;
  color: #333;
  margin-top: 1rem;
}

.switch-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #667eea;
  text-decoration: none;
}

.switch-link:hover {
  text-decoration: underline;
}
</style>
