<template lang="pug">
  .cascade-selector(:class="{hover: !toggle}")
    span.show(v-if="selected") {{currentShow}}
    span.placeholder(v-else) {{placeholder}}
    canvas.triangle(ref='triangle', width='8', height='6')
    .lists
      .list(v-for="(list, floorIndex) of lists" :key="floorIndex"
        v-if="floorIndex <= floor")
        .item(v-for="(item, index) of list" :key="index"
          @click="click(floorIndex, item)") {{item[showKey]}}
</template>

<script>
export default {
  props: {
    currentShow: {
      type: String,
    },
    lists: {
      type: Array,
      required: true
    },
    showKey: {
      type: String,
      required: true
    },
    valueKey: {
      type: String,
      required: true
    },
    floor: {
      type: Number,
      required: true
    },
    itemClick: {
      type: Function,
      requires: true
    },
    autoHidden: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
    }
  },
  data() {
    return {
      selected: false, // 是否点击过
      toggle: false, // 控制自动隐藏
    }
  },
  computed: {
    showLists() {
      let lists = this.lists
      let showLists = []
      for(let i = 0, j = lists.length; i < j; i ++) {
        if(i <= this.floor) showLists.push(lists[i])
        else break
      }
      return showLists
    }
  },
  mounted() {
    this.buildTriangle();
  },
  methods: {
    buildTriangle() {
      let ctx = this.$refs.triangle.getContext("2d");
      ctx.moveTo(0, 0);
      ctx.lineTo(8, 0);
      ctx.lineTo(4, 6);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "#333";
      ctx.fill();
    },
    click(floorIndex, item) {
      this.selected = true
      this.itemClick(floorIndex, item, () => {
        if (this.autoHidden) this.toggleClass();
      })
    },
    toggleClass() {
      this.toggle = true;
      setTimeout(() => {
        this.toggle = false;
      }, 200);
    }
  }
};
</script>

<style lang="less" scoped>
.cascade-selector {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 8px;

  // &:hover {
  //   .triangle {
  //     transform: rotateZ(180deg);
  //   }

  //   .lists {
  //     display: flex;
  //   }
  // }

  .show {
    color: #333;
    font-size: 12px;
  }

  .placeholder {
    font-size: 12px;
    color: #999;
  }

  .triangle {
    transition: transform 0.3s ease;
  }

  .lists {
    position: absolute;
    left: 0;
    top: 100%;
    display: none;
    border: 1px solid #d8d8d8;
    border-right: 0;
    z-index: 999;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

    .list {
      min-width: 80px;
      max-height: 300px;
      border-right: 1px solid #d8d8d8;
      background: white;
      overflow: scroll;

      .item {
        width: 100%;
        line-height: 32px;
        padding-left: 8px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 12px;
        color: #333;
      }
    }
  }
}

.hover:hover {
  .triangle {
    transform: rotateZ(180deg);
  }

  .lists {
    display: flex;
  }
}
</style>
