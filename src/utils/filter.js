// 千分位
export const currency = (num) => {
	const n = Number(num) || 0;
	return n.toLocaleString();
};

// 時間轉換
export const orderDate = (date) => {
	return new Date(date * 1000).toISOString().slice(0, 10).replaceAll('-', '/');
};
