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
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log(
        "토큰 재발급 >> 기존 토큰 정보 : {}",
        sessionStorage.getItem("access-token")
      );
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
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
            console.log("유저 정보 없음!!!!");
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
