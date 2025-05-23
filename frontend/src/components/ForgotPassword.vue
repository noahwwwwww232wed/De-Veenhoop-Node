<template>
    <div class="auth-page">
      <div class="auth-container">
        <h2 class="form-title">Wachtwoord vergeten</h2>
        <form @submit.prevent="handleReset">
          <label for="email">E-mailadres</label>
          <input v-model="email" type="email" id="email" placeholder="E-mail" required />
          <button type="submit">Verzend resetlink</button>
          <p>{{ message }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        message: ''
      };
    },
    methods: {
      async handleReset() {
        try {
          const response = await fetch('http://localhost:3000/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.email })
          });
  
          const data = await response.json();
          this.message = response.ok
            ? 'Resetlink is verzonden naar je e-mail.'
            : data.message || 'Er is iets misgegaan.';
        } catch (err) {
          this.message = 'Netwerkfout.';
          console.error(err);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* zelfde stijl als andere pagina's */
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
    width: 400px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
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
  }
  
  button:hover {
    background-color: #5a67d8;
  }
  
  p {
    text-align: center;
    margin-top: 1rem;
    color: #333;
  }
  </style>
  