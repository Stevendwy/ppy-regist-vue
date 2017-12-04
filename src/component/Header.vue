<template>
  <div class="header-container">
    <div class="header">
      <img class="logo" src="static/img/p_yhc.png" alt="logo"/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.header-container {
  display: flex;
  justify-content: center;
  height: 44px;
  width: 100%;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1024px;
    height: 100%;

    .logo {
      width: auto;
      height: 30px;
    }
  }
}
</style>
