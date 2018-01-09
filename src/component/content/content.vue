<template lang="pug">
  .content
    .account
      .title {{content.title}}
      .remindPersonal {{content.remindPersonal}}
      .selectType {{content.selectType}}
      .radios
        label
          input(type="radio", value="phone", v-model="registType")
          | {{content.types[0]}}
        label #[input(type="radio", value="email", v-model="registType")] {{content.types[1]}}
      .phone(v-if="isPhone")
        c-selector(:items="areas", :currentItem='area')
        input.number(type="text", :placeholder="placeholders.mobile")
      .email(v-else)
        input(type="text", :placeholder="placeholders.email")
      .code
        input(type="text", :placeholder="placeholders.code")
      .name(v-if="isChina")
        input(type="text", :placeholder="placeholders.name")
      .foreign-name(v-else)
        input.first-name(type="text", :placeholder="placeholders.firstName")
        input.last-name(type="text", :placeholder="placeholders.lastName")
      .password
        input(type="text", :placeholder="placeholders.password")
      .password
        input(type="text", :placeholder="placeholders.confirmPassword")
      .remindCompany {{content.remindCompany}}
      .company
        input(type="text", :placeholder="placeholders.company")
      .company
        input(type="text", :placeholder="placeholders.companyLocation")
      .company
        input(type="text", :placeholder="placeholders.companyType")
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
    img.brands(src="https://007vin.com/img/img_logo2.png", alt="brands")
</template>

<script>
import Vuex from "vuex";
import cSelector from "./selector.vue";

export default {
  components: {
    cSelector
  },
  data() {
    return {};
  },
  computed: {
    ...Vuex.mapState(["areas"]),
    ...Vuex.mapGetters(["languageData", "area", 'isChina']),
    content() {
      return this.languageData.content;
    },
    placeholders() {
      return this.content.placeholders
    },
    registRemind() {
      return this.content.registRemind
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
  methods: {
    ...Vuex.mapMutations(["updateRegistType"])
  }
};
</script>

<style scoped lang="less">
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
