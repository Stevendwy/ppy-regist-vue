<template lang="pug">
  .selector
    span {{currentItem.title || currentItem}}
    span {{currentItem.summary}}
    .items
      .item(v-for="(item, index) of items", :key="index")
        span {{item.title || item}}
        span {{item.summary}}
</template>

<script>
export default {
  props: ["items", "currentItem"]
};
</script>

<style lang="less" scoped>
.selector {
  .item;
  position: relative;
  font-size: 12px;
  color: #475669;
  cursor: pointer;

  &:hover{
    .items {
      display: block;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 8px;
  }

  .items {
    position: absolute;
    top: 40px;
    left: 0;
    display: none;
    width: 100%;
    background: white;
    border: 1px solid #d3dce6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    border-radius: 2px;

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
</style>
