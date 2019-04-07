import utils from 'services/utils'
import store from 'vuex-store'

let palette = store.getters.palette

const generateValue = () => {
  return Math.floor(Math.random() * Math.floor(60) + 40)
}

const generateTime = (i) => {
  let date = new Date()
  date.setDate(date.getDate() + i)
  return date
}

const generateYLabels = () => {
  const flip = !!Math.floor(Math.random() * 2)
  return flip ? ['Debit', 'Credit'] : ['Credit', 'Debit']
}

const generateArray = (length) => {
  let res = []
  for (let i = 0; i < length; i++) {
    res.push({
      t: generateTime(i),
      y: generateValue()
    })
  }
  return res
}

const getSize = () => {
  const minSize = 4
  return minSize + Math.floor(Math.random() * 3)
}

export const getLineChartData = () => {
  const size = getSize()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  const yLabels = generateYLabels()

  return {
    datasets: [
      {
        label: 'Sentiment Index',
        backgroundColor: utils.hex2rgb(palette.success, 0.3).css,
        borderColor: palette.success,
        data: generateArray(100)
      }
    ],
  }
}
