function Loading({ show, text }) {
	if (!show) return null;

	const overlayStyle = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		backgroundColor: 'rgba(255, 255, 255, 0.8)', // 半透明白
		backdropFilter: 'blur(4px)', // 現代感毛玻璃效果
		zIndex: 5, // 確保在所有 Bootstrap 元件之上
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<>
			<div style={overlayStyle}>
				{/* 使用 Bootstrap 內建的 Spinner 樣式 */}
				<div
					className="spinner-border text-primary-500"
					role="status"
					style={{ width: '3.5rem', height: '3.5rem' }}
				>
					<span className="visually-hidden">Loading...</span>
				</div>
				{text && (
					<div className="mt-3 fs-5 fw-bold text-primary-500">{text}</div>
				)}
			</div>
		</>
	);
}

export default Loading;
