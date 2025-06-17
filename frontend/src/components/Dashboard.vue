<template>
  <div>
    <!-- <Navbar :isLoggedIn="isLoggedIn" @logout="handleLogout" /> -->

    <div v-if="userRole === 'docent'">
      <DocentDashboard />
    </div>
    <div v-else-if="userRole === 'leerling'">
      <LeerlingDashboard />
    </div>
    <div v-else>
      <p>Je bent niet ingelogd of hebt een onbekende rol.</p>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import DocentDashboard from '@/components/DocentDashboard.vue';
import LeerlingDashboard from '@/components/LeerlingDashboard.vue';

export default {
  name: "Dashboard",
  components: {
    Navbar,
    DocentDashboard,
    LeerlingDashboard,
  },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("authToken"),
      userRole: null,
    };
  },
  created() {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Let op: hier 'rol' ipv 'role' omdat dat in je JWT payload staat
      this.userRole = this.parseJwt(token)?.rol;
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("authToken");
      this.$router.push("/login");
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
    }
  },
};
</script>
