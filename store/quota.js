export const state = () => ({
  quota: {},
  message: ''
})

export const mutations = {
  setQuota(state, quota) {
    state.quota = quota;
  },
  setMessage(state, message) {
    state.message = message;
  }
}
