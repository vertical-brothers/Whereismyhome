<template>
  <!--검색 carousel 시작 -->
  <div id="carouselExampleCaptions" class="carousel" data-bs-ride="carousel">
    <!-- <div class="carousel-inner" style="background-color: rgb(54, 54, 54)">
      <div class="carousel-item active"></div>
    </div> -->
    <!--검색 carousel 끝 -->
    <!--게시판 시작-->
    <div class="display-1 my-5 mb-3">Admin Dashboard</div>
    <div class="justify-content-center col-md-12 mt-5" id="useComponent">
      <div class="justify-content-center col-md-12 row">
        <admin-user-search />
      </div>
      <div class="row row-cols-4 col-md-12 my-4 justify-content-center">
        <div class="rounded" id="totalUser">
          <admin-total-user />
        </div>
        <div class="rounded" id="totalUser">
          <admin-total-login />
        </div>
        <div class="rounded" id="totalUser">
          <admin-login-time />
        </div>
      </div>

      <div
        class="row row-cols-3 col-md-12 justify-content-center"
        id="chartComponents"
      >
        <div class="col rounded border mx-5 col-md-4" id="graph">
          <admin-rank />
        </div>
        <div class="col rounded mx-4 col-md-4" id="graph">
          <div class="row row-cols-2 my-2 justify-content-center">
            <div class="rounded border col-md-6">
              <admin-all-keyword />
            </div>
            <div class="rounded border col-md-6">
              <admin-daily-keyword />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row row-cols-2 col-md-10">차트넣을 공간</div> -->
    </div>
    <!--게시판 끝-->
    <!--그래프 두개 들어갈 칸-->
  </div>
</template>

<script>
import AdminTotalUser from "./sub/AdminTotalUser.vue";
import AdminTotalLogin from "./sub/AdminTotalLogin.vue";
import AdminLoginTime from "./sub/AdminLoginTime.vue";
import AdminAllKeyword from "@/components/admin/sub/AdminAllKeyword.vue";
import AdminDailyKeyword from "@/components/admin/sub/AdminDailyKeyword.vue";
import AdminRank from "@/components/admin/sub/AdminRank.vue";
import AdminUserSearch from "@/components/admin/sub/AdminUserSearch.vue";

export default {
  components: {
    AdminTotalUser,
    AdminTotalLogin,
    AdminLoginTime,
    AdminRank,
    AdminAllKeyword,
    AdminDailyKeyword,
    AdminUserSearch,
  },
  name: "AdminHome",

  data() {
    return {
      keyword: "",

      selected: null,
      options: [
        { value: null, text: "검색 조건" },
        { value: "dongName", text: "동 이름" },
        { value: "apartmentName", text: "아파트 이름" },
      ],
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#useComponent {
  /* width: 20%; */
  /* border: #42b983; */
  height: 100%;
}

#graph {
  height: 100%;
}

#chartComponents {
  height: 60%;
}
</style>
