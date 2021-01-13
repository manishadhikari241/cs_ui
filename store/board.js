export const state = () => ({
    notify: false,
    counter: 0,
    container: null
  })
  
  export const mutations = {
    trigger(state, {container}) {
      state.notify = true
      state.counter += 1
      state.container = container
    },

    notified(state) {
      state.notify = false
      state.counter = 0
      state.container = null
    }
  }
  