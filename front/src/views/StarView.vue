<template>
  <div class="home">
    <star-list />
    <!-- <kakao-map /> -->
    <!-- <main-home /> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import StarList from "@/components/star/StarList.vue";
// import KakaoMap from "@/components/apt/map/KakaoMap.vue";
export default {
  name: "StarView",
  // components: { StarList, KakaoMap },
  components: { StarList },
};
</script>
