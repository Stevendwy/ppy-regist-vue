import Vue from 'vue'
import Vuex from 'vuex'
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
        img: "../../../static/img/icon_cn.png",
        name: "中文"
      },
      {
        type: 1,
        img: "../../../static/img/icon_en.png",
        name: "English"
      }
    ],
    registType: 'phone',
    areas: [
      {
        title: 'China',
        summary: '+86',
      },
      {
        title: 'Taiwan',
        summary: '+886',
      },
      {
        title: 'Hong Kong',
        summary: '+852',
      },
      {
        title: 'Malaysia',
        summary: '+60',
      },
    ],
  },
  getters: {
    currentLanguage(state) {
      return state.languages[state.languageType]
    },
    languageData(state) {
      return state.languageType === 0 ? languageData_cn : languageData_en
    },
    area(state) {
      return state.areas[0]
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
    }
  }
})