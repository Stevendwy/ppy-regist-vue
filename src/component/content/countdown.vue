<template lang="pug">
  button.countdown(@click="click") {{text}}
</template>

<script>
export default {
  props: {
    waitText: {
      type: String,
      required: true
    },
    second: {
      type: String,
      default: "s"
    },
    time: {
      type: Number,
      required: true
    },
    frequency: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      bouncing: false, // 是否跳动数字中
      timer: null, // 计时器
      time_in: 0, // 内部时间，取自外面
    };
  },
  mounted() {
    this.loadTime()
  },
  computed: {
    text() {
      return this.bouncing ? this.bouncingText : this.waitText;
    },
    bouncingText() {
      return this.time_in + this.second;
    }
  },
  methods: {
    loadTime() {
      this.time_in = this.time
    },
    click() {
      if (this.bouncing) return;
      else {
        this.$emit('event')
        this.bouncing = true;
        this.timer = setInterval(() => {
          this.countdown()
        }, ~~(1000 / this.frequency))
      }
    },
    countdown() {
      this.time_in -= 1
      if(this.time_in <= this.min) {
        clearInterval(this.timer)
        this.loadTime()
        this.bouncing = false
      }
    }
  }
};
</script>

<style>
button {
  color: #333;
  border: 0;
  outline: none;
  background: transparent;
}
</style>
