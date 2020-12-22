export const state = () => ({
  mode: 1
})

export const mutations = {
  setMode(state, mode) {
    state.mode = mode;
  }
}