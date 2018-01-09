<template lang="pug">
  .header
    .left
      img.logo(:src="languageData.logo", alt="logo")
      span {{languageData.signUp}}
    .right
      l-selector
</template>

<script>
import lSelector from './selector.vue'
import Vuex from "vuex";

export default {
  components: {
    lSelector
  },
  computed: {
    ...Vuex.mapGetters(["languageData"]),
  }
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);

  .left, .right {
    height: 100%;
  }

  .left {
    display: flex;
    align-items: center;

    .logo {
      height: 28px;
      margin-right: 20px;
    }
  }
}
</style>
