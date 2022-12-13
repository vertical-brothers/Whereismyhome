<template>
  <b-card
    :title="star.dong"
    img-src="https://cdn.pixabay.com/photo/2016/11/13/12/52/kuala-lumpur-1820944_960_720.jpg"
    img-height="150"
    img-alt="Image"
    img-top
    width="200"
    tag="article"
    class="mb-2"
    style="text-align: left"
    @click="
      setStarno(star.starNo), search(star.lat, star.lng, star.aptCode, $event)
    "
  >
    <div class="row">
      <div class="col-10">
        <b-card-text
          >{{ star.roadName }} {{ star.dong }}
          {{ star.apartmentName }}</b-card-text
        >
      </div>
    </div>
  </b-card>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "@/config/index";
import { mapState, mapMutations, mapActions } from "vuex";

const StarStore = "StarStore";
const StarSubStore = "StarSubStore";
const starDetailStore = "starDetailStore";
const starReviewStore = "aptReviewStore";
export default {
  name: "StarItem",
  props: {
    star: {},

    index: Number,
  },
  data() {
    return {
      markerLocal: null,
      coord: [],
      review: null,

      reviewModalShow: false,
      writeModalShow: false,
      isWriteError: false,
      starno: "",
    }; /* global kakao */
  },
  methods: {
    ...mapMutations(StarStore, [
      "CLEAR_HOUSE",
      "CLEAR_HOUSE_LIST",
      "CLEAR_DEAL_LIST",
    ]),
    ...mapActions(starDetailStore, [
      "detailHouse",
      "getHouseListByAptname",
      "getHouseListByDongname",
      "getDealByAptcode",
    ]),
    ...mapMutations(starReviewStore, [
      "CLEAR_REVIEWS",
      "SET_REVIEW",
      "CLEAR_REVIEW",
      "SET_REVIEW_MODAL_SHOW",
      "CLEAR_REVIEW_MODAL_SHOW",
      "SET_WRITE_MODAL_SHOW",
    ]),
    ...mapActions(starReviewStore, ["getReviews"]),
    ...mapMutations(StarSubStore, ["SET_MARKER", "CLEAR_MARKER"]),
    /*
    관심 지역 삭제 method
    2022-11-22  이인재
    */
    async deleteStar(starno) {
      let token = sessionStorage.getItem("access-token");
      console.log(this.star.starno + " " + starno);
      await axios
        .create({
          baseURL: API_BASE_URL,
          headers: {
            "Content-type": "application/json",
            "access-token": token,
          },
        })
        .delete(`/star/${starno}`)
        .then(({ data }) => {
          console.log(data.message);
          this.CLEAR_HOUSE();
          // this.$router.go(this.$router.current);
          // this.$router.push(`/star/list`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    close() {
      this.CLEAR_HOUSE();
    },
    setStarno(starno) {
      console.log("setStarno->", starno);
      this.starno = starno;
      console.log("setStarno->", this.starno);
    },
    /*
    마커 조회 method
    2022-11-22 이인재
    */
    search(lat, lng, aptCode, e) {
      e.preventDefault;
      if (this.marker) {
        this.marker.setMap(null);
      }
      let houseImageSize = new kakao.maps.Size(50, 50);
      let houseImageSrc = require("@/assets/mapMarkers/house.png");
      let markerImage = new kakao.maps.MarkerImage(
        houseImageSrc,
        houseImageSize
      );
      this.markerLocal = new kakao.maps.Marker({
        map: this.map,
        position: new kakao.maps.LatLng(lat, lng),
        clickable: true,
        image: markerImage,
      });
      this.SET_MARKER(this.markerLocal);
      console.log(this.marker);
      console.log(this.markerLocal);
      this.mapCenterMove(lat, lng, this.zoomLevel);
      kakao.maps.event.addListener(this.marker, "click", () => {
        this.showDetail(aptCode);
        this.mapCenterMove(lat, lng, 3);
      });
    },
    mapCenterMove(lat, lng, level) {
      this.map.setCenter(new kakao.maps.LatLng(lat, lng));
      this.map.setLevel(level, { anchor: new kakao.maps.LatLng(lat, lng) });
    },

    // 카카오맵 마커 클릭시 우측 오버레이 시현 함수
    // input : aptCode (PK)
    // 22.11.18 장한결
    async showDetail(aptCode) {
      console.log("showDetail -> detailHouse", this.starno);
      // 아파트 상세정보 불러오기
      let starno = this.starno;
      let param = [aptCode, starno];
      console.log("set param is : ", param);
      await this.detailHouse(param);
      console.log("상세 정보 불러옴 : ", this.houselist);
      // 거래내역 불러오기
      await this.getDealByAptcode(aptCode);
      console.log("거래내역 정보 불러옴 : ", this.deallist);

      // 리뷰 불러오기
      this.getReviews(aptCode);
      console.log("리뷰 정보 불러옴");
    },
    reviewDetail(review) {
      this.SET_REVIEW(review);
      this.SET_REVIEW_MODAL_SHOW();
    },
    writeReview() {
      this.SET_WRITE_MODAL_SHOW();
    },
  },
  created() {},
  computed: {
    ...mapState(StarStore, ["house", "ishow", "houselist", "deallist"]),
    ...mapState(StarSubStore, ["map", "marker"]),
    ...mapState(starReviewStore, ["reviews", "reviewForceUpdate"]),
  },
  filters: {
    roadNumberFilter(value) {
      return parseInt(value);
    },
    dateFilter(value) {
      let year = value.substring(2, 4);
      let month = value.substring(5, 7);
      let day = value.substring(8, 10);
      return `${year}.${month}.${day}`;
    },
  },
};
</script>
<style scoped></style>
