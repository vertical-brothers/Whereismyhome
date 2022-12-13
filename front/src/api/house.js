import { apiInstance } from "@/api/index.js";

const api = apiInstance();
const house = apiInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  api.get(`/map/gugun`, { params: params }).then(success).catch(fail);
}

async function houseList(params, success, fail) {
  await house.get(``, { params: params }).then(success).catch(fail);
}

/*
아파트 코드 정보로 리스트 받아오는 요청 메서드
*/
async function aptCodeList(aptCode, success, fail) {
  await house.get(`/houseinfo/code/${aptCode}`).then(success).catch(fail);
}
/*
동 코드 정보를 통해 리스트를 받아오는 요청
*/
async function dongCodeList(dongCode, success, fail) {
  await house.get(`/houseinfo/dongCode/${dongCode}`).then(success).catch(fail);
}

/*
아파트 이름을 통해 아파트 정보를 받아오는 요청
*/
async function houseNameList(apartmentName, success, fail) {
  await api.get(`/houseinfo/name/${apartmentName}`).then(success).catch(fail);
}

/* 
동 이름을 통해 아파트 정보를 받아오는 요청
return : list
*/
async function searchByDongName(dongName, success, fail) {
  await api.get(`/houseinfo/dongName/${dongName}`).then(success).catch(fail);
}

export {
  sidoList,
  gugunList,
  houseList,
  aptCodeList,
  dongCodeList,
  houseNameList,
  searchByDongName,
};
