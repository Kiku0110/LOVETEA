function Banner({ bgImg, text }) {
	const bannerStyle = {
		position: 'relative',
		width: '100%',
		height: '100%',
		backgroundImage: `linear-gradient(rgba(0,0,0,0.55)),url(${bgImg})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const maskStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		// 五段式漸層
		background: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 20%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 1) 100%
        )`,
		zIndex: 1,
	};

	const textStyle = {
		position: 'relative',
		zIndex: 2,
	};
	return (
		<>
			<section className="py-md-15 py-9" style={bannerStyle}>
				<div style={maskStyle}></div>
				<div className="container d-none d-md-block" style={textStyle}>
					<div className=" d-flex flex-column gap-3 align-items-center">
						<h2 className="text-white">{text}</h2>
						<div
							className="border border-white border-2"
							style={{ width: '135px' }}
						/>
					</div>
				</div>
				<div className="container d-block d-md-none" style={textStyle}>
					<div className=" d-flex flex-column gap-3 align-items-center">
						<h3 className="text-secondary-300">{text}</h3>
						<div
							className="border border-secondary-300 border-2"
							style={{ width: '84px' }}
						/>
					</div>
				</div>
			</section>
		</>
	);
}

export default Banner;
