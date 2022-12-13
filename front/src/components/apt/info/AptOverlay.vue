<template>
  <div id="_overlay" class="col d-flex justify-content-end">
    <review-modal></review-modal>
    <write-modal></write-modal>
    <div class="col-md-5" @click="close"></div>
    <div
      id="_overlayleftend"
      class="col-md-5 d-flex flex-column mt-3 justify-content-start"
      @click="close"
    >
      <div class="row">
        <div class="col">
          <!-- 마트버튼 -->
          <button
            v-if="this.isMartShow"
            type="button"
            class="btn btn-primary me-1"
            @click="decideComfort('MT1')"
          >
            <b-icon icon="cart4"></b-icon> 마트
          </button>
          <button
            v-else
            type="button"
            class="btn btn-light me-1"
            @click="decideComfort('MT1')"
          >
            <b-icon icon="cart4"></b-icon> 마트
          </button>
          <!-- 마트버튼 -->
          <!-- 유치원버튼 -->
          <button
            v-if="this.isKinderShow"
            type="button"
            class="btn btn-primary me-1"
            @click="decideComfort('PS3')"
          >
            <b-icon icon="emoji-smile"></b-icon> 어린이집
          </button>
          <button
            v-else
            type="button"
            class="btn btn-light me-1"
            @click="decideComfort('PS3')"
          >
            <b-icon icon="emoji-smile"></b-icon> 어린이집
          </button>
          <!-- 유치원버튼 -->
          <!-- 학교버튼 -->
          <button
            v-if="this.isSchoolShow"
            type="button"
            class="btn btn-primary me-1"
            @click="decideComfort('SC4')"
          >
            <b-icon icon="award"></b-icon> 학교
          </button>
          <button
            v-else
            type="button"
            class="btn btn-light me-1"
            @click="decideComfort('SC4')"
          >
            <b-icon icon="award"></b-icon> 학교
          </button>
          <!-- 학교버튼 -->
          <!-- 병원버튼 -->
          <button
            v-if="this.isHospitalShow"
            type="button"
            class="btn btn-primary me-1"
            @click="decideComfort('HP8')"
          >
            <b-icon icon="plus-lg"></b-icon> 병원
          </button>
          <button
            v-else
            type="button"
            class="btn btn-light me-1"
            @click="decideComfort('HP8')"
          >
            <b-icon icon="plus-lg"></b-icon> 병원
          </button>
          <!-- 병원버튼 -->
          <!-- 병원버튼 -->
          <button
            v-if="this.isPharmacyShow"
            type="button"
            class="btn btn-primary me-1"
            @click="decideComfort('PM9')"
          >
            <b-icon icon="shop"></b-icon> 약국
          </button>
          <button
            v-else
            type="button"
            class="btn btn-light me-1"
            @click="decideComfort('PM9')"
          >
            <b-icon icon="shop"></b-icon> 약국
          </button>
          <!-- 병원버튼 -->
        </div>
      </div>
    </div>
    <div class="col-md-4" @click="close"></div>
    <div id="_overlayrightend" class="col-md-3 d-flex flex-column me-5 mt-3">
      <!-- 우측 오버레이 검색바 시작 -->
      <div id="_searchdiv" class="row mb-3 col-md-12">
        <form class="d-flex col-md-12">
          <select
            class="form-select me-2"
            aria-label="Default select example"
            v-model="searchOption"
          >
            <option disabled selected>검색조건</option>
            <option value="dongName">동별</option>
            <option value="apartmentName">아파트별</option>
          </select>
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchKeyword"
          />
          <button
            class="btn btn-primary col-md-2 justify-content-center"
            @click="search"
          >
            <b-icon icon="search" variant="info"></b-icon>
          </button>
        </form>
      </div>
      <!-- 우측 오버레이 검색바 끝 -->
      <!-- 우측 오버레이 아파트정보칸 시작 -->
      <div
        v-if="house"
        id="_aptdetaildiv"
        class="border-primary table-responsive rounded-3"
      >
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3 text-white bg-primary border-primary">
            <table class="table mt-1 mb-1 text-white">
              <tr class="align-middle">
                <td class="col-1">
                  <!--아파트 정보보기 끄기 버튼-->
                  <button @click="close" class="btn btn-primary" type="button">
                    <b-icon icon="x"></b-icon>
                  </button>
                </td>
                <td class="col-8 fw-bold fs-5 text-start">
                  {{ house.apartmentName }}
                </td>
                <td class="col-2">
                  <!--아파트 관심추가 버튼-->
                  <button
                    v-if="isLogin"
                    @click="setStar"
                    class="btn btn-primary"
                    type="button"
                  >
                    <b-icon
                      v-if="this.isStarApartment"
                      icon="star-fill"
                    ></b-icon>
                    <b-icon v-else icon="star"></b-icon>
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <!-- 아파트 정보 카드 시작 -->
          <div class="card-body">
            <div>
              <table class="table mb-4 mt-2">
                <tr>
                  <td class="col-4 fw-bold fs-6">주소</td>
                  <td class="col-8 fs-6">
                    {{ house.roadName }}
                    {{ house.roadNameBonbun | roadNumberFilter }}
                  </td>
                </tr>
                <tr>
                  <td class="col-4 fw-bold fs-6">건축년도</td>
                  <td class="col-8 fs-6">{{ house.buildYear }}년</td>
                </tr>
              </table>
            </div>
            <!-- 아파트 리뷰 카드 시작 -->
            <div class="row">
              <h4 class="fw-bold col">리뷰</h4>
              <b-icon
                v-if="isLogin"
                @click="writeReview"
                icon="pencil-square"
                class="col-md-1 me-2 mt-1"
              ></b-icon>
            </div>
            <div style="height: 350px; overflow: scroll">
              <div v-for="review in reviews" :key="review.id" class="card mb-3">
                <div class="card-header row">
                  <b-icon
                    icon="person"
                    scale="1"
                    class="col col-md-2 mt-1"
                  ></b-icon>
                  <div class="col col-md-4 text-start fw-bold">
                    {{ review.userId }}
                  </div>
                  <b-icon
                    icon="calendar2-date"
                    scale="1"
                    class="col-md-2 mt-1"
                  ></b-icon>
                  <div class="col-md-4 text-start fw-bold">
                    {{ review.date | dateFilter }}
                  </div>
                </div>
                <div class="card-body">
                  <div class="row mb-2">
                    <h4 class="card-title fw-bold">
                      {{ review.subject }}
                    </h4>
                  </div>

                  <p>
                    <b-form-rating
                      v-model="review.star1"
                      readonly
                    ></b-form-rating>
                  </p>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="reviewDetail(review)"
                  >
                    내용 보기
                  </button>
                </div>
              </div>
            </div>
            <!-- 아파트 리뷰 카드 끝 -->
            <!-- 실거래가 카드 시작 -->
            <div class="row">
              <h4 class="fw-bold">실거래가</h4>
              <div class="col-md-2"></div>
            </div>
            <line-chart></line-chart>
            <table class="table mb-2">
              <thead>
                <th class="col-md-2">거래년</th>
                <th class="col-md-5">가격</th>
                <th class="col-md-3">면적</th>
                <th class="col-md-2">층</th>
              </thead>
            </table>
            <div style="height: 230px; overflow: scroll">
              <table class="table mb-2">
                <tbody>
                  <tr v-for="deal in deallist" :key="deal.no">
                    <td class="col-md-2">{{ deal.dealYear }}</td>
                    <td class="col-md-6">{{ deal.dealAmount }}</td>
                    <td class="col-md-2">{{ deal.area }}</td>
                    <td class="col-md-2">{{ deal.floor }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- 실거래가 카드 끝 -->
          <!-- 아파트 정보 카드 끝 -->
        </div>
        <!-- 우측 오버레이 아파트정보칸 끝 -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { checkStar, writeStarApi, deleteStar } from "@/api/star.js";
import { addSearchLog } from "@/api/log.js";
import ReviewModal from "@/components/apt/info/ReviewModal.vue";
import WriteModal from "@/components/apt/info/WriteModal.vue";
import LineChart from "@/components/apt/info/LineChart.vue";
import { addApartLog } from "@/api/log.js";
const aptDetailStore = "aptDetailStore";
const mainStore = "mainStore";
const aptReviewStore = "aptReviewStore";

export default {
  name: "AptOverlay",
  beforeMount() {
    if (this.markers) {
      this.setMarkers(this.markers, null);
      this.CLEAR_MARKER();
    }
    if (this.house) {
      this.CLEAR_HOUSE();
    }
  },
  mounted() {
    //kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);
    console.log("call");
    console.log("mounted check", sessionStorage.getItem("access-token"));
    if (sessionStorage.getItem("access-token") === null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  data() {
    return {
      markerLocal: [],
      searchOption: "",
      searchKeyword: "",
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
      isLogin: false,
      isMartShow: false,
      isKinderShow: false,
      isSchoolShow: false,
      isHospitalShow: false,
      isPharmacyShow: false,
      comfortMarkers: [],
      currCategory: "",
      comfortImageSrc: null,
      comfortImageSize: null,
      comfortImageOption: null,
    }; /* global kakao */
  },
  components: {
    ReviewModal,
    WriteModal,
    LineChart,
  },
  methods: {
    ...mapMutations(aptDetailStore, [
      "CLEAR_HOUSE",
      "CLEAR_HOUSE_LIST",
      "CLEAR_DEAL_LIST",
      "SET_IS_STAR_APARTMENT",
      "CLEAR_IS_STAR_APARTMENT",
    ]),
    ...mapMutations(mainStore, [
      "CLEAR_SEARCH, SET_SEARCH",
      "SET_MARKERS",
      "CLEAR_MARKERS",
    ]),
    ...mapActions(aptDetailStore, [
      "detailHouse",
      "getHouseListByAptname",
      "getHouseListByDongname",
      "getDealByAptcode",
    ]),
    ...mapMutations(aptReviewStore, [
      "CLEAR_REVIEWS",
      "SET_REVIEW",
      "CLEAR_REVIEW",
      "SET_REVIEW_MODAL_SHOW",
      "CLEAR_REVIEW_MODAL_SHOW",
      "SET_WRITE_MODAL_SHOW",
    ]),
    ...mapActions(aptReviewStore, ["getReviews"]),
    close() {
      this.CLEAR_HOUSE();
    },
    search(e) {
      e.preventDefault();
      this.loadMarkers();
      if (this.searchOption == "" || this.searchOption == null) {
        alert("검색 조건을 선택해주세요.");
        return;
      } else if (this.searchKeyword == "") {
        alert("검색 키워드를 입력해주세요.");
        return;
      }
      // 검색 로깅
      this.logSearchKeyword(this.searchOption, this.searchKeyword);
    },
    // 검색조건 받아서 마커생성 함수 호출
    // 검색조건 있을때만 동작
    // 22.11.17 장한결
    async loadMarkers() {
      // 1. 마커 전부 제거
      this.setMarkers(this.markers, null);
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
          this.setMarkers(this.markers, this.map);
          this.CLEAR_SEARCH;
          // 검색 조건 동이름
        } else if (this.searchOption === "dongName") {
          await this.getHouseListByDongname(this.searchKeyword);
          this.createMarkers();
          this.setMarkers(this.markers, this.map);
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
      console.log(this.houselist);
      this.markerLocal = [];
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
          console.log("add log start");
          addApartLog(
            h.aptCode,
            ({ data }) => {
              console.log("로그 추가", data);
              console.log("add log");
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
    // map객체에 마커 띄우는 함수
    // input : map object (null입력시 마커 삭제됨.)
    // 22.11.18 장한결
    setMarkers(argmarkers, map) {
      for (let i = 0; i < argmarkers.length; i++) {
        argmarkers[i].setMap(map);
      }
    },
    // 카카오맵 마커 클릭시 우측 오버레이 시현 함수
    // input : aptCode (PK)
    // 22.11.18 장한결
    showDetail(aptCode) {
      // 아파트 상세정보 불러오기
      this.detailHouse(aptCode);
      // 거래내역 불러오기
      this.getDealByAptcode(aptCode);
      // 리뷰 불러오기
      this.getReviews(aptCode);
      if (!this.isLogin) return; // 로그인 한 경우만 관심아파트 여부 조회.
      console.log("checkstar");
      this.CLEAR_IS_STAR_APARTMENT();
      console.log("isstar?", this.isStarApartment);
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
    reviewDetail(review) {
      this.SET_REVIEW(review);
      this.SET_REVIEW_MODAL_SHOW();
    },
    writeReview() {
      this.SET_WRITE_MODAL_SHOW();
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
      if (!this.isStarApartment) {
        this.SET_IS_STAR_APARTMENT();
      } else {
        this.CLEAR_IS_STAR_APARTMENT();
      }
    },
    decideComfort(category) {
      this.comfortImageSize = new kakao.maps.Size(30, 30);
      //this.comfortImageOption = { offset: new kakao.maps.Point(27, 69) };
      // 일단 마커들 다 지움
      for (let i = 0; i < this.comfortMarkers.length; i++) {
        this.setMarkers(this.comfortMarkers, null);
      }
      // 마트
      if (category === "MT1") {
        // 같은 마커버튼이 한 번 더 눌린거라면
        if (this.isMartShow) {
          // 카테고리 비워버림
          this.currCategory = "";
          // OFF처리
          this.isMartShow = false;
          return;
          // 아니라면
        } else {
          // 다른 마커들 모두 OFF 처리
          this.isHospitalShow = false;
          this.isKinderShow = false;
          this.isSchoolShow = false;
          this.isPharmacyShow = false;
          // 마커이미지 세팅
          this.comfortImageSrc = require("@/assets/mapMarkers/mart.png");
          // 마트마커 ON
          this.isMartShow = true;
        }
        // 어린이집
      } else if (category === "PS3") {
        // 같은 마커버튼이 한 번 더 눌린거라면
        if (this.isKinderShow) {
          // 카테고리 비워버림
          this.currCategory = "";
          // OFF처리
          this.isKinderShow = false;
          return;
          // 아니라면
        } else {
          // 다른 마커들 모두 OFF 처리
          this.isHospitalShow = false;
          this.isMartShow = false;
          this.isSchoolShow = false;
          this.isPharmacyShow = false;
          // 마커이미지 세팅
          this.comfortImageSrc = require("@/assets/mapMarkers/kinder.png");
          // 마트마커 ON
          this.isKinderShow = true;
        }
        // 학교
      } else if (category === "SC4") {
        // 같은 마커버튼이 한 번 더 눌린거라면
        if (this.isSchoolShow) {
          // 카테고리 비워버림
          this.currCategory = "";
          // OFF처리
          this.isSchoolShow = false;
          return;
          // 아니라면
        } else {
          // 다른 마커들 모두 OFF 처리
          this.isHospitalShow = false;
          this.isKinderShow = false;
          this.isMartShow = false;
          this.isPharmacyShow = false;
          // 마커이미지 세팅
          this.comfortImageSrc = require("@/assets/mapMarkers/school.png");
          // 마트마커 ON
          this.isSchoolShow = true;
        }
        // 병원
      } else if (category === "HP8") {
        // 같은 마커버튼이 한 번 더 눌린거라면
        if (this.isHospitalShow) {
          // 카테고리 비워버림
          this.currCategory = "";
          // OFF처리
          this.isHospitalShow = false;
          return;
          // 아니라면
        } else {
          // 다른 마커들 모두 OFF 처리
          this.isMartShow = false;
          this.isKinderShow = false;
          this.isSchoolShow = false;
          this.isPharmacyShow = false;
          // 마커이미지 세팅
          this.comfortImageSrc = require("@/assets/mapMarkers/hospital.png");
          // 마트마커 ON
          this.isHospitalShow = true;
        }
        // 약국
      } else if (category === "PM9") {
        // 같은 마커버튼이 한 번 더 눌린거라면
        if (this.isPharmacyShow) {
          // 카테고리 비워버림
          this.currCategory = "";
          // OFF처리
          this.isPharmacyShow = false;
          return;
          // 아니라면
        } else {
          // 다른 마커들 모두 OFF 처리
          this.isHospitalShow = false;
          this.isKinderShow = false;
          this.isSchoolShow = false;
          this.isMartShow = false;
          // 마커이미지 세팅
          this.comfortImageSrc = require("@/assets/mapMarkers/pharmacy.png");
          // 마트마커 ON
          this.isPharmacyShow = true;
        }
      }
      this.comfortMarkerSet(category);
    },
    // 편의시설 마커생성
    comfortMarkerSet(category) {
      this.currCategory = category;
      kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);
      this.searchPlaces();
    },
    // 카테고리 서치 RUN
    searchPlaces() {
      if (!this.currCategory) {
        return;
      }
      console.log(this.currCategory);
      let ps = new kakao.maps.services.Places(this.map);
      ps.categorySearch(this.currCategory, this.placesSearchCB, {
        useMapBounds: true,
      });
    },
    // 카테고리 serach후 callback. 카카오 API참고
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        pagination;
        this.makeComfortMarker(data);
      }
    },
    // 카테고리 서치 기반 마커생성
    makeComfortMarker(places) {
      for (let i = 0; i < this.comfortMarkers.length; i++) {
        this.setMarkers(this.comfortMarkers, null);
      }
      this.comfortMarkers = [];
      // 마커생성 / 지도표시.
      let markerImage = new kakao.maps.MarkerImage(
        this.comfortImageSrc,
        this.comfortImageSize,
        this.comfortImageOption
      );
      //console.log(places);
      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다

        this.comfortMarkers.push(
          new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(places[i].y, places[i].x),
            image: markerImage,
          })
        );
      }
    },
    logSearchKeyword(category, keyword) {
      let searchlog = {
        log_id: "",
        log_date: "",
        keyword: keyword,
        category: category,
      };
      addSearchLog(
        searchlog,
        ({ data }) => {
          console.log("검색 로그 저장 결과 : ", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  computed: {
    ...mapState(aptDetailStore, [
      "house",
      "isShow",
      "houselist",
      "deallist",
      "isStarApartment",
    ]),
    ...mapState(mainStore, ["map", "markers"]),
    ...mapState(aptReviewStore, ["reviews"]),
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
<style>
#_overlay {
  position: absolute;
  z-index: 1;
}
#_dealtable {
  height: 100px;
  overflow: scroll;
}
#_aptdetaildiv {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow: scroll;
  height: 100%;
}

#_aptdetaildiv::-webkit-scrollbar {
  display: none; /* Chrome , Safari , Opera */
}
</style>
