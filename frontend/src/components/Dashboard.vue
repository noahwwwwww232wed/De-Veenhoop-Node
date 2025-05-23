<template>
  <div class="dashboard-page">
    <!-- Navbar component -->
    <Navbar @logout="handleLogout" />

    <!-- Dashboard content -->
    <div class="dashboard-content">
     
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue' // Zorg dat het pad klopt

export default {
  name: "Dashboard",
  components: {
    Navbar,
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("authToken");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.dashboard-content {
  padding: 2rem;
  flex-grow: 1;
}
</style>
