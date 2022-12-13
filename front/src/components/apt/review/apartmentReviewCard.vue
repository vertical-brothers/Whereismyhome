<template>
  <div class="border rounded">
    <div class="card-header row">
      <b-icon icon="person" scale="1" class="col col-md-2 mt-1"></b-icon>
      <div class="col col-md-4 text-start fw-bold">
        {{ review.userId }}
      </div>
      <b-icon icon="calendar2-date" scale="1" class="col-md-2 mt-1"></b-icon>
      <div class="col-md-4 text-start fw-bold">
        {{ review.date | dateFilter }}
      </div>
    </div>
    <div class="card-body">
      <div class="row mb-2">
        <h4 class="card-title fw-bold mt-2">
          {{ review.subject }}
        </h4>
      </div>

      <p>
        <b-form-rating v-model="this.star" readonly></b-form-rating>
      </p>
      <button
        type="button"
        class="btn btn-primary mb-2"
        @click="goApartment(review.aptCode)"
      >
        {{ this.aptName }} 보러가기
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
const mainStore = "mainStore";
const aptDetailStore = "aptDetailStore";
export default {
  name: "ArticleItemForMain",
  mounted() {
    this.getDetailHouse();
  },
  data() {
    return {
      star: this.review.star1,
      aptName: "",
    };
  },
  props: {
    review: {},
    index: Number,
  },
  methods: {
    ...mapMutations(mainStore, ["SET_SEARCH"]),
    ...mapActions(aptDetailStore, ["detailHouse"]),
    goApartment(aptCode) {
      this.SET_SEARCH(["aptCode", aptCode]);
      this.$router.push({ name: "apt" });
    },
    async getDetailHouse() {
      await this.detailHouse(this.review.aptCode);
      this.aptName = this.house.apartmentName;
    },
  },
  filters: {
    dateFilter(value) {
      let year = value.substring(2, 4);
      let month = value.substring(5, 7);
      let day = value.substring(8, 10);
      return `${year}.${month}.${day}`;
    },
  },
  computed: {
    ...mapState(aptDetailStore, ["house"]),
  },
};
</script>
<style scoped></style>
