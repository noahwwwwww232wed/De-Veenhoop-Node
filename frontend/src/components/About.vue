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