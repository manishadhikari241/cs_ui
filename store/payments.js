export const state = () => ({
  pkg: {
    key: 'standard',
    index: 0
  },
  method: 'braintree'
})

export const mutations = {
  setPackage(state, { key, index }) {
    state.pkg.key = key;
    state.pkg.index = index;
  },

  setDefaultPackage(state,{index}){
    state.pkg.index = index;
    console.log(state.pkg.index);
  }

}
