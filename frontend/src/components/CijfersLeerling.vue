<template>
   <Navbar :isLoggedIn="isLoggedIn" @logout="handleLogout" />
  <div class="page-wrapper">
    <div class="tile-container">
      <a href="/nederlands" class="tile">Nederlands</a>
      <a href="/wiskunde" class="tile">Wiskunde</a>
      <a href="/engels" class="tile">Engels</a>
    </div>
  </div>
</template>
 
<script>
import Navbar from '@/components/Navbar.vue';
 
export default {
  name: 'TegelsView',
  components: {
    Navbar,
  },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('authToken'),
      userRole: localStorage.getItem('userRole') || null,
    };
  },
};
</script>
 
 
 
<style scoped>
.page-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
 
  font-family: 'Segoe UI', sans-serif;
}
 
.tile-container {
  display: flex;
  gap: 2rem;
}
 
.tile {
  background-color: white; 
  border-radius: 1.5rem;
  padding: 3rem 4rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-width: 150px;
  user-select: none;
  text-decoration: none;
}
 
.tile:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}
</style>
 