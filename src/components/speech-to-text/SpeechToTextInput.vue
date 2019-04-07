<template>
  <div id="app">
    <div class="app__speech-to-text">
          <SpeechToText class="app__stt-button" @speech="onSpeechReceived($event)"/>
          <textarea class="app__stt-input" placeholder="Today I..." v-model="speech" @change="handleTextChange"></textarea>
    </div>
  </div>
</template>

<script>
// import { SpeechToText } from 'vue-voice';
import axios from 'axios'
import SpeechToText from './SpeechToText.vue'
export default {
  name: 'SpeechToTextInput',
  components: {
    SpeechToText
  },
  data () {
    return {
      speech: ''
    }
  },
  methods: {
    onSpeechReceived (speech) {
      this.speech += speech
      this.$emit('textUpdate', this.speech)
    },
    handleTextChange (text) {
      this.$emit('textUpdate', this.speech)
    },
    clear () {
      this.speech = ''
    }
  }
}
</script>

<style lang='sass'>
#app
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
.app
  &__title
    display: flex
    flex-direction: row
    height: 30px
    align-items: center
  &__speech-to-text
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
  &__stt-button
    padding: 10px 0
  &__stt-input
      height: 200px
      width: 100%
      outline: none
      padding: 10px
</style>
