<template>
  <div>
    <div class="my-2 mb-1">일간 검색 키워드</div>
    <Doughnut
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { getSearchDayLog } from "@/api/log.js";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "AdminDailyKeyword",
  components: { Doughnut },
  props: {
    chartId: {
      type: String,
      default: "doughnut-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#00D8FF", "#DD1B16", "#41B883", "#E46651"],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  created() {
    this.getAllData();
    console.log("all data is", this.chartData);
  },
  methods: {
    async getAllData() {
      await getSearchDayLog(
        ({ data }) => {
          this.response = data;
          console.log("response is", data);
          for (let i = 0; i < this.response.length; i++) {
            this.chartData.labels.push(this.response[i].keyword);
            this.chartData.datasets[0].data.push(this.response[i].searchCount);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
