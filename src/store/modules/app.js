import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  showRightSidebar: 'hideright',
  device: 'desktop',
  isOpenSideBar: false,
  baseUrlApi: 'http://localhost:3000'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TOGGLE_SIDEBAR_TIGHT: (state, showRightSidebar) => {
    state.showRightSidebar = showRightSidebar
  },
  TOGGLE_ISOPEN_SIDEBAR: (state, isOpenSideBar) => {
    state.isOpenSideBar = isOpenSideBar
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  toggleSideBarRight({ commit }, showRightSidebar) {
    commit('TOGGLE_SIDEBAR_TIGHT', showRightSidebar)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleIsOpenSideBar({ commit }, isOpenSideBar) {
    commit('TOGGLE_ISOPEN_SIDEBAR', isOpenSideBar)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
