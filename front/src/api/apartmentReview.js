import { apiInstance } from "@/api/index.js";
import axios from "axios";
const api = apiInstance();

// function sidoList(success, fail) {
//   api.get(`/map/sido`).then(success).catch(fail);
// }
function searchApartmentReviewByAptcode(aptcode, success, fail) {
  api.get(`/aptreview/aptcode/${aptcode}`).then(success).catch(fail);
}

function searchRecentReview(limit, success, fail) {
  api.get(`/aptreview/recent/${limit}`).then(success).catch(fail);
}

async function writeReviewApi(review, success, fail) {
  await axios
    .post(
      `http://localhost:8080/whereismyhome/aptreview`,
      JSON.stringify(review),
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

async function updateReviewApi(review, success, fail) {
  await axios
    .put(
      `http://localhost:8080/whereismyhome/aptreview`,
      JSON.stringify(review),
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

async function deleteReviewApi(id, success, fail) {
  await api.delete(`/aptreview/${id}`).then(success).catch(fail);
}

export {
  searchApartmentReviewByAptcode,
  writeReviewApi,
  updateReviewApi,
  deleteReviewApi,
  searchRecentReview,
};
