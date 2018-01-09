<template lang="pug">
  .app
    p-header
    p-content
    p-footer
</template>

<script>
import pHeader from './component/header/header.vue'
import pContent from './component/content/content.vue'
import pFooter from './component/footer/footer.vue'

export default {
  components: {
    pHeader,
    pContent,
    pFooter,
  },
  data() {
    return (
      {
        
      }
    )
  }
}
</script>


<style lang='less'>
html,body {
  margin: 0;
  height: 100%;

  * {
    box-sizing: border-box;
  }

  .app {
    height: 100%;

    &>div {
      
      @media screen and (min-width: 600px) {
        & {
          padding: 0 e('calc(50% - 512px)');
        }
      }
    }

    input, button {
      outline: none;
      padding: 0;
    }

    input[type="text"] {
      padding-left: 8px;
    }

    button {
      cursor: pointer;

      &.text {
        background: transparent;
        border: none;
        color: white;
        font-size: 14px;
      }
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
}
</style>
