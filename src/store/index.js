import { createStore } from 'vuex'
import { setItem, getItem } from '@/utils/storage'

const TOKEN_KEY = 'TOUTIAO_USER'

export default createStore({
  state: {
    user: getItem(TOKEN_KEY)
  },
  getters: {},
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
