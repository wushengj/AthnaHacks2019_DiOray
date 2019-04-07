<template>
      <div class="va-row md12 xs12">
        <vuestic-widget
          class=""
          style="width: 100%"
          headerText="Today Sentiment Score"
        >
          <div class="va-row">
            <div class="flex md6 xs6">
              <span
                v-if="score > 0.7"
                class="fontelico fontelico-emo-happy"
                :style="`font-size: 60px; color: purple`"
                aria-hidden="true"
              />
              <span
                v-if="(score < 0.7 && socre > 0.3) || score < 0 "
                class="fontelico fontelico-emo-tongue"
                :style="`font-size: 60px; color: purple`"
                aria-hidden="true"
              />
              <span
                v-if="(score < 0.3 && score > 0.0)"
                class="fontelico fontelico-emo-unhappy"
                :style="`font-size: 60px; color: purple`"
                aria-hidden="true"
              />
            </div>
            <div class="flex md6 xs6">
              <div>
              Sentiment Score: {{score > 0 ? score : loading}}
              </div>
              <div>
              Keywords: {{keyword.join(' ')}}
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'sentiment',
  data: function () {
    return {
      score: -1,
      keyword: []
    }
  },
  props: {
    text: '',
  },
  components: {
  },
  methods: {
  },
  computed: {
    getDate () {
      let date = new Date()
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  watch: {
    text: function (newVal, oldVal) {
      if (this.text != '') {
        axios.post(`https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment`, {
          'documents': [
            {
              'id': '1',
              'text': this.text
            }
          ]
        }, {
          headers: {
            'Ocp-Apim-Subscription-Key': '5ef26df583504f6180c2c8eae0ac8a49',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            this.score = response.data.documents[0].score
            this.$emit('update', [this.score, this.keyword])
          })
          .catch(e => {
            console.log(e)
          })

        axios.post(`https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases`, {
          'documents': [
            {
              'id': '1',
              'text': this.text
            }
          ]
        }, {
          headers: {
            'Ocp-Apim-Subscription-Key': '5ef26df583504f6180c2c8eae0ac8a49',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            this.keyword = response.data.documents[0].keyPhrases
            this.$emit('update', [this.score, this.keyword])
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
}
</script>
<style>
  #calendar{
    height: 85vh
  }

  .modal-backdrop {
   background-color: #951c48;
   opacity:1 !important;
  }
</style>
