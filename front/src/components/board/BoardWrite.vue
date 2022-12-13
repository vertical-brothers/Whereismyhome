<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12">
      <h2 class="my-3 py-3 shadow-sm bg-light text-center">
        <mark class="sky">글쓰기</mark>
      </h2>
    </div>
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            id="subject-group"
            label="제목:"
            label-for="subject"
            description="제목을 입력하세요."
          >
            <b-form-input
              id="subject"
              v-model="article.subject"
              type="text"
              required
              placeholder="제목 입력..."
            ></b-form-input>
          </b-form-group>
          <editor
            v-model="article.content"
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

          <b-button type="submit" variant="primary" class="m-1"
            >글작성</b-button
          >

          <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import http from "@/api/http.js";
import { TINY_MCE_KEY } from "@/config";
import { mapState } from "vuex";
import Editor from "@tinymce/tinymce-vue";

const memberStore = "memberStore";

export default {
  name: "BoardWrite",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
      },
      tinymcekey: TINY_MCE_KEY,
      isUserid: false,
    };
  },
  created() {},
  components: { editor: Editor },
  methods: {
    moveList() {
      this.$router.push(`/board`);
    },
    onSubmit(event) {
      event.preventDefault();
      console.log(this.userInfo);
      // this.article.userId = this.userInfo.userId;
      let err = true;
      let msg = "";

      !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) {
        alert(msg);
      } else {
        this.writeBoard();
      }
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.moveList();
    },
    writeBoard() {
      let myData = {
        userId: this.userInfo.userId,
        subject: this.article.subject,
        content: this.article.content,
      };
      http
        .post("/board/", myData)
        .then(({ data }) => {
          if (data != null) alert("성공적으로 글을 작성하였습니다.");
          this.moveList();
        })
        .catch(({ err }) => {
          alert("글작성에 실패하였습니다." + err);
          this.moveList();
        });
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
};
</script>
