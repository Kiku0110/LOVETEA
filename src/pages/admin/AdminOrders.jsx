import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import { orderDate } from '../../utils/filter';
import OrderModal from '../../components/admin/OrderModal';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import useMessage from '../../hooks/useMessage';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const INITIAL_TEMPLATE_DATA = {
	create_at: '',
	id: '',
	is_paid: false,
	message: '',
	products: {
		id: '',
		product_id: '',
		qty: '',
	},
	user: {
		address: '',
		email: '',
		name: '',
		payment: '',
		tel: '',
	},
};

function AdminOrders() {
	const [orders, setOrders] = useState([]);
	const [templateOrder, setTemplateOrder] = useState(INITIAL_TEMPLATE_DATA);
	const [modalType, setModalType] = useState('');
	const orderModalRef = useRef(null);
	const [pagination, setPagination] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { showSuccess, showError } = useMessage();

	const handleModalInputChange = (e) => {
		const { name, value, checked, type } = e.target;
		// 判斷是否為 user 內部的屬性
		const userFields = ['address', 'email', 'name', 'payment', 'tel'];
		if (userFields.includes(name)) {
			setTemplateOrder((prevData) => ({
				...prevData,
				user: {
					...prevData.user,
					[name]: value,
				},
			}));
		} else {
			if (name === 'id') return; // input name 為 id 就中斷執行
			setTemplateOrder((preData) => ({
				...preData,
				[name]: type === 'checkbox' ? checked : value,
			}));
		}
	};

	const getOrders = async (page = 1) => {
		try {
			const response = await axios.get(
				`${API_BASE}/api/${API_PATH}/admin/orders?page=${page}`,
			);
			setOrders(response.data.orders);
			setPagination(response.data.pagination);
			showSuccess('資料取得成功');
		} catch (error) {
			showError(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	const updateOrder = async (id) => {
		const orderData = {
			data: {
				...templateOrder,
			},
		};

		try {
			await axios.put(
				`${API_BASE}/api/${API_PATH}/admin/order/${id}`,
				orderData,
			);
			showSuccess('已修改完成');
			getOrders();
			closeModal();
		} catch (error) {
			showError(error.response.data.message);
		}
	};

	const delOrder = async (id) => {
		try {
			const response = await axios.delete(
				`${API_BASE}/api/${API_PATH}/admin/order/${id}`,
			);
			showSuccess(response.data.message);
			getOrders();
			closeModal();
		} catch (error) {
			showError(error.response.data.message);
		}
	};

	useEffect(() => {
		const getOrders = async (page = 1) => {
			try {
				const response = await axios.get(
					`${API_BASE}/api/${API_PATH}/admin/orders?page=${page}`,
				);
				setOrders(response.data.orders);
				setPagination(response.data.pagination);
				showSuccess('資料取得成功');
			} catch (error) {
				showError(error.response.data.message);
			} finally {
				setIsLoading(false);
			}
		};
		getOrders();

		orderModalRef.current = new bootstrap.Modal('#orderModal', {
			keyboard: false,
		});
	}, [showSuccess, showError]);

	const openModal = (type, order) => {
		setModalType(type);
		// if (type === 'edit') {
		// 	setTemplateOrder({ ...order });
		// } else {
		// 	setTemplateOrder(INITIAL_TEMPLATE_DATA);
		// }
		setTemplateOrder((pre) => ({
			...pre,
			...order,
		}));
		orderModalRef.current.show();
	};

	const closeModal = () => {
		orderModalRef.current.hide();
	};

	return (
		<>
			<div className="container">
				<Loading show={isLoading} text={'正在載入資料...'} />
				<h2 className="my-4 text-center text-secondary-100">訂單列表</h2>
				<table className="table table-striped text-center">
					<thead>
						<tr>
							<th scope="col">訂單編號</th>
							<th scope="col">聯絡人</th>
							<th scope="col">聯絡地址</th>
							<th scope="col">Email</th>
							<th scope="col">訂單日期</th>
							<th scope="col">付款方式</th>
							<th scope="col">是否付款</th>
							<th scope="col">編輯</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>
									<p>{order.user.name}</p>
									<p>{order.user.tel}</p>
								</td>
								<td>{order.user.address}</td>
								<td>{order.user.email}</td>
								<td>{orderDate(order.create_at)}</td>
								<td>{order.user.payment}</td>
								<td
									className={`${order.is_paid ? 'text-primary' : 'text-danger'}`}
								>
									{order.is_paid ? '已付款' : '未付款'}
								</td>
								<td>
									<div
										className="btn-group"
										role="group"
										aria-label="Basic example"
									>
										<button
											type="button"
											className="btn btn-sm btn-outline-primary"
											onClick={() => openModal('edit', order)}
										>
											編輯
										</button>
										<button
											type="button"
											className="btn btn-sm btn-outline-danger"
											onClick={() => openModal('delete', order)}
										>
											刪除
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination pagination={pagination} onChangePage={getOrders} />
			</div>
			{/* Modal */}
			<OrderModal
				modalType={modalType}
				templateOrder={templateOrder}
				handleModalInputChange={handleModalInputChange}
				delOrder={delOrder}
				closeModal={closeModal}
				updateOrder={updateOrder}
			/>
		</>
	);
}

export default AdminOrders;
