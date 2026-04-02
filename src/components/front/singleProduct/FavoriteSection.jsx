import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import useMessage from '../../../hooks/useMessage';
import { useDispatch } from 'react-redux';
import { createAsyncGetCart } from '../../../slice/cartSlice';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function FavoriteSection() {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();
	const { showSuccess, showError } = useMessage();
	const dispatch = useDispatch();

	// 「你可能也喜歡」過濾掉當前產品 id，顯示其他產品
	const { id } = useParams();
	const favoriteProducts = products.filter((product) => product.id !== id);

	// 控制左右按鈕
	const scrollRef = useRef(null);
	const handleScroll = (direction) => {
		const container = scrollRef.current; // 取得捲動容器
		if (container) {
			const item = container.querySelector('.col-md-3'); // 取 col-md-3 計算移動寬度
			if (item) {
				const itemWidth = item.offsetWidth;
				// 判斷方向並位移一個卡片寬度
				container.scrollBy({
					left: direction === 'left' ? -itemWidth : itemWidth,
					behavior: 'smooth',
				});
			}
		}
	};

	const addCart = async (e, id, qty = 1) => {
		e.stopPropagation();
		const data = {
			product_id: id,
			qty,
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

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(
					`${API_BASE}/api/${API_PATH}/products`,
				);
				setProducts(response.data.products);
			} catch (error) {
				showError(error.response.data.message);
			}
		};
		getProducts();
	}, [showError]);

	const handleView = async (id) => {
		navigate(`/product/${id}`);
	};

	return (
		<>
			<section className="py-md-11 py-7">
				<div className="container">
					<div className="d-flex justify-content-between mb-md-7 mb-6">
						<h4 className="text-secondary-100">你可能也喜歡</h4>
						<div className="d-flex gap-6">
							<button
								type="button"
								className="btn customerBtn-circle-secondary-300"
								onClick={() => handleScroll('left')}
							>
								<span className="material-symbols-outlined">
									arrow_back_ios_new
								</span>
							</button>
							<button
								type="button"
								className="btn customerBtn-circle-secondary-300"
								onClick={() => handleScroll('right')}
							>
								<span className="material-symbols-outlined">
									arrow_forward_ios
								</span>
							</button>
						</div>
					</div>
					<div
						className="overflow-x-auto overflow-favoriteCard"
						ref={scrollRef}
					>
						<div className="row flex-nowrap">
							{favoriteProducts.map((product) => (
								<div className="col-md-3" key={product.id}>
									<div
										className="card customer-card-maskLarge"
										onClick={() => handleView(product.id)}
									>
										<img
											src={product.imageUrl}
											className="card-img-top"
											alt={product.title}
											decoding="async"
											loading="lazy"
										/>
										{/* 按鈕容器 */}
										<div className="card-actions-overlay position-absolute top-50 start-50 translate-middle">
											<div className="d-flex gap-5">
												<button
													type="button"
													className="btn btn-primary-700 border-0"
												>
													<span className="material-symbols-outlined">
														favorite
													</span>
												</button>
												<button
													type="button"
													className="btn btn-secondary-500 border-0"
													onClick={(e) => addCart(e, product.id)}
												>
													<span className="material-symbols-outlined">
														add_shopping_cart
													</span>
												</button>
											</div>
										</div>
										<div className="card-body">
											<h5 className="card-title">{product.title}</h5>
											<h6 className="card-text">NT$ {product.price}</h6>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default FavoriteSection;
