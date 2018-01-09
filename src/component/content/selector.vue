<template lang="pug">
  .selector(:class="{hover: !toggle}")
    span(:style="initialColor") {{currentItem.title || currentItem}}
    span {{currentItem.summary}}
    .items(ref='items')
      .item(v-for="(item, index) of items", :key="index"
        @click="click(item, index)")
        span {{item.title || item}}
        span {{item.summary}}
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    currentItem: null,
    autoHidden: Boolean
  },
  data() {
    return {
      initialColor: { color: '#999' },
      toggle: false,
    }
  },
  methods: {
    click(item, index) {
      this.initialColor = null
      this.$emit('itemClick', item, index)

      if(this.autoHidden) this.toggleClass()
    },
    toggleClass() {
      this.toggle = true
      setTimeout(() => {
        this.toggle = false
      }, 200);
    }
  }
};
</script>

<style lang="less" scoped>
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

  .items {
    position: absolute;
    top: 36px;
    left: 0;
    display: none;
    width: 100%;
    background: white;
    border: 1px solid #d3dce6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    z-index: 1;

    .item {
      .item;
      width: 100%;

      &:hover {
        background: #0076FF;
        color: white;
      }
    }
  }
}

.hover:hover {
  .items {
    display: block;
  }
}
</style>
