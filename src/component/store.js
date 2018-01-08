import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 0 表示中文， 1 表示英语，与 languages 索引对应
    languageType: 0,
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
  },
  getters: {
    currentLanguage(state) {
      return state.languages[state.languageType]
    }
  },
  mutations: {
    updateLanguageType(state, type) {
      state.languageType = type
    }
  }
})