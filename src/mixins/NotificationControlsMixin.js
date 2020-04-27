export default {
  data() {
    return {
      displayedMessageIndex: 0
    }
  },
  methods: {
    nextMessage() {
      if (this.displayedMessageIndex < this.messages.length - 1) {
        this.displayedMessageIndex += 1
      }
    },
    previousMessage() {
      if (this.displayedMessageIndex >= 1) {
        this.displayedMessageIndex -= 1
      }
    }
  }
}
