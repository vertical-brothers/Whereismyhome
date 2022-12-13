<template>
  <div class="home">
    <!-- <router-view></router-view> -->
    <admin-home />
  </div>
</template>

<script>
import AdminHome from "@/components/admin/AdminHome.vue";

export default {
  components: { AdminHome },
  name: "AdminView",
  comments: {
    AdminHome,
  },
};
</script>
