import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { currency } from '../../../utils/filter';
import useMessage from '../../../hooks/useMessage';
import { useDispatch } from 'react-redux';
import { createAsyncGetCart } from '../../../slice/cartSlice';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductsSection() {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();
	const { showSuccess, showError } = useMessage();
	const dispatch = useDispatch();

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
				// 只取前四筆產品資料
				const limitedProducts = response.data.products.slice(0, 4);
				setProducts(limitedProducts);
			} catch (error) {
				showError(error.response.message);
			}
		};
		getProducts();
	}, [showError]);

	const handleView = async (id) => {
		navigate(`/product/${id}`);
	};

	return (
		<>
			<section className="bg-primary-500 py-md-11 py-7">
				<div className="container d-flex flex-column align-items-center gap-md-12 gap-6">
					<div className="d-flex flex-column gap-5  align-items-center">
						<h2 className="text-secondary-100 d-none d-md-block">嚴選商品</h2>
						<h3 className="text-secondary-100 d-block d-md-none">嚴選商品</h3>
						<div
							className="border border-secondary-500 border-4"
							style={{ width: '96px' }}
						/>
					</div>
					<div className="row row-gap-6">
						{products.map((product) => (
							<div className="col-md-3" key={product.id}>
								{/* Desktop */}
								<div
									className="card customer-card-maskLarge d-none d-md-block"
									onClick={() => handleView(product.id)}
								>
									<img
										src={product.imageUrl}
										className="card-img-top"
										alt={product.title}
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
										<h6 className="card-text">NT$ {currency(product.price)}</h6>
									</div>
								</div>
								{/* Mobile */}
								<div
									className="card customer-card-nomask d-block d-md-none position-relative"
									key={product.id}
									onClick={() => handleView(product.id)}
								>
									<img
										src={product.imageUrl}
										className="card-img-top"
										alt={product.title}
									/>
									<button
										type="button"
										className="btn btn-outline-neutral-500 position-absolute top-0 end-5"
									>
										<span className="material-symbols-outlined">favorite</span>
									</button>
									<div className="card-body">
										<h5 className="card-title mb-0">{product.title}</h5>
										<div className="d-flex justify-content-between align-items-center">
											<h6 className="card-text">
												NT$ {currency(product.price)}
											</h6>
											<button
												type="button"
												className="btn btn-outline-secondary-500"
												onClick={(e) => addCart(e, product.id)}
											>
												<span className="material-symbols-outlined">
													add_shopping_cart
												</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<button
						type="button"
						className="btn customerNoIconBtn-primary-500"
						onClick={() => navigate('/products')}
					>
						更多商品
					</button>
				</div>
			</section>
		</>
	);
}

export default ProductsSection;
