export const state = () => ({
  page: 0,
  maxPage: 100,
  total: 0,
  data: []
})

export const mutations = {
  setPage(state, page) {
    state.page = page;
  },
  setMaxPage(state, maxPage) {
    state.maxPage = maxPage;
  },
  setTotal(state, total) {
    state.total = total;
  },
  clearData(state) {
    state.data = [];
  },
  appendData(state, data) {
    state.data.push(...data);
  }
}
