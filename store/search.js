export const state = () => ({
  term: '',
  seasonTerm: ''
})

export const mutations = {
  setTerm(state, term) {
    state.term = term;
  },

  setSeasonTerm(state, term) {
    state.seasonTerm = term;
  }
}

export const actions = {
  search({ commit }, { searchDesigns, term, seasonTerm, localePathFunction }) {
    let section = searchDesigns ? '/designs' : '/collections';
    this.$router.push({path: localePathFunction(section), query: {keyword: term, season: seasonTerm}});
  }
}