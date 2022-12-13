<template style="height: 300px">
  <b-card>
    <b-card-title>금주 총 로그인 시간</b-card-title>
    <b-card-text> {{ total }}분 </b-card-text>
    <b-card-text class="small text-muted"
      >지난주에 비해 {{ total }}분 더 높습니다</b-card-text
    >
  </b-card>
</template>

<script>
import { getLoginLog } from "@/api/log.js";
export default {
  name: "AdminLoginTime",
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
          this.total = data * 30;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
