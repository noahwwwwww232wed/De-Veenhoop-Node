<template>
    <form @submit.prevent="handleRegister">
      <input v-model="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Wachtwoord" required />
      <button type="submit">Registreer</button>
      <p>{{ message }}</p>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        message: ''
      };
    },
    methods: {
      async handleRegister() {
        try {
          const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          });
  
          const data = await response.json();
          if (response.ok) {
            this.message = 'Registratie gelukt!';
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
  