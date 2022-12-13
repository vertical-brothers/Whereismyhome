<template>
  <div>
    <div class="my-2 mb-1">주간 아파트 클릭 횟수</div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartDataV2"
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
import { getApartLog } from "@/api/log.js";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "AdminRanki",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 500,
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
      response: null,
      chartDataV2: {
        labels: [],
        datasets: [
          {
            label: "클릭 수",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
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
    this.getData();
    console.log("test", this.chartDataV2);
  },
  mounted() {
    //this.getData();
    //console.log("test", this.chartDataV2);
  },
  methods: {
    async getData() {
      await getApartLog(
        ({ data }) => {
          this.response = data;
          for (let i = 0; i < this.response.length; i++) {
            this.chartDataV2.labels.push(this.response[i].apartmentName);
            this.chartDataV2.datasets[0].data.push(this.response[i].cnt);
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
