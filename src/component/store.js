import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import languageData_cn from './language_cn'
import languageData_en from './language_en'
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
    areas: [], // 地区手机数据
  },
  getters: {
    currentLanguage(state) {
      return state.languages[state.languageType]
    },
    languageData(state) {
      return state.languageType === 0 ? languageData_cn : languageData_en
    },
    registRequest(state) {
      return {
        area: state.areas[0],
        type: 'phone',
      }
    },
    isChina(state) {
      return state.languageType === 0
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
    updateAreas(state, payload) {
      state.areas = payload.areas
    }
  },
  actions: {
    aTypes({ state, commit }, payload) {
      let language = 'en'
      if (state.languageType === 0) language = 'cn'

      return (
        axios.get('http://127.0.0.1:10000/types', { params: { language } })
          .then(res => {
            let types = res.data.types
            commit('updateTypes', { types })
            return res
          })
      )
    },
    aAreas({ state, commit }, payload) {
      let language = 'en'
      if (state.languageType === 0) language = 'cn'

      return (
        axios.get('http://127.0.0.1:10000/areas', { params: { language } })
          .then(res => {
            let areas = res.data.areas
            commit('updateAreas', { areas })
            return res
          })
      )
    }
  }
})