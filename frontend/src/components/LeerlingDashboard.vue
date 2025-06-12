<template>
  <div>
    <Navbar 
      :isLoggedIn="isLoggedIn" 
      :userRole="userRole" 
      @logout="handleLogout" 
    />
    <h1>Welkom, leerling!</h1>
    <!-- Rest van je leerling-dashboard hier -->
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'LeerlingDashboard',
  components: { Navbar },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('authToken'),
      userRole: null,
    };
  },
  created() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.userRole = this.parseJwt(token)?.role;
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('authToken');
      this.isLoggedIn = false;
      this.userRole = null;
      this.$router.push('/login');
    },
    parseJwt(token) {
      if (!token) return null;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    },
  },
};
</script>
