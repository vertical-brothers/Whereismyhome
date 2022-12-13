<template>
  <b-modal
    v-if="review"
    size="xl"
    id="_modal"
    v-model="modalShow"
    scrollable
    @show="render"
    title="아파트 리뷰"
  >
    <!-- 글 보기 div 시작 -->
    <div v-if="!isUpdate">
      <div class="row">
        <div class="col-md-9">
          <h2>{{ review.subject }}</h2>
        </div>
        <div class="col-md-3">
          <b-form-rating v-model="review.star1" readonly></b-form-rating>
        </div>
      </div>
      <div class="row">
        <b-icon
          icon="calendar2-date"
          scale="1"
          class="col-md-1 mt-1 ms-2"
        ></b-icon>
        <h5 class="col">{{ review.date }}</h5>
      </div>
      <div class="row">
        <b-icon icon="person" scale="2" class="col-md-1 mt-2 ms-2"></b-icon>
        <h4 class="col">{{ review.userId }}</h4>
      </div>
      <div>
        <p v-html="review.content"></p>
      </div>
    </div>
    <!-- 글 보기 div 시작 -->
    <!-- 글 수정 div 시작 -->
    <div v-if="isUpdate">
      <div class="row">
        <div class="col"></div>
        <label for="title" class="form-label fs-3">제목</label>
        <div class="input-group mb-3 col">
          <div class="col-md-12">
            <input
              type="text"
              class="form-control"
              id="title"
              aria-describedby="basic-addon3"
              v-model="reviewBeforeupdate.subject"
            />
          </div>
        </div>
        <div class="col-md-3 mt-1 me-2">
          <b-form-rating v-model="reviewBeforeupdate.star1"></b-form-rating>
        </div>
      </div>
      <div class="row">
        <b-icon icon="person" scale="2" class="col-md-1 mt-2 ms-2"></b-icon>
        <h4 class="col">{{ review.userId }}</h4>
      </div>
      <div>
        <editor
          v-model="reviewBeforeupdate.content"
          :key="tinyId"
          autofucus
          :api-key="tinymcekey"
          :init="{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help',
          }"
        />
      </div>
    </div>
    <!-- 글 수정 div 끝 -->
    <template #modal-footer>
      <b-button
        v-if="isLogin && isMyPost(review.userId) && isUpdate"
        size="sm"
        variant="primary"
        @click="updateReviewRun"
      >
        작성
      </b-button>
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button
        v-if="isLogin && isMyPost(review.userId) && !isUpdate"
        size="sm"
        variant="success"
        @click="updateFlip"
      >
        수정
      </b-button>
      <b-button
        v-if="isLogin && isMyPost(review.userId)"
        size="sm"
        variant="danger"
        @click="deleteReviewRun"
      >
        삭제
      </b-button>
      <!-- Button with custom close trigger value -->
      <b-button size="sm" variant="outline-secondary" @click="closeModal">
        닫기
      </b-button>
    </template>
  </b-modal>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { TINY_MCE_KEY } from "@/config";
import Editor from "@tinymce/tinymce-vue";
const aptReviewStore = "aptReviewStore";
const memberStore = "memberStore";
export default {
  name: "ReviewModal",
  data() {
    return {
      tinymcekey: TINY_MCE_KEY,
      tinyId: 0,
      reviewBeforeupdate: {
        id: "",
        subject: "",
        content: "",
        star1: 1,
      },
      isLogin: sessionStorage.getItem("access-token") == null ? false : true,
      isUpdate: false,
    };
  },
  components: { editor: Editor },
  computed: {
    ...mapState(aptReviewStore, ["reviewModalShow", "review"]),
    ...mapState(memberStore, ["userInfo"]),
    modalShow: {
      get() {
        return this.reviewModalShow;
      },
      set() {
        return this.CLEAR_REVIEW_MODAL_SHOW();
      },
    },
  },
  methods: {
    ...mapActions(aptReviewStore, [
      "clearModal",
      "updateReview",
      "getReviews",
      "deleteReview",
    ]),
    ...mapMutations(aptReviewStore, [
      "CLEAR_REVIEW",
      "CLEAR_REVIEW_MODAL_SHOW",
    ]),
    updateFlip() {
      this.isUpdate = !this.isUpdate;
    },
    async updateReviewRun() {
      if (
        this.reviewBeforeupdate.subject == null ||
        this.reviewBeforeupdate.subject == ""
      ) {
        alert("제목을 입력해주세요.");
        return;
      } else if (
        this.reviewBeforeupdate.content == null ||
        this.reviewBeforeupdate.content == ""
      ) {
        alert("내용을 입력해주세요.");
        return;
      }
      await this.updateReview(this.reviewBeforeupdate);
      this.getReviews(this.review.aptCode);
      this.$bvModal.hide("_modal");
    },
    async deleteReviewRun(e) {
      e.preventDefault;
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await this.deleteReview(this.review.id);
        this.getReviews(this.review.aptCode);
        this.$bvModal.hide("_modal");
      }
    },
    closeModal() {
      this.$bvModal.hide("_modal");
    },
    render() {
      this.reviewBeforeupdate.id = this.review.id;
      this.reviewBeforeupdate.subject = this.review.subject;
      this.reviewBeforeupdate.content = this.review.content;
      this.reviewBeforeupdate.star1 = this.review.star1;
      this.isUpdate = false;
      this.tinyId += 1;
    },
    isMyPost(userIdOfPost) {
      if (this.isLogin) {
        return userIdOfPost === this.userInfo.userId;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
#_modal {
  position: absolute;
  z-index: 1;
}
</style>
