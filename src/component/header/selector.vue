<template lang="pug">
  .selector
    img.icon(:src="currentLanguage.img", alt="img")
    span.language {{currentLanguage.name}}
    canvas.triangle(ref="triangle", width=12, height=6)
    ul.list
      li.item(v-for="language of languages", :key="language.name" @click="click(language.type)")
        img.icon(:src="language.img", alt="img")
        span.language {{language.name}}
</template>

<script>
import Vuex from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...Vuex.mapState(["languages"]),
    ...Vuex.mapGetters(["currentLanguage"])
  },
  mounted() {
    this.buildTriangle();
  },
  methods: {
    ...Vuex.mapMutations(["updateLanguageType"]),
    ...Vuex.mapActions(["aTypes", "aAreas", "aCitys"]),
    buildTriangle() {
      let ctx = this.$refs.triangle.getContext("2d");
      ctx.moveTo(0, 0);
      ctx.lineTo(6, 6);
      ctx.lineTo(12, 0);
      ctx.strokeColor = "#d8d8d8";
      ctx.stroke();
    },
    click(type) {
      this.updateLanguageType({ languageType: type })
      this.$axios.all([this.aTypes(), this.aAreas(), this.aCitys()])
    }
  }
};
</script>

<style lang="less" scoped>
.selector {
  position: relative;
  width: 100px;
  line-height: 44px;
  cursor: pointer;
  font-size: 14px;
  color: #666;

  .icon {
    position: relative;
    top: 5px;
    width: 20px;
    margin-left: 4px;
  }

  .language {
    margin-left: 4px;
  }

  .triangle {
    margin-left: 4px;
    transition: transform 0.3s;
  }

  &:hover {
    .list {
      display: block;
    }

    .triangle {
      transform: rotateZ(180deg);
    }
  }

  .list {
    position: absolute;
    top: 44px;
    display: none;
    width: 100%;
    border: 1px solid #d8d8d8;
    border-top: none;

    .item {
      height: 44px;

      &:hover {
        background: #d8d8d8;
      }
    }
  }
}
</style>
