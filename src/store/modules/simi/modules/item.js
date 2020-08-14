export default {
  namespaced: true,
  state: {
    lstNeedRefresh: false
  },
  actions: {
    refreshList({
      state
    }) {
      state.lstNeedRefresh = true
    }
  },
  mutations: {
    refreshListFinished(state) {
      state.lstNeedRefresh = false
    }

  }
}
