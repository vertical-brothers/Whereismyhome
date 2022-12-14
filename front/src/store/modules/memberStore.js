import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  login,
  findById,
  tokenRegeneration,
  logout,
  join,
  idcheck,
  getList,
} from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: "",
    isValidToken: false,
    isRegisterError: false,
    isDuplicatedId: false,
    isAdmin: false,
    list: [],
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_IS_ADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin;
    },
    SET_LIST: (state, list) => {
      state.list = list;
    },
    SET_IS_REGISTER_ERROR: (state) => {
      state.isRegisterError = true;
    },
    CLEAR_IS_REGISTER_ERROR: (state) => {
      state.isRegisterError = false;
    },
    SET_IS_DUPLICATED_ID: (state) => {
      state.isDuplicatedId = true;
    },
    CLEAR_IS_DUPLICATED_ID: (state) => {
      state.isDuplicatedId = false;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];

            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            console.log("1");
            commit("SET_IS_LOGIN", true);
            console.log("2");
            commit("SET_IS_LOGIN_ERROR", false);
            console.log("3");
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async userjoin({ commit }, user) {
      await join(
        user,
        ({ data }) => {
          if (data) {
            commit("CLEAR_IS_REGISTER_ERROR");
          } else {
            commit("SET_IS_REGISTER_ERROR");
          }
        },
        (error) => {
          console.log(error);
          commit("SET_IS_REGISTER_ERROR");
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          console.log("data is" + JSON.stringify(data.userInfo));
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            if (data.userInfo.userRole == "admin") {
              commit("SET_IS_ADMIN", true);
            }
          } else {
            console.log("?????? ?????? ??????!!!!");
          }
        },
        async (error) => {
          console.log(
            "getUserInfo() error code [?????? ???????????? ?????? ?????????.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log(
        "?????? ????????? >> ?????? ?????? ?????? : {}",
        sessionStorage.getItem("access-token")
      );
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("????????? ?????? >> ????????? ?????? : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken ?????? ?????? >> ?????? ?????????!!!!
          if (error.response.status === 401) {
            console.log("?????? ??????");
            // ?????? ????????? ??? DB??? ????????? RefreshToken ??????.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("???????????? ?????? ?????? ??????");
                } else {
                  console.log("???????????? ?????? ?????? ??????");
                }
                alert("RefreshToken ?????? ??????!!! ?????? ???????????? ?????????.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_ADMIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("?????? ?????? ??????!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async userList({ commit }) {
      await getList(
        ({ data }) => {
          commit("SET_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async useridcheck({ commit }, userid) {
      await idcheck(
        userid,
        ({ data }) => {
          if (data) {
            commit("CLEAR_IS_DUPLICATED_ID");
          } else {
            commit("SET_IS_DUPLICATED_ID");
          }
        },
        (error) => {
          console.log(error);
          commit("SET_IS_DUPLICATED_ID");
        }
      );
    },
  },
};

export default memberStore;
