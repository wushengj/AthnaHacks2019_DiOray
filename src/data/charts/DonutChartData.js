import store from 'vuex-store'

let palette = store.getters.palette

export default {
  labels: ['Positive', 'Neutral', 'Negative'],
  datasets: [{
    label: 'Days',
    backgroundColor: [palette.danger, palette.success, palette.info],
    data: [98, 47, 24],
  }],
}
