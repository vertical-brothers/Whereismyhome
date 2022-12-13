<template>
  <div>
    <div class="col-sm-12 d-flex justify-content-center mt-4">
      <div class="row row-cols-3 col-md-10 h-50 w-100" style="height: 400%">
        <!-- <div class="row row-cols-3 h-8 border" style="width: 100%"> -->
        <div class="rounded border w-20 h-10 list" id="starlist">
          <!-- <h4 class>관심지역 목록</h4> -->
          <table class="table rounded">
            <star-item
              v-for="(star, index) in this.stars"
              :key="index"
              :star="star"
              :index="index"
            >
            </star-item>
          </table>
        </div>

        <div class="col-lg-8 rounded border">
          <!-- <star-kakao-map> <star-overlay /></star-kakao-map> -->
          <star-kakao-map />
          <star-overlay />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarItem from "@/components/star/StarItem.vue";
import StarKakaoMap from "@/components/star/map/StarKakaoMap.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import StarOverlay from "@/components/star/StarOverlay.vue";
const aptDetailStore = "aptDetailStore";
const memberStore = "memberStore";
const StarStore = "StarStore";

export default {
  name: "StarList",
  components: { StarItem, StarKakaoMap, StarOverlay },

  data() {
    return {
      // stars: [],
      // acesstoken: sessionStorage.getItem("access-token"),
    };
  },
  created() {
    console.log("test");
    this.getStars();
  },
  beforeCreate() {
    this.house = null;
  },
  watch: {
    getStarList() {
      console.log("watch");
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapState(aptDetailStore, ["isShow", "houselist", "deallist"]),
    ...mapState(StarStore, ["stars"]),
    getStarList() {
      return this.stars;
    },
  },

  methods: {
    ...mapActions(StarStore, [
      "isDelete",
      "detailHouse",
      "getHouseListByAptname",
      "getHouseListByDongname",
      "getDealByAptcode",
      "getStars",
    ]),
    ...mapMutations(StarStore, ["SET_STARS"]),
  },
};
</script>

<style scoped>
.list {
  height: 900px;
  width: 500px;
  border-radius: 10;
  box-shadow: 5px 5px 5px grey;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.list::-webkit-scrollbar {
  display: none; /* Chrome , Safari , Opera */
}
</style>
