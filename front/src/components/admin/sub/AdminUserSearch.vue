<template style="height: 300px">
  <div class="input-group w-75">
    <b-form-input
      @keyup.enter="search"
      type="text"
      v-model="keyword"
      class="form-control form-control-lg"
      placeholder="빈 상태로 클릭 시 전체리스트로 이동합니다."
    />
    <button @click="search" class="btn btn-primary" type="button">
      <b-icon icon="search" variant="info"></b-icon>
    </button>
  </div>
</template>

<script>
import { getList } from "@/api/member.js";
import { mapState, mapMutations } from "vuex";
const MemberStore = "MemberStore";
export default {
  name: "AdminUserSearch",
  data() {
    return {
      keyword: "",
    };
  },

  created() {
    this.getLog();
  },
  methods: {
    ...mapMutations(MemberStore, ["SET_LIST"]),
    search() {
      if (this.keyword == "") {
        getList(
          ({ data }) => {
            this.SET_LIST(data);
            this.$router.push({ name: "apt" });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  computed: {
    ...mapState(MemberStore, ["list"]),
  },
};
</script>
