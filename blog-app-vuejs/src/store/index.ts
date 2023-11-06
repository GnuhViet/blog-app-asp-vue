import { Commit, createStore } from 'vuex';

export default createStore({
  state: {
    authenticated: false,
    tableData: null,
    categoryId: null,
    id: null,
  },
  getters: {
    getTableData(state) {
      return state.tableData;
    },
    getCategoryId(state) {
      return state.categoryId;
    },
    getIdArticle(state) {
      return state.id;
    },
  },
  mutations: {
    SET_AUTH: (state: { authenticated: boolean }, auth: boolean) => (state.authenticated = auth),
    setTableData(state, data) {
      state.tableData = data;
    },
    setCategoryId(state, data) {
      state.categoryId = data;
    },
    setIdArticle(state, data) {
      state.id = data;
    },
  },
  actions: {
    setAuth: ({ commit }: { commit: Commit }, auth: boolean) => commit('SET_AUTH', auth),
  },
  modules: {},
});
