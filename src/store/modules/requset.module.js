import {requestAxios} from "@/api/instance/request";
import store from "@/store";

export default {
    namespaced: true,
    state() {
        return {
            requests: [],
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests;
        },
        addRequest(state, request) {
            state.requests.push(request);
        }
    },
    actions: {
        async create({ commit ,dispatch }, payload) {
            try {
                //получим из authModule токен
              const token = store.getters['auth/token'];
              const { data } =  await requestAxios.post(`/request.json?auth=${token}`, payload);

              commit('addRequest', {...payload, id: data.name});
              dispatch ('setMessage', {
                  value: 'Заявка успешно создана!',
                  type: 'primary'
              }, { root:true })

            } catch (e) {
                dispatch ('setMessage', {
                    value: `${e.message}`,
                    type: 'danger'
                }, { root:true })
            }
        },
        async load ({ commit ,dispatch }) {
            try {
                const token = store.getters['auth/token'];
                const { data } =  await requestAxios.get(`/request.json?auth=${token}`);
                const requests = Object.keys(data).map(id => ({
                    ...data[id],
                    id
                }));
                commit('setRequests', requests);
            } catch (e) {
                dispatch ('setMessage', {
                    value: `${e.message}`,
                    type: 'danger'
                }, { root:true })
            }
        },
        async loadById ({ dispatch }, id) {
            try {
                const token = store.getters['auth/token'];
                const { data } =  await requestAxios.get(`/request/${id}.json?auth=${token}`);
                return data;
            } catch (e) {
                dispatch ('setMessage', {
                    value: `${e.message}`,
                    type: 'danger'
                }, { root:true })
            }
        },
        async removeById ({dispatch }, id) {
            try {
                const token = store.getters['auth/token'];
                await requestAxios.delete(`/request/${id}.json?auth=${token}`);
                dispatch ('setMessage', {
                    value: `Заявка удалена`,
                    type: 'primary'
                }, { root:true })
            } catch (e) {
                dispatch ('setMessage', {
                    value: `${e.message}`,
                    type: 'danger'
                }, { root:true })
            }
        },
        async updateById ({ dispatch }, request) {
            const {id, ...rest} = request;
            try {
                const token = store.getters['auth/token'];
                await requestAxios.put(`/request/${id}.json?auth=${token}`, rest);
                dispatch ('setMessage', {
                    value: `Заявка обновлена`,
                    type: 'primary'
                }, { root:true })
            } catch (e) {
                dispatch ('setMessage', {
                    value: `${e.message}`,
                    type: 'danger'
                }, { root:true })
            }
        },
    },
    getters: {
        requests(state) {
            return state.requests
        }
    }
}