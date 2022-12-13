<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-4">
          <div class="row g-0">
            <div class="col-xl-6 d-none d-xl-block">
              <img
                src="@/assets/home_apartment.jpg"
                alt="Sample photo"
                class="img-fluid"
                style="
                  border-top-left-radius: 0.25rem;
                  border-bottom-left-radius: 0.25rem;
                "
              />
            </div>
            <div class="col-xl-6">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-uppercase">회원가입</h3>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input
                        type="text"
                        id="form3Example1m"
                        class="form-control form-control-lg"
                        v-model="memberDto.userId"
                      />
                      <label class="form-label" for="form3Example1m"
                        >아이디</label
                      >
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input
                        type="password"
                        id="form3Example1n"
                        class="form-control form-control-lg"
                        v-model="memberDto.userPwd"
                      />
                      <label class="form-label" for="form3Example1n"
                        >비밀번호</label
                      >
                    </div>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example8"
                    class="form-control form-control-lg"
                    v-model="memberDto.userName"
                  />
                  <label class="form-label" for="form3Example8">이름</label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="tel"
                    id="form3Example9"
                    class="form-control form-control-lg"
                    v-model="memberDto.userPhone"
                  />
                  <label class="form-label" for="form3Example9">전화번호</label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example90"
                    class="form-control form-control-lg"
                    v-model="memberDto.userEmail"
                  />
                  <label class="form-label" for="form3Example90">메일</label>
                </div>
                <div class="d-flex justify-content-end pt-3">
                  <button
                    type="button"
                    class="btn btn-light btn-lg"
                    @click="duplicateCheck"
                  >
                    아이디 중복 확인
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-lg ms-2"
                    @click="onClickJoinUser"
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "UserRegister",
  data() {
    return {
      // isLoginError: false,
      memberDto: {
        userId: null,
        userPwd: null,
        userName: null,
        userEmail: null,
        userPhone: null,
        userRole: 0,
      },
      isDuplicatedChecked: false,
    };
  },
  methods: {
    ...mapActions(memberStore, ["useridcheck", "userjoin"]),
    async onClickJoinUser(e) {
      e.preventDefault();
      if (this.memberDto.userId === null || this.memberDto.userId === "") {
        alert("아이디를 입력해주세요.");
        return;
      } else if (
        this.memberDto.userPwd === null ||
        this.memberDto.userPwd === ""
      ) {
        alert("비밀번호를 입력해주세요.");
        return;
      } else if (
        this.memberDto.userName === null ||
        this.memberDto.userName === ""
      ) {
        alert("이름을 입력해주세요.");
        return;
      } else if (
        this.memberDto.userEmail === null ||
        this.memberDto.userEmail === ""
      ) {
        alert("이메일을 입력해주세요.");
        return;
      } else if (
        this.memberDto.userPhone === null ||
        this.memberDto.userPhone === ""
      ) {
        alert("전화번호를 입력해주세요.");
        return;
      }
      if (!this.isDuplicatedChecked) {
        alert("아이디 중복 여부를 확인해주세요.");
        return;
      }
      await this.userjoin(this.memberDto);
      this.$router.push({ name: "main" });
    },
    async duplicateCheck(e) {
      e.preventDefault();
      if (this.memberDto.userId === null || this.memberDto.userId === "") {
        alert("아이디를 입력해주세요.");
        return;
      }

      await this.useridcheck(this.memberDto.userId);
      if (this.isDuplicatedId) {
        alert("아이디가 중복되었습니다. 다른 아이디를 입력해주세요.");
        this.isDuplicatedChecked = false;
      } else {
        alert("사용 가능한 아이디입니다.");
        this.isDuplicatedChecked = true;
      }
    },
  },
  computed: {
    ...mapState(memberStore, ["isDuplicatedId", "isRegisterError"]),
  },
};
</script>

<style></style>
