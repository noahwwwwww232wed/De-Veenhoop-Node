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
  .login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  