export const state = () => ({
  toggle: false
})

export const mutations = {
  TOGGLE(state) {
    state.toggle = !state.toggle
  },

  CLOSE(state) {
    state.toggle = false
  }
}

export const actions = {
  toggle({ commit }) {
    commit('TOGGLE')
  },

  close({ commit }) {
    commit('CLOSE')
  }
}

export const getters = {
  toggle: state => state.toggle,
}
