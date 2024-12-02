import {
		guid
	} from '@/uni_modules/uv-ui-tools/libs/function/index.js'
class Base {
	constructor({
		id = guid(),
		title = '',
		startDateTime = '',
		endDateTime = '',
		price = null,
		other = ''
	} = {}) {
		Object.assign(this, {id, title, startDateTime, endDateTime, price, other});
	}
}

export class Traffic extends Base {
	constructor(
		outset = '', // 始发站
		destination = '', // 终点站
		order = '', // 班次
		planB = false, // 备选方案
		...baseOptions
	) {
		// 调用 Base 类的构造函数
		super(...baseOptions);
		Object.assign(this, { outset, destination, order, planB });
	}
}

export class Hotel extends Base {
	constructor(
	address = '', // 具体地址
	planB = false, // 备选方案
	...baseOptions
	) {
		// 调用 Base 类的构造函数
		super(...baseOptions);
		Object.assign(this, { address, planB });
	}
}

export class Activity extends Base {
	constructor(
		eventType = '', // 活动类型 place / eat / wish
		address = '', // 具体地址
		...baseOptions
	) {
		// 调用 Base 类的构造函数
		super(...baseOptions);
		Object.assign(this, { eventType, address });
	}
}