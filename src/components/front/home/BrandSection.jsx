import brandStoryImg from '../../../assets/images/home/Brand Story Tea Pouring 1.svg';
import brandStoryImg2 from '../../../assets/images/home/Brand Story Tea Pouring 2.svg';

const brandData = [
	{
		id: 1,
		image: brandStoryImg,
		subtitle: 'Brand Story',
		title: '四時茶香，回到生活的本味',
		content:
			'倒入熱茶，茶葉在盎然蒸氣中悄然伸展。\n山嵐的氣韻、花草的香息、陽光曬過的清甜，都在這一杯裡緩緩展開。\n茶，不只是味道，更是一種與季節共呼吸的方式。\nLOVETEA 精選來自山林與花田的天然茶款，\n讓每一次品飲，都是與自己對話的片刻寧靜。',
		btnName: '樂茶之美',
		isReverse: false, // 圖片左 (col-7)，文字右 (col-6)
	},
	{
		id: 2,
		image: brandStoryImg2,
		subtitle: 'Craftsmanship',
		title: '器物之美·日常的茶道風景',
		content:
			'指尖觸碰杯沿的溫熱，壺身在光影中呈現細緻的釉色紋理。\n茶具不僅是器物，更是把茶香、茶氣、茶意帶入生活的媒介。\n從陶瓷到玻璃，從蓋碗到茶杯，每一件器物都蘊含直人手作的溫度，\n讓泡茶成為一種儀式，一種生活節奏的轉換。\nLOVETEA 精選茶具系列，為你打造屬於自己的茶席風景。',
		btnName: '探索茶器',
		isReverse: true, // 圖片右 (col-7)，文字左 (col-6)
	},
];
function BrandSection() {
	return (
		<>
			<section className="py-md-11 py-7">
				<div className="py-md-11 py-0">
					{brandData.map((brand) => (
						<div
							key={brand.id}
							className={`container stack-container mb-md-13 mb-6 ${brand.isReverse ? 'stack-reverse' : ''}`}
						>
							<div className=" img-layer">
								<img
									src={brand.image}
									className="w-100 h-100 object-fit-cover"
									alt="背景圖"
								/>
							</div>
							<div className=" text-layer">
								<div className="w-100 bg-neutral-700 px-md-7 py-md-8 p-3">
									<div className="d-flex flex-column gap-md-7 gap-3">
										<div>
											<div className="d-flex align-items-center gap-3 mb-1">
												<div
													className="border-bottom border-secondary-500 border-1"
													style={{ width: '32px' }}
												/>
												<p className="fw-light text-secondary-500">
													{brand.subtitle}
												</p>
											</div>
											{/* Desktop */}
											<h2 className="text-secondary-100 d-none d-md-block">
												{brand.title}
											</h2>
											{/* Mobile */}
											<h4 className="text-secondary-100 d-block d-md-none">
												{brand.title}
											</h4>
										</div>
										<p className="text-secondary-300 story-content">
											{brand.content}
										</p>
										{/* Desktop */}
										<div className="d-none d-md-block">
											<button type="button" className="btn cardActionBtn">
												{brand.btnName}
											</button>
										</div>
										{/* Mobile */}
										<div className="text-end d-block d-md-none">
											<button type="button" className="btn cardActionBtn">
												{brand.btnName}
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-primary-700 square-layer"></div>
						</div>
					))}
				</div>
			</section>
		</>
	);
}

export default BrandSection;
