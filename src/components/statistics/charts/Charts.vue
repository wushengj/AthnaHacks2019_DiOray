<template>
  <div class="charts-page">

    <div class="va-row">
      <div class="flex md6 xs12">
        <vuestic-widget
          class="chart-widget"
          headerText="Daily Sentiment Index"
        >
          <vuestic-chart :data="lineChartData" :options='options' type="line"/>
        </vuestic-widget>
      </div>
      <div class="flex md6 xs12">
        <vuestic-widget
          class="chart-widget"
          headerText="Last Year Sentiment Ratios"
        >
          <vuestic-chart :data="donutChartData" type="donut"/>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
import { getLineChartData } from '../../../data/charts/LineChartData'
import BubbleChartData from '../../../data/charts/BubbleChartData'
import PieChartData from '../../../data/charts/PieChartData'
import DonutChartData from '../../../data/charts/DonutChartData'
import VerticalBarChartData from '../../../data/charts/VerticalBarChartData'
import HorizontalBarChartData from '../../../data/charts/HorizontalBarChartData'
import SidebarLink from '../../admin/app-sidebar/components/SidebarLink'

export default {
  name: 'charts',
  components: {
    SidebarLink,
  },
  data: () => ({
    bubbleChartData: BubbleChartData,
    lineChartData: getLineChartData(),
    pieChartData: PieChartData,
    donutChartData: DonutChartData,
    verticalBarChartData: VerticalBarChartData,
    horizontalBarChartData: HorizontalBarChartData,
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            unitStepSize: 1,
            displayFormats: {
              'day': 'MMM DD'
            }
          }
        }]
      }
    }
  }),
  methods: {
    refreshData () {
      this.lineChartData = getLineChartData()
    },
  },
}
</script>

<style lang="scss">
.widget.chart-widget {
  .widget-body {
    height: 550px;
  }
}
</style>
