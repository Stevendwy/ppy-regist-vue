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
        img: "static/img/icon_cn.png",
        name: "中文"
      },
      {
        type: 1,
        img: "static/img/icon_en.png",
        name: "English"
      }
    ],
    registType: 'phone',
    types: [], // 注册公司类型
    typeIndex: -1, // 默认选中类型索引
    areas: [], // 地区手机数据
    areaIndex: 0, // 默认选中地区索引
    lists: [],
    messageShow: false, // 显示消息
    message: '', // 消息
    agreementshow:false,  //用户协议显示
    teamwork: false,      //数据合作图片展示
    teamworkimg: {
      hezuo:"static/img/p_hezuo.png"
    }
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
    getagreementShow(state){
      return state.agreementshow
    },
    getteamworkShow(state){
      return state.teamwork
    },
    getteamworkimg(state){
      return state.teamworkimg
    }
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
    updateLists(state, payload) {
      state.lists.push(payload.list)
    },
    openMessage(state, payload) {
      state.message = payload.message
      state.messageShow = true
    },
    closeMessage(state) {
      state.messageShow = false
    },
    agreeShow(state){
      state.agreementshow = true
    },
    agreeHidden(state){
      state.agreementshow = false
    },
    teamworkShow(state){
      state.teamwork = true
    },
    teamworkHidden(state){
      state.teamwork = false
    }
  },
  actions: {
    aTypes({ state, getters, commit }, payload) {
      return (
        u.axiosGet('/base/company/type', { headers: { "Sys-Language": getters.languageType } })
          .then(res => {
            let types = res.data
            commit('updateTypes', { types })
            return res
          })
      )
    },
    aAreas({ state, getters, commit }, payload) {
      return (
        u.axiosGet('/mobile/area/code', { headers: { "Sys-Language": getters.languageType } })
          .then(res => {
            let areas = res.data
            commit('updateAreas', { areas })
            return res
          })
      )
    },
    aCitys({ state, getters, commit }, payload) {
      let city_code = payload && payload.currentCityCode
      
      return (
        u.axiosGet(
          "/city_list",
          { headers: { "Sys-Language": getters.languageType } },
          { city_code }
        )
          .then(res => {
            if (!res) return;

            let data = res.data;
            if (data.length < 1) return // 没有后续数据了

            commit('updateLists', { list: data })

            return true
          })
      )
    },
    regist({ state, getters, commit }, payload) {
      let req = payload
      let customReq = {
        company_type: getters.type.value,
        country_code: getters.isChina ? '86' : getters.area.code,
      }
      req = { ...req, ...customReq }

      u.formCheck(req, ['username', 'sms_code', 'real_name', 'pwd1', 'pwd2', 'city', 'company', 'company_type'])
        .catch(err => {
          commit('openMessage', { message: `Missing the ${err} field.` })
        })
        .then(res => {
          if (!res) return
          u.axiosPost(u.link('/user/register_web', req), req, { headers: { "Sys-Language": getters.languageType } })
            .then(res => {
              commit('openMessage', { message: `Congratulations! You've successfully 
              changed your password.` })
              location.href = "/"
            })
            .catch(err => {
              commit('openMessage', { message: err })
            })
        })
    }
  }
})