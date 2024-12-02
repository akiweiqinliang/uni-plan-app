export default {
	namespaced: true,
	state: {
		userInfo: {},
		loginFlag: false
	},
	getters: {
		userInfo(state) {
			return state.userInfo
		},
		loginFlag(
			state
		) {
			return state.loginFlag
		}
	},
	mutations: {
		setUserInfo(state, info) {
			state.userInfo = info
		},
		setLoginFlag(
			state, status
		) {
			state.loginFlag = status
		}
	},
	actions: {
		setLogin({commit}, payload) {
			commit('setLoginFlag', true)
			commit('setUserInfo', payload.info)
		},
	}
}