<template lang="pug">
  .bottom
    .ctrls
      a.about(href="http://www.peipeiyun.com/", target="_blank") {{bottom.about}}
      button.text(@click="") {{bottom.delegate}}
      button.text(@click="") {{bottom.cooperation}}
    .vertification
      span © 2016-2017 007vin.com   
      a.link(href="http://www.miitbeian.gov.cn/", target="_blank") 版权所有 ICP证：浙17026959号-2
</template>

<script>
import Vuex from "vuex";

export default {
  computed: {
    ...Vuex.mapGetters(["languageData", "area", "isChina"]),
    bottom() {
      return this.languageData.bottom;
    }
  }
};
</script>

<style scoped lang="less">
.bottom {
  width: 100%;
  height: 72px;
  padding: 0 e("calc(50% - 160px)");
  background: #3f424d;
  color: white;
  line-height: 32px;

  a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }

  .ctrls {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
    font-size: 14px;
  }

  .vertification {
    font-size: 12px;
    font-weight: 200;
    white-space: nowrap;
  }
}
</style>
