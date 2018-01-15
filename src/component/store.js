import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import languageData_cn from './language_cn'
import languageData_en from './language_en'
import u from './u'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 0 表示中文， 1 表示英语，与 languages 索引对应
    languageType: 1,
    languages: [
      {
        type: 0,
        img: "./static/img/icon_cn.png",
        name: "中文"
      },
      {
        type: 1,
        img: "./static/img/icon_en.png",
        name: "English"
      }
    ],
    registType: 'phone',
    types: [], // 注册公司类型
    typeIndex: -1, // 默认选中类型索引
    areas: [], // 地区手机数据
    areaIndex: 0, // 默认选中地区索引
    messageShow: false, // 显示消息
    message: '', // 消息
  },
  getters: {
    currentLanguage(state) {
      return state.languages[state.languageType]
    },
    languageData(state) {
      return state.languageType === 0 ? languageData_cn : languageData_en
    },
    languageType(state) {
      return state.languageType === 0 ? 'cn' : 'en'
    },
    registRequest(state) {
      return {
        area: state.areas[0],
        type: 'phone',
      }
    },
    isChina(state) {
      return state.languageType === 0
    },
    type(state, getters) {
      let languageData = getters.languageData
      return state.types[state.typeIndex] || (languageData && languageData.content.placeholders.companyType)
    },
    area(state) {
      return state.areas[state.areaIndex] || ''
    },
  },
  mutations: {
    updateLanguageType(state, { languageType }) {
      state.languageType = languageType
    },
    updateRegistType(state, { registType }) {
      state.registType = registType
    },
    updateTypes(state, payload) {
      state.types = payload.types
    },
    updateTypeIndex(state, payload) {
      state.typeIndex = payload.index
    },
    updateAreas(state, payload) {
      state.areas = payload.areas
    },
    updateAreaIndex(state, payload) {
      state.areaIndex = payload.index
    },
    openMessage(state, payload) {
      state.message = payload.message
      state.messageShow = true
    },
    closeMessage(state) {
      state.messageShow = false
    },
  },
  actions: {
    aTypes({ state, getters, commit }, payload) {
      let language = 'en'
      if (state.languageType === 0) language = 'cn'

      return (
        axios.get('/base/company/type', { params: { language }, headers: { sys_Language: getters.languageType } })
          .then(res => {
            let types = res.data.data
            commit('updateTypes', { types })
            return res
          })
      )
    },
    aAreas({ state, getters, commit }, payload) {
      let language = 'en'
      if (state.languageType === 0) language = 'cn'

      return (
        axios.get('/mobile/area/code', { params: { language }, headers: { sys_Language: getters.languageType } })
          .then(res => {
            let areas = res.data.data
            commit('updateAreas', { areas })
            return res
          })
      )
    },
    regist({ state, getters }, payload) {
      let req = payload
      let customReq = {
        company_type: getters.type.value,
        country_code: getters.area.code,
      }
      req = { ...req, ...customReq }
      axios.post(u.link('/user/register_web', req), req, { headers: { sys_Language: getters.languageType } })
        .then(res => {
          console.log(res)
          debugger
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})