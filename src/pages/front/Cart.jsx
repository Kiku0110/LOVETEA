import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useMessage from '../../hooks/useMessage';
import { currency } from '../../utils/filter';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncGetCart } from '../../slice/cartSlice';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Cart() {
	const cart = useSelector((state) => state.cart); //從 cartSlice 取得資料
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { showError } = useMessage();

	useEffect(() => {
		dispatch(createAsyncGetCart());
	}, [dispatch]);

	//判斷購物車是否為空
	const isCartEmpty = !cart.carts || cart.carts.length === 0;

	const updateCart = async (cardId, productId, qty = 1) => {
		try {
			const data = {
				product_id: productId,
				qty,
			};
			await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cardId}`, { data });
			dispatch(createAsyncGetCart());
		} catch (error) {
			showError(error.response.data.message);
		}
	};

	const deleteCart = async (cardId) => {
		//彈跳視窗確認
		const result = await Swal.fire({
			title: '確定要刪除嗎？',
			text: '刪除後將無法恢復此商品！',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: '確定！',
			cancelButtonText: '取消',
		});
		if (result.isConfirmed) {
			try {
				const response = await axios.delete(
					`${API_BASE}/api/${API_PATH}/cart/${cardId}`,
				);
				Swal.fire({
					text: `${response.data.message}`,
					icon: 'success',
				});
				dispatch(createAsyncGetCart());
			} catch (error) {
				Swal.fire({
					text: `${error.response.data.message}`,
					icon: 'error',
				});
			}
		}
	};

	const deleteAllCart = async () => {
		const result = await Swal.fire({
			title: '確定要清空購物車嗎？',
			text: '這將會移除購物車內的所有商品！',
			icon: 'danger',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			confirmButtonText: '全部清空',
			cancelButtonText: '考慮一下',
		});
		if (result.isConfirmed) {
			try {
				await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
				Swal.fire({
					text: '已清除購物車內容',
					icon: 'success',
				});
				dispatch(createAsyncGetCart());
			} catch (error) {
				Swal.fire({
					text: `${error.response.data.message}`,
					icon: 'error',
				});
			}
		}
	};

	return (
		<>
			<div className="container py-md-7 py-6">
				<h2 className="text-secondary-500 text-center mt-3">購物車列表</h2>
				<div className="text-end mt-4">
					{/* 修改點：當購物車為空時，禁用按鈕並改變顏色 (Bootstrap btn-secondary) */}
					<button
						type="button"
						className={`btn ${isCartEmpty ? 'btn-secondary' : 'btn-danger'} mb-3`}
						onClick={() => deleteAllCart()}
						disabled={isCartEmpty}
					>
						清空購物車
					</button>
				</div>
				<table className="table">
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col">圖片</th>
							<th scope="col">品名</th>
							<th scope="col">數量/單位</th>
							<th scope="col">小計</th>
						</tr>
					</thead>
					<tbody>
						{/* 修改點：條件渲染 */}
						{isCartEmpty ? (
							<tr>
								<td colSpan="5" className="text-center py-4 text-muted">
									購物車內目前沒有商品喔！
								</td>
							</tr>
						) : (
							cart?.carts?.map((cartItem) => (
								<tr key={cartItem.id}>
									<td>
										<button
											type="button"
											className="btn btn-outline-danger btn-sm"
											onClick={() => deleteCart(cartItem.id)}
										>
											刪除
										</button>
									</td>
									<td style={{ width: '200px' }}>
										<div
											style={{
												height: '100px',
												backgroundSize: 'cover',
												backgroundPosition: 'center',
												backgroundImage: `url(${cartItem.product.imageUrl})`,
											}}
										></div>
									</td>
									<th scope="row">{cartItem.product.title}</th>
									<td>
										<div className="input-group input-group-sm mb-3">
											<input
												type="number"
												className="form-control"
												min="1"
												aria-label="Sizing example input"
												aria-describedby="inputGroup-sizing-sm"
												defaultValue={cartItem.qty}
												onChange={(e) =>
													updateCart(
														cartItem.id,
														cartItem.product_id,
														Number(e.target.value),
													)
												}
											/>
											<span
												className="input-group-text"
												id="inputGroup-sizing-sm"
											>
												{cartItem.product.unit}
											</span>
										</div>
									</td>
									<td className="text-end">{currency(cartItem.final_total)}</td>
								</tr>
							))
						)}
					</tbody>
					<tfoot>
						<tr>
							<td className="text-end" colSpan="4">
								總計
							</td>
							<td className="text-end">{currency(cart.final_total)}</td>
						</tr>
					</tfoot>
				</table>
				<div className="text-end mt-4">
					<button
						type="button"
						className={`btn ${isCartEmpty ? 'btn-secondary' : 'customerNoIconBtn-primary-500'}`}
						onClick={() => navigate('/checkout')}
						disabled={isCartEmpty}
					>
						確認結帳
					</button>
				</div>
			</div>
		</>
	);
}

export default Cart;
