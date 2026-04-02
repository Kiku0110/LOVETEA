import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import useMessage from '../../hooks/useMessage';
import { currency } from '../../utils/filter';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncGetCart } from '../../slice/cartSlice';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Checkout() {
	const cart = useSelector((state) => state.cart); //從 cartSlice 取得資料
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		mode: 'onChange',
	});
	const { showError } = useMessage();
	const [loadingItemId, setLoadingItemId] = useState(null); // 記錄哪一個購物車品項正在更新

	useEffect(() => {
		dispatch(createAsyncGetCart());
	}, [dispatch]);

	//判斷購物車是否為空
	const isCartEmpty = !cart.carts || cart.carts.length === 0;

	const updateCart = async (cardId, productId, qty = 1) => {
		// 當輸入值小於 1 或正在讀取中就不執行
		if (qty < 1 || loadingItemId === cardId) return;

		setLoadingItemId(cardId);
		try {
			const data = {
				product_id: productId,
				qty,
			};
			await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cardId}`, { data });
			dispatch(createAsyncGetCart());
		} catch (error) {
			showError(error.response.data.message);
		} finally {
			setLoadingItemId(null);
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
			icon: 'warning',
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

	const onSubmit = async (formData) => {
		try {
			const data = {
				user: formData,
				message: formData.message,
			};
			const response = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
				data,
			});
			Swal.fire({
				text: `${response.data.message}`,
				icon: 'success',
			});
			dispatch(createAsyncGetCart());
			reset(); // 重置表單
		} catch (error) {
			Swal.fire({
				text: `${error.response.message}`,
				icon: 'error',
			});
		}
	};

	return (
		<>
			<div className="container py-md-7 py-6">
				<h2 className="text-secondary-500 text-center mt-3">結帳頁</h2>
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
												// 正在更新時禁用 input
												disabled={loadingItemId === cartItem.id}
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
												{/* 根據狀態切換顯示單位或 Loading 圖示 */}
												{loadingItemId === cartItem.id ? (
													<span
														className="spinner-border spinner-border-sm"
														role="status"
													></span>
												) : (
													cartItem.product.unit
												)}
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
				{/* 訂單頁面 */}
				<div className="my-5 row justify-content-center">
					<form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-3">
							<label htmlFor="email" className="form-label text-secondary-500">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								className="form-control"
								placeholder="請輸入 Email"
								{...register('email', {
									required: '請輸入 Email',
									pattern: {
										value: /^\S+@\S+$/i,
										message: 'Email 格式不正確',
									},
								})}
							/>
							{errors.email && (
								<p className="text-danger">{errors.email.message}</p>
							)}
						</div>

						<div className="mb-3">
							<label htmlFor="name" className="form-label text-secondary-500">
								收件人姓名
							</label>
							<input
								id="name"
								name="name"
								type="text"
								className="form-control"
								placeholder="請輸入姓名"
								{...register('name', {
									required: '請輸入姓名',
									minLength: {
										value: 2,
										message: '姓名最少 2 個字',
									},
								})}
							/>
							{errors.name && (
								<p className="text-danger">{errors.name.message}</p>
							)}
						</div>

						<div className="mb-3">
							<label htmlFor="tel" className="form-label text-secondary-500">
								收件人電話
							</label>
							<input
								id="tel"
								name="tel"
								type="tel"
								className="form-control"
								placeholder="請輸入電話"
								{...register('tel', {
									required: '請輸入收件人電話',
									minLength: {
										value: 8,
										message: '電話至少 8 碼',
									},
									pattern: {
										value: /^\d+$/,
										message: '電話僅能輸入數字',
									},
								})}
							/>
							{errors.tel && (
								<p className="text-danger">{errors.tel.message}</p>
							)}
						</div>

						<div className="mb-3">
							<label
								htmlFor="address"
								className="form-label text-secondary-500"
							>
								收件人地址
							</label>
							<input
								id="address"
								name="address"
								type="text"
								className="form-control"
								placeholder="請輸入地址"
								{...register('address', {
									required: '請輸入收件人地址',
								})}
							/>
							{errors.address && (
								<p className="text-danger">{errors.address.message}</p>
							)}
						</div>

						<div className="my-3">
							<label
								htmlFor="payment"
								className="form-label text-secondary-500 me-7"
							>
								付款方式
							</label>
							<div className="form-check form-check-inline">
								<input
									id="radioList1"
									type="radio"
									className={`form-check-input ${errors.payment && 'is-invalid'}`}
									{...register('payment', {
										required: '請選擇付款方式',
									})}
									name="payment"
									value="信用卡付款"
								/>
								<label
									className="form-check-label text-secondary-500"
									htmlFor="radioList1"
								>
									信用卡付款
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									id="radioList2"
									type="radio"
									className={`form-check-input ${errors.payment && 'is-invalid'}`}
									{...register('payment', {
										required: '請選擇付款方式',
									})}
									name="payment"
									value="ATM 轉帳"
								/>
								<label
									className="form-check-label text-secondary-500"
									htmlFor="radioList2"
								>
									ATM 轉帳
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									id="radioList3"
									type="radio"
									className={`form-check-input ${errors.payment && 'is-invalid'}`}
									{...register('payment', {
										required: '請選擇付款方式',
									})}
									name="payment"
									value="貨到付款"
								/>
								<label
									className="form-check-label text-secondary-500"
									htmlFor="radioList3"
								>
									貨到付款
								</label>
							</div>
							{errors.payment && (
								<p className="text-danger">{errors.payment.message}</p>
							)}
						</div>

						<div className="mb-3">
							<label
								htmlFor="message"
								className="form-label text-secondary-500"
							>
								留言
							</label>
							<textarea
								id="message"
								className="form-control"
								cols="30"
								rows="10"
								{...register('message')}
							></textarea>
						</div>
						<div className="text-end">
							<button
								type="submit"
								className="btn customerNoIconBtn-primary-500"
								disabled={isCartEmpty}
							>
								送出訂單
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Checkout;
