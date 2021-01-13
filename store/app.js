import { resolve } from "url";

export const state = () => ({
  requestButton: null,
  init: {
  }
})

export const getters = {
  requestButton(state) {
    return state.requestButton;
  }
}
export const mutations = {

  requestButton(state, data) {
    state.requestButton = data.request
  },

  setInit(state, data) {
    state.init = data;
  },

  setLang(state, lang) {
    state.lang = lang;
  },

  addList(state, list) {
    state.init.lists.unshift(list);
  },
  replaceList(state, { index, list }) {
    state.init.lists[index] = list;
  },
  updateListName(state, { index, name }) {
    state.init.lists[index].name = name;
  },
  deleteList(state, { index }) {
    state.init.lists.splice(index, 1);
  },

  setQuota(state, quota) {
    state.init.quota = quota;
  },
  updateQuota(state, { key, delta }) {
    state.init.quota[key] += delta;
  },
  updatePlanQuota(state, { delta }) {
    state.init.plan_quota += delta;
  },

  setAddresses(state, addresses) {
    state.init.addresses = addresses;
  },
  addAddress(state, address) {
    state.init.addresses= address
  },
  replaceAddress(state, { index, address }) {
    state.init.addresses[index] = address;
  },
  deleteAddress(state, index) {
    state.init.addresses.splice(index, 1);
  }
}
export const actions = {

  checkQuota(context, callback) {
    this.$axios.$get(`/users/${this.$auth.user.id}/quota`).then(response => {
      callback(response);
    });
  },
  
  requestButton(context) {
    return new Promise((resolve,reject)=>{
      this.$axios
        .$get(
          `/requests/collection/hasPending`
        )
        .then(response => {
          resolve(response);
          if (response.data.length == 0) {
            context.commit("requestButton", { request: true });
          } else {
            context.commit("requestButton", { request: false });
          }
        }).catch(error=>{
          reject(error);
        })
    })

  }
}
