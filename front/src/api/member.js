import { apiInstance } from "@/api/index.js";

import axios from "axios";

const api = apiInstance();

async function login(user, success, fail) {
  console.log(JSON.stringify(user));

  await axios
    .post(
      `http://localhost:8080/whereismyhome/user/login`,
      JSON.stringify(user),
      {
        // json을 json타입의 text로 변환
        headers: {
          "Content-Type": `application/json`, // application/json 타입 선언
        },
      }
    )
    .then(success)
    .catch(fail);

  // await api
  //   .post(`/user/login`, JSON.stringify(parameter))
  //   .then(success)
  //   .catch(fail);
  // const tmp = axios.create({
  //   baseURL: `http://localhost:8080`,
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // });
  // tmp.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
  console.log("test");
}

async function findById(userid, success, fail) {
  console.log(sessionStorage.getItem("access-token"));
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
  // await api.get(`/user/token/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] =
    sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function getList(success, fail) {
  await api.get(`/user/`).then(success).catch(fail);
}

async function join(user, success, fail) {
  await axios
    .post(`http://localhost:8080/whereismyhome/user/`, JSON.stringify(user), {
      // json을 json타입의 text로 변환
      headers: {
        "Content-Type": `application/json`, // application/json 타입 선언
      },
    })
    .then(success)
    .catch(fail);
}
// 아이디 중복 체크
// 22.11.20 장한결
async function idcheck(userId, success, fail) {
  await api.get(`/user/idcheck/${userId}`).then(success).catch(fail);
}

// 회원 업데이트
// 22.11.24 장한결
async function updateApi(user, success, fail) {
  await axios
    .put(`http://localhost:8080/whereismyhome/user/`, JSON.stringify(user), {
      // json을 json타입의 text로 변환
      headers: {
        "Content-Type": `application/json`, // application/json 타입 선언
      },
    })
    .then(success)
    .catch(fail);
}

// 회원 삭제
// 22.11.24 장한결
async function deleteUserApi(userId, success, fail) {
  await axios
    .delete(`http://localhost:8080/whereismyhome/user/${userId}`, {
      // json을 json타입의 text로 변환
      headers: {
        "Content-Type": `application/json`, // application/json 타입 선언
      },
    })
    .then(success)
    .catch(fail);
}

export {
  login,
  findById,
  tokenRegeneration,
  logout,
  join,
  idcheck,
  updateApi,
  deleteUserApi,
  getList,
};
