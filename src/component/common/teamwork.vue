<template lang="pug">
  .teamwork(@click="teamworkhidden")
    .teamworkcontent
        .spirit
        img.hezuo(:src="teamworkimg.hezuo", alt="hezuo")
</template>

<script>
import Vuex from "vuex";
export default {
  computed: {
    ...Vuex.mapState(["teamworkimg"]),
    ...Vuex.mapGetters(["getteamworkimg"]),
  },
  methods: {
    ...Vuex.mapMutations(["teamworkHidden"]),
    teamworkhidden(){
        this.teamworkHidden()
    }
  }

}
</script>

<style lang="less" scoped>
    .teamwork{
        position: fixed;
        left: 0;
        right: 0;
        z-index: 1;
        top: 0;
        bottom: 0;
        cursor: default;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        justify-content: center;
        .teamworkcontent{
        position: relative;
        width: 800px;
        height: 400px;
        margin-top: 64px;
        box-shadow: black 0 0 12px;
        .spirit{
            background: url(../../../static/img/operate_spirit.png) no-repeat 0 -237px;
            position: absolute;
            top: 25px;
            right: 30px;
            width: 28px;
            height: 28px;
            cursor: pointer;
            display: block;
            background-size: 40px;
        }
        .hezuo{
            top: 0;
            width: 100%;
            height: 100%;
        }
        }
    }
</style>


