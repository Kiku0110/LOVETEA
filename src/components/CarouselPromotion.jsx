function CarouselPromotion() {
	const promotionsData = [
		{
			id: 1,
			content: '週年慶典｜以好器收納歲月',
		},
		{
			id: 2,
			content: '拾光茶會｜週年限定美學',
		},
		{
			id: 3,
			content: '一器一會｜點綴茶席之美',
		},
	];

	return (
		<>
			<section className="py-2 border-bottom border-secondary-300">
				<div
					id="carouselPromotionInterval"
					className="carousel slide"
					data-bs-ride="carousel"
				>
					<div className="carousel-inner">
						{promotionsData.map((promotion) => (
							<div
								key={promotion.id}
								className={`carousel-item ${promotion.id === 1 ? 'active' : ''}`}
								data-bs-interval="5000"
							>
								<p className="text-center text-secondary-300">
									{promotion.content}
								</p>
							</div>
						))}
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselPromotionInterval"
						data-bs-slide="prev"
					>
						<span className="material-symbols-outlined">
							arrow_back_ios_new
						</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselPromotionInterval"
						data-bs-slide="next"
					>
						<span className="material-symbols-outlined">arrow_forward_ios</span>
					</button>
				</div>
			</section>
		</>
	);
}

export default CarouselPromotion;
