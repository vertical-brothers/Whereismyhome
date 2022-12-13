import {
  searchApartmentReviewByAptcode,
  writeReviewApi,
  updateReviewApi,
  deleteReviewApi,
} from "@/api/apartmentReview.js";
/*
아파트 리뷰 관련 통신 vuex
2022.11.20 장한결
*/

const aptReviewStore = {
  namespaced: true,
  state: {
    // 아파트 정보
    reviews: [],
    // 리뷰정보 디테일 위한 객체
    review: null,
    reviewModalShow: false,
    writeModalShow: false,
    isWriteError: false,
    isDeleteError: false,
  },
  mutations: {
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },
    CLEAR_REVIEWS(state) {
      state.reivews = [];
    },
    SET_REVIEW(state, review) {
      state.review = review;
    },
    CLEAR_REVIEW(state) {
      state.review = null;
    },
    SET_REVIEW_MODAL_SHOW(state) {
      state.reviewModalShow = true;
    },
    CLEAR_REVIEW_MODAL_SHOW(state) {
      state.reviewModalShow = false;
    },
    SET_WRITE_MODAL_SHOW(state) {
      state.writeModalShow = true;
    },
    CLEAR_WRITE_MODAL_SHOW(state) {
      state.writeModalShow = false;
    },
    SET_IS_WRITE_ERROR(state) {
      state.isWriteError = true;
    },
    CLEAR_IS_WRITE_ERROR(state) {
      state.isWriteError = false;
    },
    SET_IS_DELETE_ERROR(state) {
      state.isDeleteError = true;
    },
    CLEAR_IS_DELETE_ERROR(state) {
      state.isDeleteError = false;
    },
  },
  actions: {
    /* 아파트 코드로 아파트 리뷰 정보 가져오기 (비동기 호출)
input : aptCode (PK)
output : review List
22.11.20 장한결
*/
    getReviews: ({ commit }, aptCode) => {
      searchApartmentReviewByAptcode(
        aptCode,
        ({ data }) => {
          console.log(data);
          commit("SET_REVIEWS", data);
        },
        (error) => {
          console.log(error);
          commit("CLEAR_REVIEWS");
        }
      );
    },
    clearModal: ({ commit }) => {
      commit("CLEAR_REVIEW_MODAL_SHOW");
    },
    async writeReview({ commit }, reviewdata) {
      await writeReviewApi(
        reviewdata,
        ({ data }) => {
          if (data) {
            commit("CLEAR_IS_WRITE_ERROR");
          } else {
            commit("SET_IS_WRITE_ERROR");
          }
        },
        (error) => {
          console.log(error);
          commit("SET_IS_WRITE_ERROR");
        }
      );
    },
    async updateReview({ commit }, reviewdata) {
      await updateReviewApi(
        reviewdata,
        ({ data }) => {
          if (data) {
            commit("CLEAR_IS_WRITE_ERROR");
          } else {
            commit("SET_IS_WRITE_ERROR");
          }
        },
        (error) => {
          console.log(error);
          commit("SET_IS_WRITE_ERROR");
        }
      );
    },
    async deleteReview({ commit }, id) {
      await deleteReviewApi(
        id,
        ({ data }) => {
          if (data) {
            commit("CLEAR_IS_DELETE_ERROR");
          } else {
            commit("SET_IS_DELETE_ERROR");
          }
        },
        (error) => {
          console.log(error);
          commit("SET_IS_DELETE_ERROR");
        }
      );
    },
  },
};
export default aptReviewStore;
