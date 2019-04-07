<template>
  <component
    ref="chart"
    class='vuestic-chart'
    :is="chartComponent"
    :chart-data="data"
    :chartOptions='options'
  />
</template>

<script>
import PieChart from './chart-types/PieChart'
import BubbleChart from './chart-types/BubbleChart'
import DonutChart from './chart-types/DonutChart'
import HorizontalBarChart from './chart-types/HorizontalBarChart'
import VerticalBarChart from './chart-types/VerticalBarChart'
import LineChart from './chart-types/LineChart'
import { chartTypesMap } from './VuesticChartConfigs'

export default {
  name: 'vuestic-chart',
  data: () => ({
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            unitStepSize: 5,
            displayFormats: {
              'day': 'MMM DD'
            }
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true // minimum value will be 0.
          }
        }]
      }
    }
  }),
  props: {
    data: {},
    type: {
      validator (type) {
        const valid = type in chartTypesMap

        if (!valid) {
          // eslint-disable-next-line no-console
          console.warn(`There is no chart of ${type} type`)
        }

        return valid
      },
    },
  },
  components: {
    PieChart,
    LineChart,
    VerticalBarChart,
    HorizontalBarChart,
    DonutChart,
    BubbleChart,
  },
  computed: {
    chartComponent () {
      return chartTypesMap[this.type]
    },
  },
}
</script>

<style lang='scss'>
.vuestic-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    height: 100%;
    width: 100%;
  }

  canvas {
    width: 100%;
    height: auto;
  }
}
</style>
