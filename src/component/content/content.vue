<template lang='pug'>
  .content
    .account
      .title {{content.title}}
      .remindPersonal {{content.remindPersonal}}
      .selectType {{content.selectType}}
      .radios
        label
          input(type='radio' value='email' v-model='registType')
          | {{content.types[0]}}
        label #[input(type='radio' value='phone' v-model='registType')] {{content.types[1]}}
      .phone(v-if='isPhone')
        c-selector(v-if="!isChina"
          :items='areas'
          :selected='true'
          :currentItem='area'
          @itemClick='areaClick'
          :autoHidden='true'
          lKey="name"
          rKey="code")
        input.number(:class="{full: isChina}" type='text' :placeholder='placeholders.mobile' v-model="mobile")
      .email(v-else key='email')
        input(type='text' :placeholder='placeholders.email' v-model="email")
      .code
        input(type='text' :placeholder='placeholders.code' v-model="sms_code")
        c-countdown(class='c-countdown' :waitText='content.countdown' second='s' :time='60' :frequency='1' :min='0' @event='countdownClick')
      .name(v-if='isChina' key='name')
        input(type='text' :placeholder='placeholders.name' v-model="real_name")
      .foreign-name(v-else)
        input.first-name(type='text' :placeholder='placeholders.firstName' v-model="firstName")
        input.last-name(type='text' :placeholder='placeholders.lastName' v-model="lastName")
      .password
        input(type='password' :placeholder='placeholders.password' v-model='pwd1')
      .password
        input(type='password' :placeholder='placeholders.confirmPassword' v-model="pwd2")
      .remindCompany {{content.remindCompany}}
      .company
        input(type='text' :placeholder='placeholders.company' v-model="company")
      c-cascade-selector.cascade(:lists="lists"
        :autoHidden="true"
        :placeholder="placeholders.companyLocation"
        :currentShow="currentCity"
        showKey="name"
        valueKey="code"
        :floor="currentFloor"
        :itemClick="itemClick")
      .company-type
        c-selector(:items='types'
          :currentItem='type'
          @itemClick='typeClick'
          :autoHidden='true'
          lKey="value")
      .regist-remind
        span {{registRemind.l1}}
        span(@click="agreeshow") {{registRemind.t1}}
        span {{registRemind.l2}}
        span(@click="agreeshow") {{registRemind.t2}}
        span {{registRemind.l3}}
        span(@click="agreeshow") {{registRemind.t3}}
        span {{registRemind.l4}}
      button.regist(@click="registClick") {{content.signUp}}
      .login
        span {{content.loginRemind}}
        span {{content.login}}
    .brand-title {{languageData.brand.title}}
    img.brands(src='static/img/img_logo.png', alt='brands')

    c-agree-ment-en(v-if="!isChina && agreementshow ")
    c-agree-ment-cn(v-if="isChina && agreementshow")
    c-teamwork(v-if="teamwork") 
</template>

<script>
import Vuex from "vuex";
import cSelector from "./selector.vue";
import cCountdown from "./countdown.vue";
import cCascadeSelector from "./cascade-selector.vue";
import cAgreeMentEn from '../common/agreementen.vue';
import cAgreeMentCn from '../common/agreementcn.vue';
import cTeamwork from '../common/teamwork.vue'
import u from "../u";

export default {
  components: {
    cSelector,
    cCountdown,
    cCascadeSelector,
    cAgreeMentEn,
    cAgreeMentCn,
    cTeamwork
  },
  data() {
    return {
      mobile: "", // 手机号
      email: "", // email
      sms_code: "", // 验证码
      country_code: "", // 国家地区代码
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      company: "",
      companyLocation: "",
      currentFloor: 0, // 当前层级
      currentCityCode: 0, // 初始城市代码（国家地区统称城市）
      currentCity: "",
      pwd1: "",
      pwd2: "",
      real_name: "", // 中文名
    };
  },
  mounted() {
    this.aCitys();
    this.buildData();
  },
  computed: {
    ...Vuex.mapState(["types", "areas", "lists", "agreementshow", "teamwork"]),
    ...Vuex.mapGetters([
      "languageData",
      "languageType",
      "isChina",
      "area",
      "type",
      "getagreementShow",
      "getteamworkShow"
    ]),
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
    },
    realName() {
      return this.firstName + this.lastName;
    }
  },
  methods: {
    ...Vuex.mapMutations([
      "updateRegistType",
      "updateTypeIndex",
      "updateAreaIndex",
      "openMessage",
      "agreeShow"
    ]),
    ...Vuex.mapActions(["aCitys"]),
    buildData() {
      if (this.isChina) this.currentCityCode = 86;
    },
    countdownClick(start) {
      if (this.isPhone && this.mobile.length < 1) {
        this.openMessage({ message: "手机号长度不足" });
        return;
      } else if (!this.isPhone && this.email.length < 1) {
        this.openMessage({ message: "邮箱长度不足" });
        return;
      }

      let req = {
        // 默认邮箱
        email: this.email,
        type: "1"
      };
      let path = "/user/send_email_verification_code"; // 邮箱验证码

      if (this.isPhone) {
        req = { ...req, mobile: this.mobile };
        path = "/smscode";
      }

      u
        .axiosPost(u.link(path, req), req, {
          headers: { "Sys-Language": this.languageType }
        })
        .then(res => {
          if (!res) return;

          start();
        });
    },
    areaClick(area, index) {
      this.updateAreaIndex({ index });
    },
    typeClick(type, index) {
      this.updateTypeIndex({ index });
    },
    agreeshow(){
      let that = this
      that.agreeShow()
    },
    registClick() {
      let username = this.email;
      if (this.isPhone) username = this.mobile;

      let req = {
        username,
        sms_code: this.sms_code,
        real_name: this.real_name || this.realName,
        company: this.company,
        reg_type: this.registType,
        city: this.currentCityCode,
        pwd1: this.pwd1,
        pwd2: this.pwd2
      };

      this.$store.dispatch("regist", req);
    },
    itemClick(floorIndex, item, close) {
      this.currentCityCode = item.code;
      this.currentCity = item.name;
      this.aCitys({ currentCityCode: this.currentCityCode }).then(res => {
        if(res) this.currentFloor = floorIndex + 1;
        else {
          this.currentFloor = floorIndex
          close()
        }
      });
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

    input[type="password"] {
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

      .full {
        .width;
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

  .cascade {
    .width;
    height: 40px;
    border: 1px solid #d8d8d8;
    margin-top: 10px;
    border-radius: 4px;
  }
}
</style>
