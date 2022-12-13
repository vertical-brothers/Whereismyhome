<template>
  <div>
    <b-container fluid="bv-example-row">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <h2 class="my-3 py-3 shadow-sm bg-light text-center">
            <mark class="sky">공지사항</mark>
          </h2>
        </div>

        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="row align-self-center mb-2">
            <div class="col-md-2 text-start">
              <b-button
                v-if="userInfo != null"
                variant="btn btn-outline-primary btn-sm"
                @click="moveWrite"
                >글쓰기</b-button
              >
            </div>
            <div class="col-md-7 offset-3">
              <b-form class="d-flex">
                <input type="hidden" name="act" value="list" />
                <input type="hidden" name="pgno" value="1" />
                <b-form-select
                  class="form-select form-select-sm ms-5 me-1 w-50"
                  v-model="selected"
                  :options="options"
                ></b-form-select>
                <div class="input-group input-group-sm">
                  <b-form-input
                    v-model="searchText"
                    class="form-control"
                    placeholder="검색어..."
                  />
                  <b-button
                    id="btn-search"
                    class="btn btn-dark"
                    type="button"
                    @click="boardlist"
                  >
                    검색
                  </b-button>
                </div>
              </b-form>
            </div>
          </div>
          <b-table-simple striped hover small caption-top responsive>
            <colgroup>
              <col style="width: 5%" />
              <col style="width: 35%" />
              <col style="width: 25%" />
              <col style="width: 5%" />
              <col style="width: 30%" />
            </colgroup>
            <b-thead>
              <b-tr class="text-center">
                <b-th scope="col">글번호</b-th>
                <b-th scope="col">제목</b-th>
                <b-th scope="col">작성자</b-th>
                <b-th scope="col">조회수</b-th>
                <b-th scope="col">작성일</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <article-item
                v-for="(article, index) in articles"
                :key="index"
                :article="article"
                :index="index"
              ></article-item>
            </b-tbody>
          </b-table-simple>
        </div>
      </div>
    </b-container>
    <div class="row">
      <ul class="pagination justify-content-center">
        <div v-if="(test = this.pgno - 1 > 0)">
          <li class="page-item">
            <a class="page-link" @click="prevPgno(), boardlist()">이전</a>
          </li>
        </div>
        <div v-else-if="(test = this.pgno - 1 <= 0)">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              onClick="alert('이전 페이지가 없습니다.')"
              >이전</a
            >
          </li>
        </div>

        <div v-for="index in [-2, -1, 0, 1, 2]" :key="index">
          <li class="page-item active">
            <a
              class="page-link"
              @click="boardlistV2((pgno <= 3 ? 3 : pgno) + index)"
              >{{ (pgno <= 3 ? 3 : pgno) + index }}</a
            >
          </li>
        </div>

        <div v-if="test == this.pgno + 1 <= this.lastpage">
          <li class="page-item">
            <a class="page-link" @click="nextPgno(), boardlistV2()">다음</a>
          </li>
        </div>
        <div v-else-if="test == this.pgno + 1 > this.lastpage">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              onClick="alert('다음 페이지가 없습니다.')"
              >다음</a
            >
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "@/api/http.js";
import { listArticle } from "@/api/board.js";
import ArticleItem from "@/components/board/ArticleItem.vue";
import { mapState } from "vuex";
const memberStore = "memberStore";
export default {
  name: "BoardList",
  components: {
    ArticleItem,
  },
  data() {
    return {
      articles: [],
      total: 0,
      pgno: 1,
      tmpPgno: 3,
      subkey: "",
      word: "",
      searchText: "",
      selected: null,
      lastpage: 1,
      options: [
        { value: null, text: "검색조건" },
        { value: "subject", text: "제목" },
        { value: "user_id", text: "작성자" },
      ],
    };
  },
  created() {
    let param = {
      pgno: this.pgno,
      spp: 20,
      key: this.subkey,
      word: this.word,
    };
    // this.boardlist();
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.totalCount();
  },
  methods: {
    nextPgno(no) {
      this.pgno = no;
    },
    boardlist() {
      console.log("pgno is", this.pgno);
      http
        .get(`/board?pgno=${this.pgno}&key=${this.selected}&word=${this.word}`)
        .then(({ data }) => {
          this.articles = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    boardlistV2(no) {
      let param = {
        pgno: no,
        spp: 20,
        key: this.subkey,
        word: this.word,
      };
      listArticle(
        param,
        (response) => {
          this.articles = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.totalCount();
    },
    moveWrite() {
      this.$router.push(`/board/write`);
    },
    totalCount() {
      http
        .get(`/board/total?key=${this.selected}&word=${this.word}`)
        .then(({ data }) => {
          this.total = data;
          this.lastpage = parseInt(this.total / 20);
          console.log(this.total);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
};
</script>
