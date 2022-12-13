import Vue from "vue";
import Vuex from "vuex";

import mainStore from "@/store/modules/mainStore";
import aptDetailStore from "@/store/modules/aptDetailStore";
import memberStore from "@/store/modules/memberStore";
import aptReviewStore from "@/store/modules/aptReviewStore";
import StarSubStore from "@/store/modules/StarSubStore";
import StarStore from "@/store/modules/StarStore";
import starDetailStore from "@/store/modules/starDetailStore";
import starReviewStore from "@/store/modules/starReviewStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainStore,
    aptDetailStore,
    memberStore,
    aptReviewStore,
    StarStore,
    StarSubStore,
    starDetailStore,
    starReviewStore,
  },
});
