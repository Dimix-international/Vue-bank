import {authApi} from "@/api/authApi";
import {error} from "@/utils/error";
const TOKEN_KEY = 'jwt-token';


export default {
    namespaced: true, //ллокальные названия action
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY) || null,
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem(TOKEN_KEY, token);
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem(TOKEN_KEY);
        }
    },
    actions: {
       async login( {commit, dispatch}, payload) {
           const response = await authApi.login(payload);

           if( typeof response === "string" ) {
               // dispatch в родит компоненту
               dispatch('setMessage', {
                   value: error(response),
                   type: 'danger'
               }, {root:true}
               );
               throw new Error(); //чтобы не было редиректа блоке try useLoginForm, а попали в catch
           }

           const {idToken} = response;
           commit('setToken', idToken);
           commit('clearMessage',null, {root:true});
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        }
    }
}