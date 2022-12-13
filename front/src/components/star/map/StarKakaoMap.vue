<template>
  <div>
    <div id="map" @click="closeOverlay"></div>
  </div>
</template>
<script>
import { KAKAO_MAP_KEY } from "@/config";
import { mapActions, mapMutations, mapState } from "vuex";
const StarStore = "StarStore";
const StarSubStore = "StarSubStore";

export default {
  name: "KakaoMap",
  data() {
    return {
      markerLocal: [],
      aptCode: null,
      dongCode: null,
      houseName: null,
      zoomLevel: 4,
    };
  },
  mounted() {
    // const script = document.createElement(script);
    //console.log(this.searchKeyword);
    this.loadMap();
  },

  created() {
    this.aptList = this.$route.params.data;
  },
  methods: {
    ...mapActions(StarStore, [
      "detailHouse",
      "getHouseListByAptname",
      "getHouseListByDongname",
    ]),
    ...mapMutations(StarStore, ["CLEAR_HOUSE", "CLEAR_HOUSE_LIST"]),
    ...mapMutations(StarSubStore, [
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
    loadMarkers() {
      // 1. 마커 전부 제거
      this.setMarkers(null);
      this.CLEAR_MARKER;
      this.CLEAR_HOUSE_LIST;
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
          this.getHouseListByAptname(this.searchKeyword);
          // 마커생성
          this.createMarkers();
          // 마커 부착
          this.setMarkers(this.map);
          this.CLEAR_SEARCH;
          // 검색 조건 동이름
        } else if (this.searchOption === "dongName") {
          this.getHouseListByDongname(this.searchKeyword);
          this.createMarkers();
          this.setMarkers(this.map);
          this.CLEAR_SEARCH;
        }
      }
    },
    // this.marker 생성하는 함수
    // 22.11.18 장한결
    createMarkers() {
      for (var i = 0; i < this.houselist.length; i++) {
        let h = this.houselist[i];
        // 클릭가능한 마커 생성
        this.markerLocal.push(
          new kakao.maps.Marker({
            position: new kakao.maps.LatLng(h.lat, h.lng),
            clickable: true,
          })
        );
        // 클릭시 화면 우측 오버레이 생성 이벤트 부착
        // 그 후 지도 중심 이동
        kakao.maps.event.addListener(this.markerLocal[i], "click", () => {
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
      this.map.setCenter(new kakao.maps.LatLng(lat, lng));
      this.map.setLevel(level, { anchor: new kakao.maps.LatLng(lat, lng) });
    },
  },

  computed: {
    ...mapState(StarSubStore, [
      "searchKeyword",
      "searchOption",
      "map",
      "markers",
    ]),
    ...mapState(StarStore, ["houselist"]),
  },
};
</script>

<style scoped>
#map {
  width: 75%;
  height: 87%;
  position: absolute;
}
</style>
