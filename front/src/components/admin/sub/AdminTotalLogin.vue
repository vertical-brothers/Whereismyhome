<template style="height: 300px">
  <b-card>
    <b-card-title>일일 로그인 횟수</b-card-title>
    <b-card-text> {{ total }}회 </b-card-text>
    <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
  </b-card>
</template>

<script>
import { getLoginLog } from "@/api/log.js";
export default {
  name: "AdminTotalLogin",
  data() {
    return {
      total: 0,
    };
  },

  created() {
    this.getLog();
  },
  methods: {
    getLog() {
      getLoginLog(
        ({ data }) => {
          console.log("login data is", data);
          this.total = data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
