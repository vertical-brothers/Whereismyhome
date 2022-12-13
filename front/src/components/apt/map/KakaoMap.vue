<template>
  <div>
    <div id="map" @click="closeOverlay"></div>
  </div>
</template>
<script>
import { KAKAO_MAP_KEY } from "@/config";
import { mapActions, mapMutations, mapState } from "vuex";
import { checkStar, writeStarApi, deleteStar } from "@/api/star.js";
import { addApartLog } from "@/api/log.js";
const aptDetailStore = "aptDetailStore";
const mainStore = "mainStore";
const aptReviewStore = "aptReviewStore";
// import { dongCodeList, houseNameList, aptCodeList } from "@/api/house";
export default {
  name: "KakaoMap",
  data() {
    return {
      markerLocal: [],
      aptCode: null,
      dongCode: null,
      houseName: null,
      zoomLevel: 4,
      star: {
        apartmentName: "",
        aptCode: "",
        dong: "",
        lat: "",
        lng: "",
        roadName: "",
        starNo: "",
        userId: "",
      },
      houseListForStart: null,
    };
  },
  beforeCreated() {
    this.aptList = this.$route.params.data;
  },
  mounted() {
    // const script = document.createElement(script);
    this.loadMap();
    this.loadMarkers();
  },
  methods: {
    ...mapActions(aptDetailStore, [
      "detailHouse",
      "getHouseListByAptname",
      "getHouseListByDongname",
      "getDealByAptcode",
    ]),
    ...mapActions(aptReviewStore, ["getReviews"]),
    ...mapMutations(aptDetailStore, [
      "CLEAR_HOUSE",
      "CLEAR_HOUSE_LIST",
      "SET_IS_STAR_APARTMENT",
      "CLEAR_IS_STAR_APARTMENT",
      "SET_HOUSE_LIST",
    ]),
    ...mapMutations(mainStore, [
      "CLEAR_SEARCH",
      "SET_MAP",
      "SET_MARKERS",
      "CLEAR_MARKERS",
    ]),
    // 지도 객체 등록 22.11.17 이인재
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.SET_MAP(new kakao.maps.Map(container, options));
    },
    // 카카오맵 div 클릭시 우측 오버레이 모두 끄는 함수
    // 22.11.18 장한결
    closeOverlay() {
      this.CLEAR_HOUSE();
    },
    // 카카오맵 마커 클릭시 우측 오버레이 시현 함수
    // input : aptCode (PK)
    // 22.11.18 장한결
    showDetail(aptCode) {
      this.detailHouse(aptCode);
      // 거래내역 불러오기
      this.getDealByAptcode(aptCode);
      // 리뷰 불러오기
      this.getReviews(aptCode);
      this.CLEAR_IS_STAR_APARTMENT();
      console.log("별체크", aptCode, this.isStarApartment);
      checkStar(
        aptCode,
        sessionStorage.getItem("access-token"),
        ({ data }) => {
          if (data.star) {
            console.log("별정보", data.star);
            this.star = data.star;
            this.SET_IS_STAR_APARTMENT();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async sethouseListForStart() {
      await this.detailHouse(this.searchKeyword);
      this.houseListForStart = [this.house];
      this.CLEAR_HOUSE();
    },
    // map객체에 마커 띄우는 함수
    // input : map object (null입력시 마커 삭제됨.)
    // 22.11.18 장한결
    setMarkers(map) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    // map 객체 생성하는 함수
    // 22.11.17 이인재
    loadMap() {
      console.log("loadmap");
      if (window.kakao) {
        console.log("Map object already loaded...", window.kakao);
        this.initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_KEY}&libraries=services`;
        script.addEventListener("load", () => {
          console.log("Initializing Map...");
          kakao.maps.load(this.initMap);
        });
        document.head.appendChild(script);
      }
    },
    // 검색조건 받아서 마커생성 함수 호출
    // 검색조건 있을때만 동작
    // 22.11.17 장한결
    async loadMarkers() {
      // 1. 마커 전부 제거
      this.setMarkers(null);
      this.CLEAR_MARKERS();
      this.CLEAR_HOUSE_LIST();
      console.log(
        "검색 옵션",
        this.searchOption,
        "검색 키워드",
        this.searchKeyword
      );
      if (this.searchOption) {
        // 검색 조건 아파트명
        if (this.searchOption === "apartmentName") {
          // 비동기호출
          await this.getHouseListByAptname(this.searchKeyword);
          // 마커생성
          this.createMarkers();
          // 마커 부착
          this.setMarkers(this.map);
          this.CLEAR_SEARCH;
          // 검색 조건 동이름
        } else if (this.searchOption === "dongName") {
          await this.getHouseListByDongname(this.searchKeyword);
          this.createMarkers();
          this.setMarkers(this.map);
          this.CLEAR_SEARCH;
          // 검색 조건 아파트코드
        } else if (this.searchOption === "aptCode") {
          await this.sethouseListForStart();
          console.log("집집", this.house);
          console.log("코드검색", this.houseListForStart);
          this.SET_HOUSE_LIST(this.houseListForStart);
          this.createMarkers();
          this.setMarkers(this.map);
          console.log("키워드", this.searchKeyword);
          this.CLEAR_SEARCH;
        }
        if (this.houselist.length > 0) {
          this.mapCenterMove(
            this.houselist[0].lat,
            this.houselist[0].lng,
            this.zoomLevel
          );
        }
      }
    },
    // this.marker 생성하는 함수
    // 22.11.18 장한결
    createMarkers() {
      let houseImageSize = new kakao.maps.Size(30, 30);
      let houseImageSrc = require("@/assets/mapMarkers/house.png");
      let markerImage = new kakao.maps.MarkerImage(
        houseImageSrc,
        houseImageSize
      );
      for (var i = 0; i < this.houselist.length; i++) {
        let h = this.houselist[i];
        // 클릭가능한 마커 생성
        this.markerLocal.push(
          new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(h.lat, h.lng),
            clickable: true,
            image: markerImage,
          })
        );
        // 클릭시 화면 우측 오버레이 생성 이벤트 부착
        // 그 후 지도 중심 이동
        kakao.maps.event.addListener(this.markerLocal[i], "click", () => {
          addApartLog(
            h.aptCode,
            ({ data }) => {
              console.log("로그 추가", data);
            },
            (error) => {
              console.log(error);
            }
          );

          this.showDetail(h.aptCode);
          this.mapCenterMove(h.lat, h.lng, 3);
        });
      }
      this.SET_MARKERS(this.markerLocal);
      //console.log(this.markerLocal);
      console.log(
        "markers created with ",
        this.searchOption,
        this.searchKeyword,
        this.markers
      );
    },
    // 카카오맵 중심 이동 후 확대수준 결정
    // input : 위도, 경도, 확대 수준 (0~14)
    // 22.11.18 장한결
    mapCenterMove(lat, lng, level) {
      console.log("좌표이동", lat, lng);
      this.map.setCenter(new kakao.maps.LatLng(lat, lng));
      this.map.setLevel(level, { anchor: new kakao.maps.LatLng(lat, lng) });
    },
    setStar() {
      if (this.isStarApartment) {
        deleteStar(
          this.star.starNo,
          sessionStorage.getItem("access-token"),
          ({ data }) => {
            if (data.message === "success") {
              console.log("관심지역 삭제 성공");
            } else {
              console.log("관심지역 삭제 실패!");
            }
            this.star.apartmentName = "";
            this.star.aptCode = "";
            this.star.dong = "";
            this.star.lat = "";
            this.star.lng = "";
            this.star.roadName = "";
            this.star.starNo = "";
            this.star.userId = "";
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.star.apartmentName = this.house.apartmentName;
        this.star.aptCode = this.house.aptCode;
        this.star.dong = this.house.dong;
        this.star.lat = this.house.lat;
        this.star.lng = this.house.lng;
        this.star.roadName = this.house.roadName;
        writeStarApi(
          this.star,
          sessionStorage.getItem("access-token"),
          ({ data }) => {
            if (data.message === "success") {
              console.log("관심지역 입력 성공");
              console.log("들어온 pk : ", data.starNo);
              this.star.starNo = data.starNo;
            } else {
              console.log("관심지역 입력 실패!");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
      if (this.isStarApartment) {
        this.SET_IS_STAR_APARTMENT();
      } else {
        this.CLEAR_IS_STAR_APARTMENT();
      }
    },
  },

  computed: {
    ...mapState(mainStore, [
      "searchKeyword",
      "searchOption",
      "map",
      "markers",
      "isMartShow",
    ]),
    ...mapState(aptDetailStore, ["houselist", "isStarApartment", "house"]),
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
