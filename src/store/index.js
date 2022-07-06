import { createStore, createLogger } from 'vuex'
import auth from "./modules/auth.module";
import request from "./modules/requset.module";

const plugins = [];

if(process.env.NODE_ENV === 'development') {
  plugins.push(createLogger);
}


export default createStore({
  state: () => ({
    message: null,
    sidebar: false,
  }),
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    clearMessage(state) {
      state.message = null;
    },
    openSidebar(state) {
      state.sidebar = true;
    },
    closeSidebar(state) {
      state.sidebar = false;
    },
  },
  actions: {
    setMessage({commit}, payload) {
      commit('setMessage', payload);

      setTimeout(() => {
        commit('clearMessage');
      },5000);
    }
  },
  modules: {
    auth,
    request,
  },
  plugins: plugins,
})
