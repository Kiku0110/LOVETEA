import Teapot1920 from '../../../assets/images/hero/hero-teapot-1920.svg';
import Tae1920 from '../../../assets/images/hero/hero-tea-1920.svg';
import TeaLaef1920 from '../../../assets/images/hero/hero-tealeaf-1920.svg';
import TeaMountain1920 from '../../../assets/images/hero/hero-teamountain-1920.svg';
import { useNavigate } from 'react-router';

function HeroCarousel() {
	const navigate = useNavigate();

	return (
		<>
			<section className="hero-carousel">
				<div
					id="carouselExampleCaptions"
					className="carousel slide position-relative"
					data-bs-ride="carousel"
					data-bs-interval="5000"
					data-bs-pause="false"
				>
					{/* 漸層遮罩 */}
					<div className="gradientMask"></div>
					<div className="carousel-indicators-container d-flex justify-content-center align-items-center gap-4">
						<button
							className="carousel-control-prev custom-control-prev custom-arrow"
							type="button"
							data-bs-target="#carouselExampleCaptions"
							data-bs-slide="prev"
						>
							<span
								className="carousel-control-prev-icon"
								aria-hidden="true"
							></span>
							<span className="visually-hidden">Previous</span>
						</button>
						<div className="carousel-indicators position-static m-0">
							<button
								type="button"
								data-bs-target="#carouselExampleCaptions"
								data-bs-slide-to="0"
								className="active"
								aria-current="true"
								aria-label="Slide 1"
							></button>
							<button
								type="button"
								data-bs-target="#carouselExampleCaptions"
								data-bs-slide-to="1"
								aria-label="Slide 2"
							></button>
							<button
								type="button"
								data-bs-target="#carouselExampleCaptions"
								data-bs-slide-to="2"
								aria-label="Slide 3"
							></button>
							<button
								type="button"
								data-bs-target="#carouselExampleCaptions"
								data-bs-slide-to="3"
								aria-label="Slide 4"
							></button>
						</div>
						<button
							className="carousel-control-next custom-control-next custom-arrow"
							type="button"
							data-bs-target="#carouselExampleCaptions"
							data-bs-slide="next"
						>
							<span
								className="carousel-control-next-icon"
								aria-hidden="true"
							></span>
							<span className="visually-hidden">Next</span>
						</button>
					</div>
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img src={Teapot1920} className="d-block w-100" alt="輪播圖" />
						</div>
						<div className="carousel-item">
							<img src={Tae1920} className="d-block w-100" alt="輪播圖" />
						</div>
						<div className="carousel-item">
							<img src={TeaLaef1920} className="d-block w-100" alt="輪播圖" />
						</div>
						<div className="carousel-item">
							<img
								src={TeaMountain1920}
								className="d-block w-100"
								alt="輪播圖"
							/>
						</div>
					</div>
					{/* Desktop */}
					<div className="custom-carousel-caption position-absolute top-20 start-10 py-0 d-none d-md-block">
						<div className="container">
							<div className="d-flex gap-6">
								<div
									className="border-start border-secondary-500 d-flex text-start"
									style={{ width: '86px', height: '256px' }}
								>
									<p className="fw-light text-secondary-500 writing-vertical mx-3">
										心の静寂
									</p>
									<p className="fw-light text-secondary-500 writing-vertical mx-0">
										自然の恵み
									</p>
								</div>
								<div className="d-flex flex-column text-start">
									<p className="fw-light text-secondary-500 mb-5">
										MODERN TEA CULTURE
									</p>
									<h1 className="text-secondary-100 mb-2">靜心品茗</h1>
									<h2 className="text-secondary-100 mb-5">回歸生活的純粹</h2>
									<p className="fs-5 text-secondary-300 mb-9">
										在繁忙的日常中，為自己留一杯茶的時間。
										<br />
										感受茶香流動，找回內心的平靜與溫暖。
									</p>
									<div className="d-flex gap-8">
										<button
											type="button"
											className="btn customerBtn-secondary-500"
											onClick={() => navigate('/brand')}
										>
											關於品牌
										</button>
										<button
											type="button"
											className="btn customerBtn-primary-500"
											onClick={() => navigate('/products')}
										>
											立即選購
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Mobile */}
					<div className=" custom-carousel-caption position-absolute top-20 start-0  py-0 d-block d-md-none">
						<div className="container">
							<div className="text-start">
								<p className="fw-light text-secondary-500 mb-6">
									MODERN TEA CULTURE
								</p>
								<h2 className="text-secondary-100 mb-1">靜心品茗</h2>
								<h3 className="text-secondary-100 mb-6">回歸生活的純粹</h3>
								<p className="text-secondary-300 mb-6">
									在繁忙的日常中，為自己留一杯茶的時間。
									<br />
									感受茶香流動，找回內心的平靜與溫暖。
								</p>
								<div className="d-flex gap-4">
									<button
										type="button"
										className="btn customerBtn-secondary-500"
										onClick={() => navigate('/brand')}
									>
										關於品牌
									</button>
									<button
										type="button"
										className="btn customerBtn-primary-500"
										onClick={() => navigate('/products')}
									>
										立即選購
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default HeroCarousel;
