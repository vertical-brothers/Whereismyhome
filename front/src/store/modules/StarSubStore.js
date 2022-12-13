/* 
부동산 정보 검색관련 vuex
22.11.17 장한결
*/

const StarSubStore = {
  namespaced: true,
  state: {
    searchKeyword: "",
    searchOption: "",
    aptList: [],
    map: null,
    marker: null,
  },
  mutations: {
    SET_MAP(state, map) {
      state.map = map;
    },
    CLEAR_MAP(state) {
      state.map = null;
    },
    SET_MARKER(state, marker) {
      state.marker = marker;
    },
    CLEAR_MARKER(state) {
      state.marker = null;
    },
  },
};
export default StarSubStore;
