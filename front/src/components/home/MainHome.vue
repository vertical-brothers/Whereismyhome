<template>
  <!--검색 carousel 시작 -->
  <div id="carouselExampleCaptions" class="carousel" data-bs-ride="carousel">
    <div class="carousel-inner" style="background-color: rgb(54, 54, 54)">
      <div class="carousel-item active">
        <img
          style="object-fit: cover; filter: brightness(50%)"
          src="@/assets/home_apartment.jpg"
          class="d-block w-100"
          height="400"
        />
        <div class="carousel-caption d-flex flex-column align-items-center">
          <div class="display-1 mb-3">Happy House</div>
          <div class="input-group w-75 col-md-12">
            <b-form-select
              size="lg"
              class="form-select form-select-sm ms-10 me-1 w-5"
              v-model="selected"
              :options="options"
            ></b-form-select>

            <b-form-input
              style="width: 70%"
              @keyup.enter="search"
              type="text"
              v-model="keyword"
              class="form-control form-control-lg"
              placeholder="원하시는 건물명 또는 동을 입력해주세요"
            />

            <button @click="search" class="btn btn-primary" type="button">
              <b-icon icon="search" variant="info"></b-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--검색 carousel 끝 -->
    <!--게시판 시작-->
    <div class="col-md-12 d-flex justify-content-center mt-4">
      <div class="row row-cols-3 col-md-12 justify-content-center">
        <div class="rounded board col-md-3 me-5" id="board">
          <img
            style="object-fit: cover; height: 100%"
            src="@/assets/apartImage.gif"
            class="d-block w-90"
          />
        </div>
        <div class="rounded board col-md-3 me-5">
          <h2 class="mb-3 fw-bold">공지사항</h2>
          <b-table-simple striped hover small caption-top responsive>
            <colgroup>
              <col style="width: 50%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
            </colgroup>
            <b-thead>
              <b-tr class="text-center">
                <b-th scope="col">제목</b-th>
                <b-th scope="col">작성자</b-th>
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
        <div class="rounded board col-md-3" id="_reviewBoard">
          <h2 class="mb-3 fw-bold">최근 리뷰</h2>
          <div>
            <review-card
              v-for="(review, index) in reviews"
              :key="index"
              :review="review"
              :index="index"
              class="mb-3 border border-dark"
            ></review-card>
          </div>
        </div>
      </div>
    </div>
    <!--게시판 끝-->
  </div>
</template>

<script>
// import { aptCodeList, dongCodeList, apartmentNameList } from "@/api/house";
import { mapMutations, mapState } from "vuex";
import { listArticle } from "@/api/board.js";
import { searchRecentReview } from "@/api/apartmentReview.js";
import { addSearchLog } from "@/api/log.js";
import ArticleItem from "@/components/board/ArticleItemForMain.vue";
import ReviewCard from "@/components/apt/review/apartmentReviewCard.vue";

const mainStore = "mainStore";
export default {
  name: "MainHome",
  components: {
    ArticleItem,
    ReviewCard,
  },
  created() {
    let param = {
      pgno: 1,
      spp: 10,
      key: "",
      word: "",
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
    searchRecentReview(
      10,
      (response) => {
        this.reviews = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  data() {
    return {
      thumbNail: require("@/assets/home_apartment.jpg"),
      keyword: "",
      articles: [],
      reviews: [],
      selected: null,
      options: [
        { value: null, text: "검색 조건" },
        { value: "dongName", text: "동 이름" },
        { value: "apartmentName", text: "아파트 이름" },
      ],
    };
  },
  methods: {
    ...mapMutations(mainStore, ["SET_SEARCH"]),

    search() {
      if (this.keyword == "") {
        alert("검색어를 입력해주세요!");
        return;
      }
      if (this.selected == null) {
        alert("카테고리를 설정해주세요!");
        return;
      }
      this.logSearchKeyword(this.selected, this.keyword);
      this.goSearch();
    },
    goSearch() {
      this.SET_SEARCH([this.selected, this.keyword]);
      this.$router.push({ name: "apt" });
    },
    // 검색 기록 로깅
    logSearchKeyword(category, keyword) {
      let searchlog = {
        log_id: "",
        log_date: "",
        keyword: keyword,
        category: category,
      };
      addSearchLog(
        searchlog,
        ({ data }) => {
          console.log("검색 로그 저장 결과 : ", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  computed: {
    ...mapState(mainStore, ["searchKeyword", "searchOption"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

.board {
  height: 80%;
  border-radius: 10;
  box-shadow: 5px 5px 5px grey;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.board::-webkit-scrollbar {
  display: none; /* Chrome , Safari , Opera */
}
</style>
