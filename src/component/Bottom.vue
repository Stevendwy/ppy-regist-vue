<template>
  <div class="bottom">
    <!-- <span class="about">关于我们</span> -->
    <span class="cer">© 2017 yhcqp.com</span>
    <a class="cer" href="http://www.miitbeian.gov.cn/">浙ICP备：17026959号-3</a>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1024px;
  height: 72px;
  background-color: #333;

  .about {
    font-size: 14px;
    color: white;
    margin-left: 20px;
    cursor: not-allowed;
  }
  
  .cer {
    margin-top: 6px;
    font-size: 12px;
    color: #d8d8d8;
    margin-left: 20px;
  }
}
</style>
