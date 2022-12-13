<template style="height: 300px">
  <b-card>
    <b-card-title>총 유저 수 </b-card-title>
    <b-card-text> {{ this.total }} </b-card-text>
    <b-card-text class="small text-muted">현재까지 총 유저입니다.</b-card-text>
  </b-card>
</template>

<script>
import { getUserCount } from "@/api/log.js";
export default {
  name: "AdminTotalUser",
  data() {
    return {
      total: 0,
    };
  },

  created() {
    this.returnCount();
  },
  methods: {
    returnCount() {
      getUserCount(
        ({ data }) => {
          console.log(data);
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
