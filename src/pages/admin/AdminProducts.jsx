import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import ProductModal from '../../components/admin/ProductModal';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import useMessage from '../../hooks/useMessage';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

//初始化資料
const INITIAL_TEMPLATE_DATA = {
	id: '',
	title: '',
	category: '',
	origin_price: '',
	price: '',
	unit: '',
	description: '',
	content: '',
	is_enabled: false,
	imageUrl: '',
	imagesUrl: [],
	sizes: [],
	colors: [],
	series: '',
	material: '',
	heat_resistance: '',
	origin: '',
	notices: '',
};

function AdminProducts() {
	const [products, setProducts] = useState([]);
	const [templateProduct, setTemplateProduct] = useState(INITIAL_TEMPLATE_DATA);
	const [modalType, setModalType] = useState('');
	const productModalRef = useRef(null); // useRef 建立對 DOM 元素的參照
	const [pagination, setPagination] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { showSuccess, showError } = useMessage();

	const handleModalInputChange = (e) => {
		const { name, value, checked, type } = e.target;
		setTemplateProduct((preData) => ({
			...preData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleModalImageChange = (index, value) => {
		setTemplateProduct((prev) => {
			const newImage = [...prev.imagesUrl];
			newImage[index] = value;
			return {
				...prev,
				imagesUrl: newImage,
			};
		});
	};

	const handleAddImage = () => {
		setTemplateProduct((prev) => {
			const newImage = [...prev.imagesUrl];
			newImage.push('');
			return {
				...prev,
				imagesUrl: newImage,
			};
		});
	};

	const handleDeleteImage = () => {
		setTemplateProduct((prev) => {
			const newImage = [...prev.imagesUrl];
			newImage.pop();
			return {
				...prev,
				imagesUrl: newImage,
			};
		});
	};

	const handleModalSizeChange = (index, value) => {
		setTemplateProduct((prev) => {
			const newSize = [...prev.sizes];
			newSize[index] = value;
			return {
				...prev,
				sizes: newSize,
			};
		});
	};

	const handleAddSize = () => {
		setTemplateProduct((prev) => {
			const newSize = [...prev.sizes];
			newSize.push('');
			return {
				...prev,
				sizes: newSize,
			};
		});
	};

	const handleDeleteSize = () => {
		setTemplateProduct((prev) => {
			const newSize = [...prev.sizes];
			newSize.pop();
			return {
				...prev,
				sizes: newSize,
			};
		});
	};

	const handleModalColorChange = (index, value) => {
		setTemplateProduct((prev) => {
			const newColor = [...prev.colors];
			newColor[index] = value;
			return {
				...prev,
				colors: newColor,
			};
		});
	};

	const handleAddColor = () => {
		setTemplateProduct((prev) => {
			const newColor = [...prev.colors];
			newColor.push('');
			return {
				...prev,
				colors: newColor,
			};
		});
	};

	const handleDeleteColor = () => {
		setTemplateProduct((prev) => {
			const newColor = [...prev.colors];
			newColor.pop();
			return {
				...prev,
				colors: newColor,
			};
		});
	};

	const getProducts = async (page = 1) => {
		try {
			const response = await axios.get(
				`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`,
			);
			setProducts(response.data.products);
			setPagination(response.data.pagination);
			showSuccess('資料取得成功');
		} catch (error) {
			showError(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	const updateProduct = async (id) => {
		let url = `${API_BASE}/api/${API_PATH}/admin/product`;
		let method = 'post';

		if (modalType === 'edit') {
			url = `${API_BASE}/api/${API_PATH}/admin/product/${id}`;
			method = 'put';
			showSuccess('已修改完成');
		}

		const productData = {
			//改變初始化資料的型態(字串轉數字)
			//避免 imagesUrl 傳空字串
			data: {
				...templateProduct,
				origin_price: Number(templateProduct.origin_price),
				price: Number(templateProduct.price),
				is_enabled: templateProduct.is_enabled ? 1 : 0,
				imagesUrl: [...templateProduct.imagesUrl.filter((url) => url !== '')],
			},
		};

		//axios[method] 可依 if 條件切換成 axios.post 或 axios.put
		try {
			await axios[method](url, productData);
			if (method === 'post') {
				showSuccess('成功建立商品！');
			}
			getProducts();
			closeModal();
		} catch (error) {
			showError(error.response.data.message);
		}
	};

	const delProduct = async (id) => {
		try {
			const response = await axios.delete(
				`${API_BASE}/api/${API_PATH}/admin/product/${id}`,
			);
			showSuccess(response.data.message);
			getProducts();
			closeModal();
		} catch (error) {
			showError(error.response.data.message);
		}
	};

	const uploadImage = async (e) => {
		const file = e.target.files?.[0];
		//沒有 file 就 return
		if (!file) {
			return;
		}

		try {
			const formData = new FormData();
			formData.append('file-to-upload', file);

			const response = await axios.post(
				`${API_BASE}/api/${API_PATH}/admin/upload`,
				formData,
			);
			setTemplateProduct((pre) => ({
				...pre,
				imageUrl: response.data.imageUrl,
			}));
		} catch (error) {
			showError(error.response.data.message);
		}
	};

	useEffect(() => {
		const getProducts = async (page = 1) => {
			try {
				const response = await axios.get(
					`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`,
				);
				setProducts(response.data.products);
				setPagination(response.data.pagination);
				showSuccess('資料取得成功');
			} catch (error) {
				showError(error.response.data.message);
			} finally {
				setIsLoading(false);
			}
		};
		getProducts();

		//建立 Modal methods
		productModalRef.current = new bootstrap.Modal('#productModal', {
			keyboard: false,
		});
	}, [showSuccess, showError]);

	const openModal = (type, product) => {
		setModalType(type);
		//因為新增 size 屬性，所以原本是傳 preData 要改成 INITIAL_TEMPLATE_DATA
		setTemplateProduct({
			...INITIAL_TEMPLATE_DATA,
			...product,
		});
		productModalRef.current.show();
	};

	const closeModal = () => {
		productModalRef.current.hide();
	};

	return (
		<>
			<div className="container">
				<Loading show={isLoading} text={'正在載入資料...'} />
				<h2 className="my-4 text-center text-secondary-100">產品列表</h2>
				{/* 新增產品按鈕 */}
				<div className="text-end my-4">
					<button
						type="button"
						className="btn btn-secondary-500"
						onClick={() => openModal('create', INITIAL_TEMPLATE_DATA)}
					>
						建立新的產品
					</button>
				</div>
				<table className="table table-striped text-center">
					<thead>
						<tr>
							<th scope="col">分類</th>
							<th scope="col">產品名稱</th>
							<th scope="col">原價</th>
							<th scope="col">售價</th>
							<th scope="col">是否啟用</th>
							<th scope="col">編輯</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => {
							return (
								<tr key={product.id}>
									<td>{product.category}</td>
									<th scope="row">{product.title}</th>
									<td>{product.origin_price}</td>
									<td>{product.price}</td>
									<td className={`${product.is_enabled ? 'text-primary' : ''}`}>
										{product.is_enabled ? '啟用' : '未啟用'}
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
												onClick={() => openModal('edit', product)}
											>
												編輯
											</button>
											<button
												type="button"
												className="btn btn-sm btn-outline-danger"
												onClick={() => openModal('delete', product)}
											>
												刪除
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<Pagination pagination={pagination} onChangePage={getProducts} />
			</div>

			{/* Modal */}
			<ProductModal
				modalType={modalType}
				templateProduct={templateProduct}
				handleModalInputChange={handleModalInputChange}
				handleModalImageChange={handleModalImageChange}
				handleAddImage={handleAddImage}
				handleDeleteImage={handleDeleteImage}
				updateProduct={updateProduct}
				delProduct={delProduct}
				uploadImage={uploadImage}
				closeModal={closeModal}
				handleModalSizeChange={handleModalSizeChange}
				handleAddSize={handleAddSize}
				handleDeleteSize={handleDeleteSize}
				handleModalColorChange={handleModalColorChange}
				handleAddColor={handleAddColor}
				handleDeleteColor={handleDeleteColor}
			/>
		</>
	);
}

export default AdminProducts;
