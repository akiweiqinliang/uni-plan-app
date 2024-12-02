export default {
	namespaced: true,
	state: {
		// planList: [],
		onGoingPlanId: '',
		planList: [
			{
			id: 0,
			title: '北京行程',
			startDate: '2024-11-1',
			endDate: '2024-11-5',
			totalPrice: 718,
			status: 'undo', // draft / undo / done
			trafficList: [
				{
					id: 0,
					title: '高铁',
					planB: false,
					outset: '南京南', // 始发站
					destination: '北京西', // 终点站
					order: 'gz12026', // 班次
					startDateTime: new Date('2024-11-1 10:30').getTime(),
					endDateTime: new Date('2024-11-1 11:30').getTime(),
					price: 500,
					other: '下午4点前必须出门'
				},
				{
					id: 0,
					title: '飞机',
					planB: true,
					outset: '南京禄口机场', // 始发站
					destination: '北京大兴', // 终点站
					order: 'fl12026', // 班次
					startDateTime: new Date('2024-11-1 12:30').getTime(),
					endDateTime: new Date('2024-11-1 14:30').getTime(),
					price: 500,
					other: ''
				}
			],
			hotelList: [
				{
					id: 0,
					title: '全季酒店',
					planB: false,
					startDateTime: new Date('2024-11-1 16:30').getTime(),
					endDateTime: new Date('2024-11-1 18:30').getTime(),
					address: '西大街1093-199号', // 具体地址
					price: null,
					other: ''
				}
			],
			activityList: [
				{
					id: 0,
					title: '祈福台吃烤鸭',
					startDateTime: new Date('2024-11-2 10:30').getTime(),
					endDateTime: new Date('2024-11-2 11:30').getTime(),
					address: '东大街1093-199号', // 具体地址
					eventType: 'eat',
					price: null, 
					other: ''
				},
				{
					id: 1,
					title: '天坛',
					startDateTime: new Date('2024-11-2 19:30').getTime(),
					endDateTime: '',
					address: '东大街1093-199号', // 具体地址
					eventType: 'wish',
					price: null, 
					other: ''
				}
			],
		},
		{
			id: 1,
			title: '南京穷游',
			startDate: '2024-1-1',
			endDate: '2024-1-5',
			totalPrice: 718,
			status: 'done', // draft / undo / done / delete
			trafficList: [],
			hotelList: [],
			activityList: [],
		},
		{
			id: 2,
			title: '广州逛吃计划',
			startDate: '2024-8-8',
			endDate: '2024-8-14',
			totalPrice: 718,
			status: 'undo', // draft / undo / done / delete
			trafficList: [
				{
					id: 0,
					title: '高铁day1',
					planB: false,
					outset: '南京南', // 始发站
					destination: '北京西', // 终点站
					order: 'gz12026', // 班次
					startDateTime: new Date('2024-8-8 10:30').getTime(),
					endDateTime: new Date('2024-8-8 14:30').getTime(),
					price: 500,
					other: '下午4点前必须出门'
				},
				{
					id: 0,
					title: '飞机day2',
					planB: true,
					outset: '南京禄口机场', // 始发站
					destination: '北京大兴', // 终点站
					order: 'fl12026', // 班次
					startDateTime: new Date('2024-8-9 12:30').getTime(),
					endDateTime: new Date('2024-8-9 14:30').getTime(),
					price: 500,
					other: ''
				}
			],
			hotelList: [],
			activityList: [
				{
					id: 0,
					title: '祈福台吃烤鸭day1',
					startDateTime: new Date('2024-8-8 17:30').getTime(),
					endDateTime: new Date('2024-8-8 19:30').getTime(),
					address: '东大街1093-199号', // 具体地址
					eventType: 'eat',
					price: null, 
					other: ''
				},
				{
					id: 1,
					title: '拍照day2',
					startDateTime: new Date('2024-8-9 13:30').getTime(),
					endDateTime: new Date('2024-8-9 18:30').getTime(),
					address: '东大街1093-199号', // 具体地址
					eventType: 'wish',
					price: null, 
					other: ''
				},
			],
		},
		{
			id: 3,
			title: '西安三天两夜',
			startDate: '2024-8-8',
			endDate: '2024-8-14',
			totalPrice: 718,
			status: 'draft', // draft / undo / done / delete
			trafficList: [],
			hotelList: [],
			activityList: [],
		},
		{
			id: 4,
			title: '广州逛吃计划',
			startDate: '2024-8-8',
			endDate: '2024-8-14',
			totalPrice: 718,
			status: 'draft', 
			trafficList: [],
			hotelList: [],
			activityList: [],
		},
		]
	},
	getters: {
		getPlans({
			state
		}) {
			return state.planList
		},
		undoPlanList: (state) => {
			return state.planList.filter(plan => plan.status === 'undo')
		},
		donePlanList: (state) => {
			return state.planList.filter(plan => plan.status === 'done')
		},
		onGoingPlan: (state) => {
			return state.planList.find(plan => plan.id === state.onGoingPlanId)
		}
	},
	mutations: {
		addPlan(state,plan) {
			state.planList.push(plan)
		},
		setOngoPlanId(state, planId) {
			state.onGoingPlanId = planId
		},
		setPlanStatus(state, {planId, newStatus}) {
			const plan = state.planList.find(item => item.id === planId)
			if(plan) {
				plan.status = newStatus
			}	
		},
		
	},
	actions: {
		setOngoPlanId({commit}, payload) {
			commit('setOngoPlanId', payload.planId)
		},
		setPlanStatus({commit}, payload) {
			commit('setPlanStatus', payload)
		},
		addPlan({commit}, payload) {
			// 根据事项类型在对应的事件列表中添加事项
			commit('addPlan', payload)
		},
		async fetchPlans({
			commit
		}) {
			try {
				// const response = await fetchPlansFromAPI(); // 从API获取数据的异步函数
				// const plan = response.data; // 假设API返回数据为plan对象
				commit('addPlan', plan);
			} catch (error) {
				console.error('Error fetching plans: ', error);
			}
		}
	}
}