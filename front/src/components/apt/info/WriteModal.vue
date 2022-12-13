<template>
  <b-modal
    id="_modal"
    v-model="modalShow"
    scrollable
    @ok="writeArticle"
    @shown="render"
    size="xl"
    title="아파트 리뷰 작성"
  >
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
            v-model="review.subject"
          />
        </div>
      </div>
      <div class="col-md-3 mt-1 me-2">
        <b-form-rating v-model="review.star1"></b-form-rating>
      </div>
    </div>
    <div class="row">
      <b-icon icon="person" scale="2" class="col-md-1 mt-2 ms-2"></b-icon>
      <h4 class="col">{{ this.review.userId }}</h4>
    </div>
    <div>
      <editor
        v-model="review.content"
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
  </b-modal>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { TINY_MCE_KEY } from "@/config";
import Editor from "@tinymce/tinymce-vue";
const aptReviewStore = "aptReviewStore";
const aptDetailStore = "aptDetailStore";
const memberStore = "memberStore";
export default {
  name: "WriteModal",
  data() {
    return {
      tinymcekey: TINY_MCE_KEY,
      tinyId: 0,
      review: {
        userId: "",
        subject: "",
        content: "",
        star1: 1,
        aptCode: "",
      },
      isLogin: sessionStorage.getItem("access-token") == null ? false : true,
    };
  },
  components: { editor: Editor },
  computed: {
    ...mapState(aptReviewStore, ["writeModalShow"]),
    ...mapState(aptDetailStore, ["house"]),
    ...mapState(memberStore, ["userInfo"]),
    modalShow: {
      get() {
        return this.writeModalShow;
      },
      set() {
        return this.CLEAR_WRITE_MODAL_SHOW();
      },
    },
  },
  methods: {
    ...mapActions(aptReviewStore, ["writeReview", "getReviews"]),
    ...mapMutations(aptReviewStore, ["CLEAR_WRITE_MODAL_SHOW"]),
    async writeArticle(e) {
      e.preventDefault();
      if (this.review.subject == null || this.review.subject == "") {
        alert("제목을 입력해주세요.");
        return;
      } else if (this.review.content == null || this.review.content == "") {
        alert("내용을 입력해주세요.");
        return;
      }
      this.review.aptCode = this.house.aptCode;
      console.log(this.review);
      await this.writeReview(this.review).then(() => {
        this.getReviews(this.review.aptCode);
      });
      this.$nextTick(() => {
        this.$bvModal.hide("_modal");
      });
      // send;
    },
    render() {
      if (this.isLogin) {
        this.review.userId = this.userInfo.userId;
      } else {
        this.review.userId = "";
      }
      this.review.content = "";
      this.review.subject = "";
      this.review.star1 = "1";
      this.review.aptCode = "";
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
