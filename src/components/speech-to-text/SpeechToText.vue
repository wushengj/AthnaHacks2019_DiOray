<template>
    <div>
        <div class="speech-to-text__button-container">
            <div @click="onClick()" :class="{ 'speech-to-text__button--speaking': isSpeaking }"
                    class="speech-to-text__button">
                    <span
                      v-if="!isSpeaking"
                      class="entypo entypo-mic"
                      :style="`font-size: 40px; color: purple`"
                      aria-hidden="true"
                    />
                    <span
                      v-if="isSpeaking"
                      class="entypo entypo-stop"
                      :style="`font-size: 40px; color: purple`"
                      aria-hidden="true"
                    />
                </div>
            </div>
    </div>
</template>

<script>
import SpeechToText from './speech-to-text'

/*
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
*/
export default {
  name: 'SpeechToText',
  data () {
    return {
      isSpeaking: false,
      speech: '',
      recognition: {},
    }
  },
  methods: {
    onClick () {
      if (this.isSpeaking) {
        this.recognition.stop()
      } else {
        this.start_microphone()
      }
      this.isSpeaking = !this.isSpeaking
      // this.speechService.speak().subscribe(
      //     (result) => {
      //         this.speech = result;
      //         this.$emit('speech', this.speech);
      //         this.isSpeaking = false;
      //     },
      //     (error) => {
      //         console.log('Error', error);
      //         this.isSpeaking = false;
      //     },
      //     () => {
      //         this.isSpeaking = false;
      //     }
      // );
      // console.log('speechService started');
    },
    start_microphone () {
      this.recognition.start()
    },
    clear () {
      this.speech = ''
      this.$emit('speech', this.speech)
    }
  },
  props: {
    msg: String
  },
  created () {
    // this.speechService = new SpeechToText();
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    this.recognition = new SpeechRecognition()
    this.recognition.lang = this.lang
    this.recognition.interimResults = true
    this.recognition.onresult = event => {
      console.log(event)
      const text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      this.speech = text
      this.$emit('speech', this.speech)
    }
    this.recognition.addEventListener('end', () => {
      // this.recognition.start()
    })
  }
}
</script>

<style lang="sass">
@keyframes blind
    0%
        background-color: #dddddd
        width: 45px
        height: 45px
    50%
        background-color: white
        width: 50px
        height: 50px
.speech-to-text
    &__button-container
        display: flex
        justify-content: center
        align-items: center
        width: 50px
        height: 50px
    &__button
        box-shadow: 1px 2px 3px
        background-color: #FFFFFF
        border-radius: 50px
        width: 50px
        height: 50px
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        &--speaking
            animation-name: blind
            animation-duration: 1.5s
            animation-iteration-count: 1
    &__stop
        width: 16px
</style>
