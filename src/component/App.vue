<template>
  <div class="regist-container">
    <div class="regist">
      <span>新用户注册</span>
      <div class="input-container"><input v-model="userInfo.phone" placeholder="手机号" autofocus /><span>*</span></div>
      <div class="input-container"><input v-model="userInfo.checkCode" placeholder="验证码" /><span>*</span></div>
      <div class="input-container"><input v-model="userInfo.name" placeholder="用户姓名" /><span>*</span></div>
      <div class="input-container"><input v-model="userInfo.company" placeholder="公司名称" /><span>*</span></div>
      <div class="input-container">
        <el-cascader
          placeholder="选择城市"
          :options="options"
          change-on-select
          @change="handleAreaClick"
          :props="areaProps"/>
        <span>*</span>
      </div>
      <div class="types">
        <button :type="type"
          v-for="type in types" :key="type"
          :class="typeClass(type)"
          @click="userInfo.type=type">{{type}}</button>
        <span>*</span>
      </div>
      <label>
        <input type="checkbox" v-model="checked" />
        我已阅读并同意<span class="delegate" @click="showDelegate">《萤火虫™注册协议》</span>
        <div class="show-box" />
      </label>
      <button @click="regist">登录<img id="little-mum" src="https://007vin.com/img/load.gif" /></button>
    </div>
  </div>
</template>

<script>
import { Cascader } from "element-ui"
import u from '../utils/utils'

Vue.use(Cascader)

export default {
  data() {
    return {
      userInfo: {
        phone: '',
        checkCode: '',
        password: '',
        name: '',
        company: '',
        area: '',
        type: '汽配商'
      }, // 用户信息
      checked: false,
      types: ['汽配商', '修理厂', '4S店', '其他'], // 是否阅读同意协议
      options: [], // 联级地区数据
      areaProps: { // 联级组件结构 key
        label: 'name',
        value: 'code',
        children: 'cities'
      },
      code: 0, // 初始值为 0，后面根据返回值赋值
    }
  },
  mounted() {
    this.handleAreaClick()
  },
  computed: {
    selectorReq() {
      return {p_code: this.code}
    }
  },
  methods: {
    showDelegate() {
      alert('showDelegate')
    },
    regist() {
      var userInfo = this.userInfo

      if (userInfo.phone.length < 1) {
        alert('请输入手机号')
        return
      }
      else if (userInfo.checkCode.length < 1) {
        alert('请输入验证码')
        return
      }
      else if (userInfo.password.length < 1) {
        alert('请输入密码')
        return
      }
      else if (userInfo.name.length < 1) {
        alert('请输入姓名')
        return
      }
      else if (userInfo.company.length < 1) {
        alert('请输入公司名称')
        return
      }
      

      var query = '?username=' + this.username + '&password=' + this.password
      var body = {
        username: userInfo.username,
        password: userInfo.password
      }
      this.$http.post('/community/login' + query, { body })
        .then(res => {
          var body = res.body
          if (body.code === 1) location.href = "/"
          else alert(body.msg)
        })
        .catch(res => console.log(res))
    },
    typeClass(type) {
      return type === this.userInfo.type ? 'type-selected' : 'type'
    },
    handleAreaClick(value) {
      let level = 1
      let indexes = []
      if(value) {
        this.userInfo.area = '' // 取消选中地区
        if(value[1]) {
          this.userInfo.area = value[2] // 保存选中地区
          return
        }
        else if(value[0]) {
          value = value[0]
          level = 2
          let data = this.options
          for(let i = 0, j = data.length; i < j; i ++) {
            let item = data[i]
            if(item.code === value) {
              indexes[0] = i
              break
            }
          }
        }
      }

      this.code = value
      
      u.get('/community/address/selector', this.selectorReq, {closeMum: true})
        .then(res => {
          let data = res.data
          for(let i = 0, j = data.length; i < j; i ++) {
            let item = data[i]
            if(level < 2) item.cities = []
          }
          if(indexes.length === 1) this.options[indexes[0]].cities = data
          else this.options = data
        })
    }
  }
}
</script>


<style lang='less'>
@eColor: #ec6337;
@d8line: 1px solid #d8d8d8;

html {
  height: 100%;

  body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      padding: 0 0 0 8px;
    }
    
    button {
      cursor: pointer;
    }
  }
}

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

.regist-button {
  width: 60px;
  height: 32px;
  border: 1px solid @eColor;
  border-radius: 4px;
  outline: none;
  color: @eColor;
  background-color: white;
}

.regist-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1024px;
}

.regist {
  display: flex;
  flex-direction: column;
  align-items: center;

  &>* {
    margin-top: 10px;
    border-radius: 4px;
  }

  &>span {
    color: @eColor;
  }

  .normalSize {
    width: 340px;
    height: 40px;
    border: @d8line;
    outline: none;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .mark {
    position: absolute;
    right: -14px;
    top: 10px;
    margin-left: 8px;
    color: @eColor;
  }

  &>button {
    .normalSize;
  }

  .input-container {
    position: relative;
    width: 340px;

    input {
      .normalSize;
      font-size: 12px;
      color: #333;  
      padding-left: 8px;
    }

    ::-moz-placeholder {
      color: #999;
    }

    ::-webkit-input-placeholder {
      color: #999;
    }

    &>span:not(.el-cascader) {
      .mark;
    }
  }

  .types {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 340px;

    .type {
      .normalSize;  
      width: 80px;
    }

    .type-selected {
      .type;
      border: 1px solid @eColor;
    }

    span {
      .mark;
    }
  }

  label {
    position: relative;
    width: 340px;
    font-size: 12px;
    color: #333;

    input {
      cursor: pointer;
    }

    input:checked + .show-box {
      border: @d8line;
      box-sizing: border-box;
      background: white;
    }

    .show-box {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background: @eColor;
      cursor: pointer;

      &:before {
        
        content: '';
        position: absolute;
        top: 2px;
        left: 6px;
        width: 3px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    .delegate {
      color: @eColor;
      cursor: pointer;
    }
  }

  &>button {
    color: white;
    background-color: @eColor;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #little-mum {
    display: none;
    width: 20px;
    height: 20px;
  }
}

.company, .group {
  width: 1024px;
  height: auto;
}

.company {
  margin: 40px 0;
}

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
