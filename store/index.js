// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'
import plan from '@/store/modules/plan.js';
import user from './modules/user';
Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	modules: {
		plan,user
	},
})
export default store
