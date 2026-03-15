function RoundedSection({ prevColor, bgColor, children }) {
	const roundedStyle = {
		width: '100%',
		borderTopLeftRadius: '150px',
	};
	return (
		<>
			<section className={`${prevColor}`}>
				<section
					className={`pt-md-14 pb-md-11 pt-11 pb-9 ${bgColor}`}
					style={roundedStyle}
				>
					{children}
				</section>
			</section>
		</>
	);
}

export default RoundedSection;
