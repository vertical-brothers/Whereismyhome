import { apiInstance } from "@/api/index.js";

const api = apiInstance();

async function searchDealByAptcode(aptCode, success, fail) {
  await api.get(`/housedeal/name/${aptCode}`).then(success).catch(fail);
}
export { searchDealByAptcode };
