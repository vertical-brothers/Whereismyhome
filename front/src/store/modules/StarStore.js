import { aptCodeList, houseNameList, searchByDongName } from "@/api/house.js";
import { searchDealByAptcode } from "@/api/housedeal.js";
import { deleteStarv2, listStar } from "@/api/star";

/*
아파트 관련 통신 vuex
2022.11.17 장한결
*/

const StarStore = {
  namespaced: true,
  state: {
    stars: [],
    // 아파트 정보
    house: null,
    // 아파트 상세정보창 띄울지 여부
    isShow: false,
    // 아파트 리스트
    houselist: [],
    // 아파트 거래내역
    deallist: [],
    deleteApt: false,
    isDelete: false,
  },
  mutations: {
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
      state.isShow = true;
    },
    CLEAR_HOUSE(state) {
      state.house = null;
      state.isShow = false;
    },
    CLEAR_HOUSE_LIST(state) {
      state.houselist = [];
      state.house = null;
      state.isShow = false;
    },
    SET_HOUSE_LIST(state, data) {
      state.houselist = data;
    },
    SET_DEAL_LIST(state, data) {
      state.deallist = data;
    },
    CLEAR_DEAL_LIST(state) {
      state.deallist = [];
    },
    SET_ISDELETE(state) {
      state.isDelete = true;
    },
    SET_STARS(state, data) {
      state.stars = data;
    },
    setStar: function (state, data) {
      state.stars = data;
    },
  },
  actions: {
    /* 아파트 코드로 아파트 정보 가져오기 (비동기 호출)
    input : aptCode (PK)
    output : house object
    22.11.17 장한결
    */
    detailHouse: ({ commit }, aptCode) => {
      aptCodeList(
        aptCode,
        ({ data }) => {
          commit("SET_DETAIL_HOUSE", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    /* 아파트 이름으로 아파트 정보 가져오기 (비동기 호출)
    input : aptName 
    output : houses[]
    22.11.17 장한결
    */
    getHouseListByAptname: ({ commit }, aptName) => {
      houseNameList(
        aptName,
        ({ data }) => {
          //console.log(data);
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    /* 동 이름으로 아파트 정보 가져오기 (비동기 호출)
    input : dongName 
    output : houses[]
    22.11.17 장한결
    */
    getHouseListByDongname: ({ commit }, dongName) => {
      searchByDongName(
        dongName,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    /* 아파트 코드로 아파트 거래정보 가져오기 (비동기 호출)
    input : aptCode 
    output : deallist[]
    22.11.17 장한결
    */
    getDealByAptcode: ({ commit }, aptCode) => {
      searchDealByAptcode(
        aptCode,
        ({ data }) => {
          commit("SET_DEAL_LIST", data);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async deleteStar({ commit }, starno) {
      await deleteStarv2(
        starno,
        ({ data }) => {
          console.log(starno, data);
          commit("CLEAR_HOUSE");
          // commit("SET_ISDELETE");
          commit("SET_STARS", data.stars);
          console.log("ddddd", data);
          console.log(data);
          // console.log(this.$store.state.stars);
          // this.$router.go(this.$router.currentRoute).catch(() => {});
          // this.$router.replace("home"); // home 에서 about 으로 대체
          // state.isDelete = true;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getStars({ commit }) {
      await listStar(
        sessionStorage.getItem("access-token"),
        ({ data }) => {
          console.log("관심지역 다시 가져오기 성공");
          console.log(data);
          commit("SET_STARS", data);

          // console.log(JSON.stringify(this.stars));
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default StarStore;
