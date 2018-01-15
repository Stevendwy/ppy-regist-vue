<template lang='pug'>
  .selector(:class='{hover: !toggle}')
    span(:style='!selected && initialColor') {{currentItem.name || currentItem.value || currentItem}}
    .selected
      span {{currentItem.code}}
      canvas.triangle(ref='triangle', width='8', height='6')
    .items(ref='items')
      .item(v-for='(item, index) of items', :key='index'
        @click='click(item, index)')
        span {{item.name || item.value}}
        span {{item.code}}
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    selected: Boolean, // 是否有初始选中
    currentItem: null,
    autoHidden: Boolean
  },
  data() {
    return {
      initialColor: { color: '#999' },
      toggle: false
    };
  },
  mounted(){
    this.buildTriangle()
  },
  methods: {
    buildTriangle() {
      let ctx = this.$refs.triangle.getContext('2d')
      ctx.moveTo(0, 0)
      ctx.lineTo(8, 0)
      ctx.lineTo(4, 6)
      ctx.closePath()
      ctx.stroke()
      ctx.fillStyle = '#333'
      ctx.fill()
    },
    click(item, index) {
      this.initialColor = null;
      this.$emit('itemClick', item, index);

      if (this.autoHidden) this.toggleClass();
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

<style lang='less' scoped>
.selector {
  
  .item;
  position: relative;
  font-size: 12px;
  color: #475669;
  cursor: pointer;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 8px;
  }

  .selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40px;

    .triangle {
      transition: transform .3s;
    }
  }

  .items {
    position: absolute;
    top: 36px;
    left: 0;
    display: none;
    max-height: 300px;
    width: 100%;
    background: white;
    border: 1px solid #d3dce6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    z-index: 1;
    overflow-y: scroll;

    .item {
      .item;
      width: 100%;

      &:hover {
        background: #0076ff;
        color: white;
      }
    }
  }
}

.hover:hover {
  .triangle {
    transform: rotateZ(180deg);
  }

  .items {
    display: block;
  }
}
</style>
