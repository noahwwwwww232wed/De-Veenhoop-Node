<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2 class="form-title">Login</h2>
      <form @submit.prevent="handleLogin">
        <label for="email">E-mail</label>
        <input v-model="email" type="email" id="email" placeholder="E-mail" required />

        <label for="password">Wachtwoord</label>
        <input v-model="password" type="password" id="password" placeholder="Wachtwoord" required />

        <div class="remember-me">
          <input type="checkbox" id="remember" v-model="rememberMe" />
          <label for="remember">Onthoud mij</label>
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
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Login succesvol!');
          this.$router.push('/'); // navigeer naar home of dashboard
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #e0e7ff, #f0f4ff);
  padding: 20px;
}

.auth-container {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  overflow-y: auto;
}

h2.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

label {
  display: block;
  margin-top: 15px;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #f9f9f9;
}

.remember-me {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

button {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background-color: #6c63ff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #574fd6;
}

.router-link {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #6c63ff;
  font-size: 14px;
  text-decoration: none;
}

.router-link:hover {
  text-decoration: underline;
}
  </style>