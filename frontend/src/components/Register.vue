<template>
  <form @submit.prevent="handleRegister">
    <h2 class="form-title">Registreren</h2>
    <label for="email">E-mail</label>
    <input v-model="email"  placeholder="E-mail" required />
    <label for="password">Wachtwoord</label>
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
          const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
              name: "test"
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
  
  <style scoped>
body {
  background: linear-gradient(135deg, #667eea, #764ba2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: border 0.3s;
}

input:focus {
  border-color: #667eea;
  outline: none;
}

button {
  padding: 0.75rem;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #5a67d8;
}

p {
  text-align: center;
  font-weight: bold;
  color: #333;
}

.form-title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}
label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }
</style>