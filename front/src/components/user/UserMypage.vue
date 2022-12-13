<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>내정보</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>My Page</template>
          <template #lead> 내 정보 확인페이지입니다. </template>
          <hr class="my-4" />
          <b-container class="mt-4" v-if="!isUpdate">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userId }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.userName
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.userEmail
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">전화번호</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.userPhone
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <!-- 회원정보수정시작 -->
          <b-container class="mt-4" v-else>
            <b-row class="mb-2">
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userId }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start"
                ><b-form-input
                  type="text"
                  v-model="userInfo.userName"
                  required
                  placeholder="이름 입력...."
                ></b-form-input
              ></b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start"
                ><b-form-input
                  type="text"
                  v-model="userInfo.userEmail"
                  required
                  placeholder="이메일 입력...."
                ></b-form-input
              ></b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">전화번호</b-col
              ><b-col cols="4" align-self="start"
                ><b-form-input
                  type="text"
                  v-model="userInfo.userEmail"
                  required
                  placeholder="이메일 입력...."
                ></b-form-input
              ></b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="primary" class="me-2" @click="changeInfo"
            >정보수정</b-button
          >
          <b-button variant="danger" @click="deleteUser">회원탈퇴</b-button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { updateApi, deleteUserApi } from "@/api/member.js";

const memberStore = "memberStore";

export default {
  name: "UserMyPage",
  data() {
    return {
      isUpdate: false,
      userInfoToUpdate: {
        userDel: "0",
      },
    };
  },
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    changeInfo() {
      if (this.isUpdate === false) {
        this.isUpdate = true;
      } else {
        if (confirm("정말 수정하시겠습니까?")) {
          updateApi();
          alert("회원정보를 수정합니다.");
        }
      }
    },
    deleteUser() {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        deleteUserApi(this.userInfo.userid);
        this.userLogout(this.userInfo.userid);
        sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
        sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
        alert("탈퇴되었습니다.");
        this.$router.push({ name: "main" });
      }
    },
  },
};
</script>

<style></style>
