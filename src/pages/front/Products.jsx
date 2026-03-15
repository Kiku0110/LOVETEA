import { useState } from 'react';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router';
import bgImage from '../../assets/images/banner/products-banner.svg';
import Banner from '../../components/Banner';

function Products() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	// 取得當前網址參數
	const series = searchParams.get('series');
	const category = searchParams.get('category');

	const [isTeaSetOpen, setIsTeaSetOpen] = useState(false); // 電腦版「茶具系列」開關
	const [isTeaSetMobileOpen, setIsTeaSetMobileOpen] = useState(false); // 手機版「茶具系列」開關
	const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false); // 手機版 Menu 開關

	const handleTeaSet = () => {
		setIsTeaSetOpen(!isTeaSetOpen);
		navigate('/products?series=茶具系列');
	};

	const handleTeaSetMobile = () => {
		setIsTeaSetMobileOpen(!isTeaSetMobileOpen);
		navigate('/products?series=茶具系列');
	};

	const toggleMenuMobile = () => {
		setIsMenuMobileOpen(!isMenuMobileOpen);
	};

	return (
		<>
			<Banner bgImg={bgImage} text={'商品分類'} />
			<section className="py-md-11 py-7">
				<div className="container">
					{/* Breadcrumb */}
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb breadcrumb-neutral-300 mb-md-7 mb-4">
							<li className="breadcrumb-item">
								<Link to="/">首頁</Link>
							</li>
							{/* 第一層：Series */}
							{series ? (
								<li className={`breadcrumb-item ${!category ? 'active' : ''}`}>
									{category ? (
										<Link to={`/products?series=${series}`}>{series}</Link>
									) : (
										series
									)}
								</li>
							) : (
								<li className="breadcrumb-item active">所有產品</li>
							)}
							{/* 第二層：Category */}
							{category && (
								<li className="breadcrumb-item active" aria-current="page">
									{category}
								</li>
							)}
						</ol>
					</nav>
					<div className="row">
						{/* Menu */}
						<div className="col-md-3 py-md-0 py-6">
							{/* Desktop */}
							<ul className="list-group customer-listGroup d-none d-md-block">
								<li className="list-group-item">
									<Link to={'/products'} className="btn filterBtnLarge">
										推薦商品
									</Link>
								</li>
								<li className="list-group-item">
									<Link
										to={'/products?series=茶葉系列'}
										className="btn filterBtnLarge"
									>
										茶葉系列
									</Link>
								</li>
								<li className="list-group-item">
									<button
										type="button"
										className="btn filterBtnLarge"
										onClick={() => handleTeaSet()}
									>
										茶具系列
									</button>
								</li>
								<div
									className={`collapse px-3 py-2 w-100 ${isTeaSetOpen ? 'show' : ''}`}
									id="teaSet"
								>
									<div className="d-grid gap-2">
										<Link
											to={'/products?series=茶具系列&category=陶瓷茶具'}
											className="btn filterBtnSmall"
										>
											陶瓷茶具
										</Link>
										<Link
											to={'/products?series=茶具系列&category=玻璃茶器'}
											className="btn filterBtnSmall"
										>
											玻璃茶器
										</Link>
										<Link
											to={'/products?series=茶具系列&category=茶道配件'}
											className="btn filterBtnSmall"
										>
											茶道配件
										</Link>
									</div>
								</div>
							</ul>
							{/* Mobile */}
							<div
								className="accordion accordion-flush accordion-primary-900 d-block d-md-none"
								id="accordionFlush"
							>
								<div className="accordion-item">
									<button
										className={`accordion-button ${isMenuMobileOpen ? '' : 'collapsed'}`}
										type="button"
										aria-expanded="false"
										aria-controls="flush-collapseOne"
										onClick={() => toggleMenuMobile()}
									>
										產品分類
									</button>
									<div
										id="flush-collapseOne"
										className={`accordion-collapse collapse ${isMenuMobileOpen ? 'show' : ''}`}
										data-bs-parent="#accordionFlush"
									>
										<ul className="list-group customer-listGroup px-3">
											<li className="list-group-item">
												<Link
													to={'/products'}
													className="btn filterBtnLarge w-100"
												>
													推薦商品
												</Link>
											</li>
											<li className="list-group-item">
												<Link
													to={'/products?series=茶葉系列'}
													className="btn filterBtnLarge w-100"
												>
													茶葉系列
												</Link>
											</li>
											<li className="list-group-item">
												<button
													type="button"
													className="btn filterBtnLarge w-100"
													onClick={() => handleTeaSetMobile()}
												>
													茶具系列
												</button>
											</li>
											<div
												className={`collapse px-3 py-2 w-100 ${isTeaSetMobileOpen ? 'show' : ''}`}
												id="teaSetMobile"
											>
												<div className="d-grid gap-2">
													<Link
														to={'/products?series=茶具系列&category=陶瓷茶具'}
														className="btn filterBtnSmall"
													>
														陶瓷茶具
													</Link>
													<Link
														to={'/products?series=茶具系列&category=玻璃茶器'}
														className="btn filterBtnSmall"
													>
														玻璃茶器
													</Link>
													<Link
														to={'/products?series=茶具系列&category=茶道配件'}
														className="btn filterBtnSmall"
													>
														茶道配件
													</Link>
												</div>
											</div>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-9">
							<Outlet />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Products;
