<template>
  <div class="home">
    <main-home />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// @ is an alias to /src
import MainHome from "@/components/home/MainHome.vue";

export default {
  name: "HomeView",
  components: {
    MainHome,
  },
};
</script>
