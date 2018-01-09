<template lang='pug'>
  .content
    .account
      .title {{content.title}}
      .remindPersonal {{content.remindPersonal}}
      .selectType {{content.selectType}}
      .radios
        label
          input(type='radio' value='phone' v-model='registType')
          | {{content.types[0]}}
        label #[input(type='radio' value='email' v-model='registType')] {{content.types[1]}}
      .phone(v-if='isPhone')
        c-selector(:items='areas'
          :selected='true'
          :currentItem='area'
          @itemClick='areaClick'
          :autoHidden='true')
        input.number(type='text' :placeholder='placeholders.mobile')
      .email(v-else key='email')
        input(type='text' :placeholder='placeholders.email')
      .code
        input(type='text' :placeholder='placeholders.code')
        c-countdown(class='c-countdown' :waitText='content.countdown' second='s' :time='3' :frequency='1' :min='0' @event='countdownClick')
      .name(v-if='isChina' key='name')
        input(type='text' :placeholder='placeholders.name')
      .foreign-name(v-else)
        input.first-name(type='text' :placeholder='placeholders.firstName')
        input.last-name(type='text' :placeholder='placeholders.lastName')
      .password
        input(type='text' :placeholder='placeholders.password')
      .password
        input(type='text' :placeholder='placeholders.confirmPassword')
      .remindCompany {{content.remindCompany}}
      .company
        input(type='text' :placeholder='placeholders.company')
      .company-location
        input(type='text' :placeholder='placeholders.companyLocation')
      .company-type
        c-selector(:items='types'
          :currentItem='type'
          @itemClick='typeClick'
          :autoHidden='true')
      .regist-remind
        span {{registRemind.l1}}
        span {{registRemind.t1}}
        span {{registRemind.l2}}
        span {{registRemind.t2}}
        span {{registRemind.l3}}
        span {{registRemind.t3}}
        span {{registRemind.l4}}
      button.regist {{content.signUp}}
      .login
        span {{content.loginRemind}}
        span {{content.login}}
    .brand-title {{languageData.brand.title}}
    img.brands(src='https://007vin.com/img/img_logo2.png', alt='brands')
</template>

<script>
import Vuex from "vuex";
import cSelector from "./selector.vue";
import cCountdown from "./countdown.vue";

export default {
  components: {
    cSelector,
    cCountdown
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...Vuex.mapState(["types", "areas"]),
    ...Vuex.mapGetters(["languageData", "isChina", "area", "type"]),
    content() {
      return this.languageData.content;
    },
    placeholders() {
      return this.content.placeholders;
    },
    registRemind() {
      return this.content.registRemind;
    },
    registType: {
      get() {
        return this.$store.state.registType;
      },
      set(registType) {
        this.updateRegistType({ registType });
      }
    },
    isPhone() {
      return this.registType === "phone";
    }
  },
  watch: {
    languageData(value) {}
  },
  methods: {
    ...Vuex.mapMutations([
      "updateRegistType",
      "updateTypeIndex",
      "updateAreaIndex"
    ]),
    countdownClick(start) {
      console.log("click");
      start();
    },
    areaClick(area, index) {
      this.updateAreaIndex({ index });
      // this.area = area;
    },
    typeClick(type, index) {
      this.updateTypeIndex({ index });
      // this.type = type;
    }
  }
};
</script>

<style scoped lang='less'>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;

  @bColor: #4990e2;

  .width {
    width: 320px;
  }

  .account {
    .width;

    .title {
      line-height: 28px;
      margin: 40px 0 20px 0;
      font-size: 20px;
      color: #4990e2;
      letter-spacing: 0;
      text-align: center;
    }

    .remindPersonal,
    .selectType,
    .remindCompany {
      font-size: 14px;
      color: #999999;
      margin-bottom: 10px;
      white-space: nowrap;
    }

    .remindCompany {
      margin-top: 10px;
    }

    .radios {
      label {
        margin-right: 40px;
        font-size: 14px;
        color: #333333;

        input {
          margin-right: 10px;
        }
      }
    }

    .input {
      height: 40px;
      .width;
      background: white;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
      margin-top: 10px;
    }

    input[type="text"] {
      .input;
    }

    ::-moz-placeholder {
      color: #999;
    }

    ::-webkit-input-placeholder {
      color: #999;
    }

    .phone {
      display: flex;
      justify-content: space-between;

      .selector {
        .input;
        width: 140px;
      }

      .number {
        width: 170px;
      }
    }

    .code {
      position: relative;

      .c-countdown {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 40px;
        width: 100px;
        color: @bColor;
      }
    }

    .foreign-name {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .first-name {
        width: 140px;
      }

      .last-name {
        width: 170px;
      }
    }

    .company-type {
      .selector {
        .input;
      }
    }

    .regist-remind {
      font-size: 14px;
      color: #333;
      margin-top: 20px;

      span:nth-child(2n) {
        color: @bColor;
        cursor: pointer;
      }
    }

    .regist {
      .input;
      margin: 20px 0;
      color: white;
      background: @bColor;
    }

    .login {
      font-size: 14px;
      color: #333;

      span:nth-child(2) {
        color: @bColor;
        cursor: pointer;
        margin-left: 20px;
      }
    }
  }

  .brand-title {
    font-size: 20px;
    color: #999999;
    margin: 40px 0 20px 0;
  }

  .brands {
    .width;
    margin-bottom: 40px;
  }
}
</style>
