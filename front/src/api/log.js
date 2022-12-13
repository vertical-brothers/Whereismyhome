import { apiInstance } from "@/api/index.js";
import axios from "axios";

const api = apiInstance();
// const house = apiInstance();

async function addApartLog(aptCode, success, fail) {
  await api.post(`/log/apartlog/${aptCode}`).then(success).catch(fail);
}
function getApartLog(success, fail) {
  api.get(`/log/apartlog`).then(success).catch(fail);
}

/*
  2022-11-24 이인재
  로그인 카운트 추가 api
*/
function addLoginLog(success, fail) {
  api.post(`/log/login`).then(success).catch(fail);
}

/*
2022-11-24 이인재
로그인 카운트 조회 api
*/
async function getLoginLog(success, fail) {
  await api.get(`/log/login`).then(success).catch(fail);
}
/*
  2022-11-24 이인재
  유저 수 조회 api
*/
async function getUserCount(success, fail) {
  await api.get(`/user/count`).then(success).catch(fail);
}

async function addSearchLog(searchLog, success, fail) {
  await axios
    .post(
      `http://localhost:8080/whereismyhome/log/apartSearchLog`,
      JSON.stringify(searchLog),
      {
        // json을 json타입의 text로 변환
        headers: {
          "Content-Type": `application/json`, // application/json 타입 선언
        },
      }
    )
    .then(success)
    .catch(fail);
}

async function getSearchAllLog(success, fail) {
  await axios
    .get(`http://localhost:8080/whereismyhome/log/apartSearchLog/all`, {
      // json을 json타입의 text로 변환
      headers: {
        "Content-Type": `application/json`, // application/json 타입 선언
      },
    })
    .then(success)
    .catch(fail);
}
async function getSearchDayLog(success, fail) {
  await axios
    .get(
      `http://localhost:8080/whereismyhome/log/apartSearchLog/today`,

      {
        // json을 json타입의 text로 변환
        headers: {
          "Content-Type": `application/json`, // application/json 타입 선언
        },
      }
    )
    .then(success)
    .catch(fail);
}
export {
  addApartLog,
  getApartLog,
  getUserCount,
  addLoginLog,
  getLoginLog,
  addSearchLog,
  getSearchAllLog,
  getSearchDayLog,
};
