import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router';
import bgImage from '../../assets/images/banner/productInfo-banner.svg';
import Banner from '../../components/Banner';
import Select from '../../components/front/singleProduct/Select';
import FavoriteSection from '../../components/front/singleProduct/FavoriteSection';
import Loading from '../../components/Loading';
import useMessage from '../../hooks/useMessage';
import { currency } from '../../utils/filter';
import { useDispatch } from 'react-redux';
import { createAsyncGetCart } from '../../slice/cartSlice';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
	const { id } = useParams();
	const [product, setProduct] = useState({
		imagesUrl: [], // 先給空陣列，防止 [0] 報錯
		sizes: [],
		colors: [],
	});
	const [isLoading, setIsLoading] = useState(true);

	const [selectedColor, setSelectedColor] = useState(''); // 渲染「目前選了哪個顏色」
	const [selectedSize, setSelectedSize] = useState(''); // 渲染「目前選了哪個尺寸」

	const [selectedQty, setSelectedQty] = useState(1);
	const qtyOptions = [
		{ value: 1, label: '1' },
		{ value: 2, label: '2' },
		{ value: 3, label: '3' },
		{ value: 4, label: '4' },
		{ value: 5, label: '5' },
	];

	const navigate = useNavigate();
	const { showSuccess, showError } = useMessage();
	const dispatch = useDispatch();

	const addCart = async (id, selectedQty) => {
		const data = {
			product_id: id,
			qty: selectedQty,
		};
		try {
			const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
				data,
			});
			showSuccess(response.data.message);
			dispatch(createAsyncGetCart());
		} catch (error) {
			showError(error.response.data.message);
		}
	};

	const handleBuy = () => {
		addCart(product.id, selectedQty);
		navigate('/checkout');
	};

	useEffect(() => {
		const handleView = async (id) => {
			setIsLoading(true);
			try {
				const response = await axios.get(
					`${API_BASE}/api/${API_PATH}/product/${id}`,
				);
				const data = response.data.product;
				setProduct(data);

				// 設定預設選中第一個顏色
				if (data.colors && data.colors.length > 0) {
					setSelectedSize(data.colors[0]);
				}
				// 設定預設選中第一個尺寸
				if (data.sizes && data.sizes.length > 0) {
					setSelectedSize(data.sizes[0]);
				}
			} catch (error) {
				showError(error.response.data.message);
			} finally {
				setIsLoading(false);
			}
		};
		handleView(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<>
			<Banner bgImg={bgImage} text={product.category} />
			<section className="py-md-11 py-7">
				{isLoading ? (
					<Loading show={isLoading} text={'正在載入中...'} />
				) : (
					<div className="container">
						{/* Breadcrumb */}
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb breadcrumb-neutral-300 mb-md-7 mb-6">
								<li className="breadcrumb-item">
									<Link to="/">首頁</Link>
								</li>
								<li className="breadcrumb-item">
									{/* 導向該產品所屬的 Series 列表 */}
									<Link to={`/products?series=${product.series}`}>
										{product.series}
									</Link>
								</li>
								<li className="breadcrumb-item">
									{/* 導向該產品所屬的 Category 列表 */}
									<Link
										to={`/products?series=${product.series}&category=${product.category}`}
									>
										{product.category}
									</Link>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									{product.title}
								</li>
							</ol>
						</nav>
						<div className="row">
							<div className="col-md-7 py-md-0 py-7">
								<div className="row gy-4">
									<div className="col-12">
										<img
											src={product.imageUrl}
											className="w-100 img-fluid object-fit-cover"
											alt={product.title}
										/>
									</div>
									<div className="col-6">
										<img
											src={product.imagesUrl?.[0]}
											className="img-fluid object-fit-cover"
											alt={product.title}
										/>
									</div>
									<div className="col-6">
										<img
											src={product.imagesUrl?.[1]}
											className="img-fluid object-fit-cover"
											alt={product.title}
										/>
									</div>
									<div className="col-6">
										{product.imagesUrl?.[2] ? (
											<img
												src={product.imagesUrl?.[2]}
												className="img-fluid object-fit-cover"
												alt={product.title}
											/>
										) : (
											''
										)}
									</div>
									<div className="col-6">
										{product.imagesUrl?.[3] ? (
											<img
												src={product.imagesUrl?.[3]}
												className="img-fluid object-fit-cover"
												alt={product.title}
											/>
										) : (
											''
										)}
									</div>
								</div>
							</div>
							<div className="col-md-5">
								{/* Tag、產品名 */}
								<div className="d-flex flex-column gap-md-6 gap-3 mb-md-7 mb-5">
									<div className="d-flex justify-content-between">
										<div className="d-flex gap-md-6 gap-4">
											<span className="customer-tag">VIP會員獨享</span>
											<span className="customer-tag">周年慶，滿千送百</span>
										</div>
										<button
											type="button"
											className="btn customerBtn-transparent"
										>
											<span className="material-symbols-outlined">
												favorite
											</span>
										</button>
									</div>
									<h2 className="text-secondary-100 d-none d-md-block">
										{product.title}
									</h2>
									<h3 className="text-secondary-100 d-block d-md-none">
										{product.title}
									</h3>
									<p className="fw-light text-secondary-300">
										{product.description}
									</p>
								</div>
								{/* 價錢 */}
								<div className="d-flex align-items-baseline gap-4 mb-md-11 mb-7">
									<h5 className="text-secondary-300">NT$</h5>
									<h3 className="text-secondary-100">
										{currency(product.price)}
									</h3>
								</div>
								{/* 顏色、尺寸、數量 */}
								<div className="d-flex flex-column gap-6 mb-md-9 mb-6">
									{/* Select 元件 */}
									<Select
										title={'顏色'}
										id={'color-select'}
										options={product.colors.map((color) => ({
											value: color,
											label: color,
										}))}
										value={selectedColor}
										onChange={(e) => setSelectedColor(e)}
									/>
									<Select
										title={'尺寸'}
										id={'size-select'}
										options={product.sizes.map((size) => ({
											value: size,
											label: size,
										}))}
										value={selectedSize}
										onChange={(e) => setSelectedSize(e)}
									/>
									<Select
										title={'數量'}
										id={'qty-select'}
										options={qtyOptions}
										value={selectedQty}
										onChange={(e) => setSelectedQty(e)}
									/>
								</div>
								{/* 加入購物車、直接購買 btn */}
								<div className="d-block d-md-none d-lg-block">
									<div className="d-flex gap-6 mb-md-11 mb-7">
										<button
											type="button"
											className="btn customerBtn-secondary-500 w-100"
											onClick={() => addCart(product.id, selectedQty)}
										>
											加入購物車
										</button>
										<button
											type="button"
											className="btn customerNoIconBtn-primary-500 w-100"
											onClick={() => handleBuy()}
										>
											直接購買
										</button>
									</div>
								</div>
								<div className="d-none d-md-block d-lg-none">
									<div className="d-grid gap-6 mb-md-11">
										<button
											type="button"
											className="btn customerBtn-secondary-500 w-100"
											onClick={() => addCart(product.id, selectedQty)}
										>
											加入購物車
										</button>
										<button
											type="button"
											className="btn customerNoIconBtn-primary-500 w-100"
											onClick={() => handleBuy()}
										>
											直接購買
										</button>
									</div>
								</div>
								{/* 產品說明、注意事項、產品規格 */}
								<div className="d-flex flex-column gap-4">
									<div
										className="accordion accordion-flush accordion_secondary-100"
										id="productContent"
									>
										<div className="accordion-item">
											<button
												className="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseOne"
												aria-expanded="true"
												aria-controls="collapseOne"
											>
												<div className="d-flex flex-column align-items-start">
													<span className="fs-6 fw-light text-secondary-300 small">
														Product Description
													</span>
													<span className="fs-4 fw-bold text-secondary-100">
														產品說明
													</span>
												</div>
											</button>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												data-bs-parent="#productContent"
											>
												<div className="accordion-body">{product.content}</div>
											</div>
										</div>
										<div className="accordion-item">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseTwo"
												aria-expanded="false"
												aria-controls="collapseTwo"
											>
												<div className="d-flex flex-column align-items-start">
													<span className="fs-6 fw-light text-secondary-300 small">
														Important Notes
													</span>
													<span className="fs-4 fw-bold text-secondary-100">
														注意事項
													</span>
												</div>
											</button>
											<div
												id="collapseTwo"
												className="accordion-collapse collapse"
												data-bs-parent="#productContent"
											>
												<div className="accordion-body">{product.notices}</div>
											</div>
										</div>
										<div className="accordion-item">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseThree"
												aria-expanded="false"
												aria-controls="collapseThree"
											>
												<div className="d-flex flex-column align-items-start">
													<span className="fs-6 fw-light text-secondary-300 small">
														Specifications
													</span>
													<span className="fs-4 fw-bold text-secondary-100">
														產品規格
													</span>
												</div>
											</button>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												data-bs-parent="#productContent"
											>
												<div className="accordion-body container">
													<div className="row mb-1">
														<div className="col-4">
															<p className="fw-bold">材質</p>
														</div>
														<div className="col-8">
															<p>{product.material}</p>
														</div>
													</div>
													<div className="row mb-1">
														<div className="col-4">
															<p className="fw-bold">耐熱</p>
														</div>
														<div className="col-8">
															<p>{product?.heat_resistance}</p>
														</div>
													</div>
													<div className="row mb-1">
														<div className="col-4">
															<p className="fw-bold">產地</p>
														</div>
														<div className="col-8">
															<p>{product.origin}</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</section>
			{/* 可能也喜歡區域 */}
			<FavoriteSection />
		</>
	);
}

export default SingleProduct;
