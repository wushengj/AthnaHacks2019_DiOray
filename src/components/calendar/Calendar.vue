<template>
	<div id='calendar'>
    <div
      class="">
      <button class="btn btn-primary btn-sm" @click="onClick">
        <i class="ion-md-add ion"></i>
        Add a new dairy
      </button>
    </div>
		<calendar-view
			:show-date="showDate"
      :events="events"
			class="theme-default holiday-us-traditional holiday-us-official"
      >
			<calendar-view-header
				slot="header"
				slot-scope="t"
				:header-props="t.headerProps"
				@input="setShowDate" />
		</calendar-view>
    <vuestic-modal :show.sync="show"
                    v-bind:large="true"
                    ref="largeModal"
                   :okText="'modal.confirm' | translate"
                   :cancelText="'modal.cancel' | translate"
                   @ok="onConfirm">
      <div slot="title">Add new diary</div>
      <h4>Today is {{getDate}}</h4>
      <speech-to-text-input @textUpdate='onTextUpdate'></speech-to-text-input>
      <sentiment :text=text @update='onSentimentUpdate'></sentiment>
    </vuestic-modal>
	</div>
</template>
<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
import SpeechToTextInput from '../speech-to-text/SpeechToTextInput.vue'
import Sentiment from './Sentiment.vue'
// The next two lines are processed by webpack. If you're using the component without webpack compilation,
// you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
require('vue-simple-calendar/static/css/default.css')
require('vue-simple-calendar/static/css/holidays-us.css')

export default {
  name: 'calendar',
  data: function () {
    return {
      showDate: new Date(),
      text: '',
      keywords: [],
      score: -1,
      events: []
    }
  },
  components: {
    CalendarView,
    CalendarViewHeader,
    SpeechToTextInput,
    Sentiment
  },
  methods: {
    setShowDate (d) {
      this.showDate = d
    },
    onClick () {
      this.$refs.largeModal.open()
    },
    onTextUpdate (text) {
      this.text = text
    },
    onSentimentUpdate (arr) {
      this.score = arr[0]
      this.keywords = arr[1]
    },
    onConfirm () {
      this.events.push(
        {
          id: 'event' + this.events.length,
          startDate: new Date(),
          style: this.getColor,
          title: this.keywords.join(' ')
        }
      )
      console.log(this.$children)
      this.$children[1].$children[0].clear()
      this.$children[1].$children[0].$children[0].clear()
    }
  },
  computed: {
    getDate () {
      let date = new Date()
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    },
    getColor () {
      if (this.score > 0.7) {
        return 'background-color: #ED5A65'
      } else if (this.score > 0.3) {
        return 'background-color: #96c24e'
      } else {
        return 'background-color: #126e82'
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
   background-color: #800080;
   opacity:1 !important;
  }
</style>
