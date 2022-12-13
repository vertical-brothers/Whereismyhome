<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  ></LineChartGenerator>
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);
const aptDetailStore = "aptDetailStore";
import { mapState } from "vuex";

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
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
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    for (let i = 0; i < 50; i++) {
      this.chartData.labels.push(this.deallist[i].dealYear);
      this.chartData.datasets[0].data.push(
        parseInt(this.deallist[i].dealAmount.replace(",", ""))
      );
      console.log("차트데이터 확인", parseInt(this.deallist[i].dealAmount));
    }
  },
  data() {
    return {
      chartData: {
        // 날짜
        labels: [],
        // 거래가
        datasets: [
          {
            label: "거래가",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    ...mapState(aptDetailStore, ["deallist"]),
  },
};
</script>

<style></style>
