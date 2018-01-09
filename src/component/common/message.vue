<template lang="pug">
  .message(:class='{show}')
    span {{message}}
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 3
    },
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: "Message"
    }
  },
  data() {
    return {
      showing: false,
    };
  },
  watch: {
    show(status) {
      if (this.showing) return;

      if(status) {
        this.showing = true;

        setTimeout(() => {
          this.$emit("close");
          this.showing = false;
        }, ~~(this.time * 1000));
      }
    }
  }
};
</script>

<style scoped lang='less'>
.message {
  position: fixed;
  top: -68px;
  left: e("calc(50% - 150px)");
  width: 300px;
  height: 60px;
  padding: 16px;
  border: 1px solid #d3dce6;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  background: white;
  opacity: 0;
  transition: all 0.3s;
  overflow: hidden;
  z-index: 5000;
  font-size: 14px;
  color: #333;
}

.show {
  transform: translateY(76px);
  opacity: 1;
}
</style>
