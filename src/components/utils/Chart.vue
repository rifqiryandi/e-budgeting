<template>
  <div>
    <canvas id="planet-chart"></canvas>
  </div>
</template>
<script>
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip
} from "chart.js";
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip
);
export default {
  name: "PlanetChart",
  props: {
    chartType: String,
    chartData: Object,
    chartOptions: Object,
  },
  data() {
    return {};
  },
  methods: {
    chartConstructor(chartType, chartData, chartOptions) {
      const chartElement = document.querySelector("canvas");
      new ChartJS(chartElement, {
        type: chartType,
        data: chartData,
        options: chartOptions,
      });
    },
  },
  mounted() {
    let { chartType, chartData, chartOptions } = this;
    this.chartConstructor(chartType, chartData, chartOptions);
  },
};
</script>
<style></style>
