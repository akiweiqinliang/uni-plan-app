export function formatDate(timestamp) {
	if (!timestamp || isNaN(timestamp)) return '...'; // 检查是否有效
	const date = new Date(Number(timestamp)); // 确保转换为数字
	if (isNaN(date.getTime())) return '...'; // 检查日期是否有效
	
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // 月份从 0 开始
	const day = date.getDate(); // 
	const hours = ('0' + date.getHours()).slice(-2); // 补零
	const minutes = ('0' + date.getMinutes()).slice(-2); // 补零

	return `${year}年${month}月${day}日 ${hours}:${minutes}`;
}

export function formatDateNoSecond(timestamp) {
	if (!timestamp || isNaN(timestamp)) return '...'; // 检查是否有效
	const date = new Date(Number(timestamp)); // 确保转换为数字
	if (isNaN(date.getTime())) return '...'; // 检查日期是否有效

	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${month}月${day}日`;
}
export function formatDateOnlySecond(timestamp) {
	if (!timestamp || isNaN(timestamp)) return '...'; // 检查是否有效
	const date = new Date(Number(timestamp)); // 确保转换为数字
	if (isNaN(date.getTime())) return '...'; // 检查日期是否有效
	
	const hours = ('0' + date.getHours()).slice(-2); // 补零
	const minutes = ('0' + date.getMinutes()).slice(-2); // 补零
	return `${hours}:${minutes}`;
}

// 定义星期数组
const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

export function formatToWeekday(timestamp) {
	if (!timestamp) return '...'
	const date = new Date(timestamp);
	const day = date.getDay(); // 获取星期几（0 - 6）
	return weekDays[day];
}