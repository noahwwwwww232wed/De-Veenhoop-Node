<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2 class="form-title">Login</h2>
      <router-link to="/" class="back-link">
  &#8592; Terug naar Home
</router-link>

      <form @submit.prevent="handleLogin">
        <label for="email">E-mail</label>
        <input v-model="email" type="email" id="email" placeholder="E-mail" required />

        <label for="password">Wachtwoord</label>
        <input v-model="password" type="password" id="password" placeholder="Wachtwoord" required />

        <label for="role">Login als:</label>
        <select v-model="role" id="role" required>
          <option disabled value="">Kies een rol</option>
          <option value="leerling">Leerling</option>
          <option value="docent">Docent</option>
        </select>

        <div class="remember-me">
          <label class="remember-label">
            <input type="checkbox" id="remember" v-model="rememberMe" />
            <span>Onthoud mij</span>
          </label>
        </div>

        <button type="submit">Inloggen</button>

        <router-link class="forgot-password-link" to="/forgot-password">Wachtwoord vergeten?</router-link>
        <router-link class="switch-link" to="/register">Nog geen account? Registreren</router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      role: '',
      rememberMe: false
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            rol: this.role, // << hier aangepast van 'role' naar 'rol'
          }),
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem('authToken', result.token);
          localStorage.setItem('userRole', result.rol);   // ook hier 'rol'
          localStorage.setItem('userName', result.name);

          console.log("Login succesvol: ", {
            token: result.token,
            role: result.rol,
            name: result.name
          });

          if (result.rol === 'docent') {
            this.$router.push('/docent-dashboard');
          } else if (result.rol === 'leerling') {
            this.$router.push('/leerling-dashboard');
          }
        } else {
          alert(result.message || 'Login mislukt');
        }
      } catch (err) {
        alert('Fout bij verbinden met server');
        console.error(err);
      }
    },
  },
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

.forgot-password-link,
.switch-link {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #667eea;
  text-decoration: none;
}

.forgot-password-link:hover,
.switch-link:hover {
  text-decoration: underline;
}
.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #667eea;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
}

.back-link:hover {
  text-decoration: underline;
}

</style>
