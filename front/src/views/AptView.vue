<template>
  <div class="home">
    <kakao-map></kakao-map>
    <apt-overlay></apt-overlay>
  </div>
</template>

<script>
import KakaoMap from "@/components/apt/map/KakaoMap.vue";
import AptOverlay from "@/components/apt/info/AptOverlay.vue";
export default {
  name: "AptView",
  components: { KakaoMap, AptOverlay },
};
</script>
