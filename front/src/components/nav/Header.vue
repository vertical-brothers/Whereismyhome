<template>
  <div>
    <!-- 상단 navbar start -->
    <b-navbar
      toggleable="lg"
      class="navbar navbar-expand-lg navbar-light bg-light shadow"
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="navbar-nav me-auto mb-lg-0">
          <b-nav-item href="#"
            ><router-link
              :to="{ name: 'home' }"
              class="navbar-brand text-primary fw-bold"
              ><b-icon icon="house" font-scale="2"></b-icon> Where Is My
              Home</router-link
            ></b-nav-item
          >

          <div v-b-hover="boardHandleHover">
            <b-nav-item href="#" class="nav-item"
              ><router-link :to="{ name: 'board' }" class="nav-link"
                ><b-icon
                  v-if="isBoardHovered"
                  animation="throb"
                  icon="clipboard-check"
                  scale="1.5"
                  font-scale="2"
                ></b-icon>
                <b-icon v-else icon="clipboard-check" font-scale="2"></b-icon>
                공지사항</router-link
              ></b-nav-item
            >
          </div>

          <div v-b-hover="tradeHandleHover">
            <b-nav-item href="#" class="nav-item"
              ><router-link :to="{ name: 'apt' }" class="nav-link"
                ><b-icon
                  v-if="isTradeHovered"
                  animation="throb"
                  icon="building"
                  scale="1.5"
                  font-scale="2"
                ></b-icon>
                <b-icon v-else icon="building" font-scale="2"></b-icon>
                아파트매매정보</router-link
              ></b-nav-item
            >
          </div>

          <div v-b-hover="starHandleHover">
            <b-nav-item href="#" class="nav-item" v-if="userInfo"
              ><router-link :to="{ name: 'star' }" class="nav-link"
                ><b-icon
                  v-if="isStarHovered"
                  animation="throb"
                  icon="bookmark-heart"
                  scale="1.5"
                  font-scale="2"
                ></b-icon
                ><b-icon v-else icon="bookmark-heart" font-scale="2"></b-icon>
                관심 지역</router-link
              ></b-nav-item
            >
          </div>
          <div v-b-hover="adminHandleHover">
            <b-nav-item href="#" class="nav-item" v-if="isAdmin"
              ><router-link :to="{ name: 'admin' }" class="nav-link"
                ><b-icon
                  v-if="isAdminHovered"
                  animation="throb"
                  icon="graph-up"
                  scale="1.5"
                  font-scale="2"
                ></b-icon
                ><b-icon v-else icon="graph-up" font-scale="2"></b-icon> 관리자
                페이지</router-link
              ></b-nav-item
            >
          </div>
        </b-navbar-nav>
        <!-- after login -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center">
            <b-avatar variant="primary" v-text="userInfo.userid"></b-avatar>
            {{ userInfo.userName }}({{ userInfo.userId }})님 환영합니다.
          </b-nav-item>
          <b-nav-item class="align-self-center">
            <router-link :to="{ name: 'mypage' }" class="link align-self-center"
              >내정보보기</router-link
            >
          </b-nav-item>
          <b-nav-item
            class="align-self-center link"
            @click.prevent="onClickLogout"
            >로그아웃</b-nav-item
          >
        </b-navbar-nav>
        <!-- before login -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown class="me-5" left>
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'join' }" class="link">
                <b-icon icon="person-circle"></b-icon> 회원가입
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'login' }" class="link">
                <b-icon icon="key"></b-icon> 로그인
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
// import memberStore from "@/store/modules/memberStore";
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "HeaderBar",
  data() {
    return {
      isBoardHovered: false,
      isTradeHovered: false,
      isStarHovered: false,
      isAdminHovered: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo", "isAdmin"]),
    ...mapGetters(["checkUserInfo"]),
  },
  created() {},
  methods: {
    boardHandleHover(hovered) {
      this.isBoardHovered = hovered;
    },
    tradeHandleHover(hovered) {
      this.isTradeHovered = hovered;
    },
    starHandleHover(hovered) {
      this.isStarHovered = hovered;
    },
    adminHandleHover(hovered) {
      this.isAdminHovered = hovered;
    },
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log("userid is" + this.userInfo.userid);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },
};
</script>
<style scoped></style>
