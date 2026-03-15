import { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import useMessage from '../../hooks/useMessage';
import { currency } from '../../utils/filter';
import { useDispatch } from 'react-redux';
import { createAsyncGetCart } from '../../slice/cartSlice';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const contentMap = {
	// category (優先顯示)
	陶瓷茶具: {
		title: '陶瓷茶器｜日常的靜心陪伴',
		text: '自古以來，陶土與茶便相生相伴。細膩的瓷釉、含蓄的器形、手中微暖的重量，都是東方茶文化中最動人的細節。陶瓷茶器所承載的，不只是器物本身，而是一種對自然、對時間、對心境的理解。',
	},
	玻璃茶器: {
		title: '玻璃茶器｜透亮的純粹品味',
		text: '在光影穿透間，看見茶葉在水中舒展、跳躍。高硼矽耐熱玻璃的純淨，能真實呈現茶湯的原始色澤。無論是清晨的第一杯綠茶，或是靜謐午後的紅豔花茶，玻璃器皿讓品茗過程成為一場極致的視覺饗宴。',
	},
	茶道配件: {
		title: '茶道配件｜成就圓滿的儀式感',
		text: '茶席之間，除了茶與器，每一件配件都是關鍵。從精準承接茶葉的茶則，到守護壺底乾爽的茶墊，配件雖小，卻是職人靈魂的展現。有了這些細節的陪伴，讓泡茶過程更趨完美，實現真正的從容優雅。',
	},
	// series (當沒有特定分類時顯示)
	茶具系列: {
		title: '茶具系列｜器物之美，承載品茗的靈魂',
		text: '自古以來，好的茶器能引發茶的香氣，更能安定飲者的心靈。我們精選從古樸的手工陶藝到現代簡約的耐熱玻璃，每一件器物都經過職人悉心打造。不論是追求傳統茶道的深厚底蘊，或是享受現代生活的俐落美學，這裡的每一款茶具，都致力於讓您的泡茶過程更趨完美，實現真正的從容與優雅。',
	},
	茶葉系列: {
		title: '茶葉系列｜時光淬鍊的醇厚香氣',
		text: '自古以來，大地的滋養與職人的揉捻，成就了每一片茶葉的靈魂。從嫩綠的清香到琥珀色的醇厚，茶湯中流動的不只是風味，更是節氣與山林的記憶。無論是在靜謐午後獨自品茗，或是與友共享一壺溫熱，茶葉所承載的，不只是飲品本身，而是一種對自然規律、對生活品質、對當下感官的尊重與細味。',
	},
	推薦商品: {
		title: '推薦商品｜萬中選一的品味之選',
		text: '在眾多器物與茶種中，我們為您挑選出最能展現生活質感的經典之作。這些產品結合了極致的工藝與實用的美學，旨在提升您的每一次飲茶體驗。無論是初入茶道的探索者，或是資深的尋味者，推薦清單中的每一件單品，都是我們對美好生活的提案，幫助您在忙碌的日常中，快速尋得那一抹屬於自己的寧靜出口。',
	},
};

function ProductsIndex() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { showSuccess, showError } = useMessage();

	const [pagination, setPagination] = useState({});
	const [displayProducts, setDisplayProducts] = useState([]); // 目前頁面顯示的 9 筆產品
	const itemsPerPage = 9; // 設定每頁顯示 9 筆產品

	const [searchParams] = useSearchParams(); // 取得當前網址參數
	const series = searchParams.get('series'); //  URL series=''
	const category = searchParams.get('category'); //  URL &category=''
	const query = searchParams.get('q') || ''; // 取得搜尋關鍵字

	// 利用 useMemo 過濾 series, category, query 條件
	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchSeries = series ? product.series === series : true;
			const matchCategory = category ? product.category === category : true;
			const matchQuery = query
				? product.title.toLowerCase().includes(query.toLowerCase())
				: true;
			return matchSeries && matchCategory && matchQuery;
		});
	}, [products, series, category, query]); // 監聽 products, series, category, query

	const filteredLength = filteredProducts.length;

	// 文案先抓 category，再抓 series，最後抓推薦商品
	const currentContent =
		contentMap[category] || contentMap[series] || contentMap['推薦商品'];

	// 根據頁碼切換顯示資料並更新分頁狀態
	const updatePageData = useCallback(
		(targetList, page) => {
			const total_pages = Math.ceil(targetList.length / itemsPerPage);
			const startIndex = (page - 1) * itemsPerPage; // 計算 slice 的索引
			const endIndex = startIndex + itemsPerPage;
			setDisplayProducts(targetList.slice(startIndex, endIndex));
			// Pagination 元件格式的物件
			setPagination({
				total_pages,
				current_page: page,
				has_pre: page > 1,
				has_next: page < total_pages,
			});
		},
		[itemsPerPage],
	);

	// 處理點擊換頁
	const handlePageChange = (page) => {
		updatePageData(filteredProducts, page);
		window.scrollTo({ top: 500, behavior: 'smooth' });
	};

	const handleView = async (id) => {
		navigate(`/product/${id}`);
	};

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
			setIsLoading(true);
			try {
				const response = await axios.get(
					`${API_BASE}/api/${API_PATH}/products/all`,
				);
				const data = response.data.products;
				setProducts(data);
				updatePageData(data, 1); // 預設顯示第 1 頁
			} catch (error) {
				showError(error.response.data.message);
			} finally {
				setIsLoading(false);
			}
		};
		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 當「原始資料」或「URL 參數」改變時執行
	useEffect(() => {
		if (products.length === 0) return;

		const filteredProducts = products.filter((product) => {
			const matchSeries = series ? product.series === series : true;
			const matchCategory = category ? product.category === category : true;
			const matchQuery = query
				? product.title.toLowerCase().includes(query.toLowerCase())
				: true;
			return matchSeries && matchCategory && matchQuery;
		});

		// 篩選完後，從第 1 頁開始顯示篩選後的結果
		updatePageData(filteredProducts, 1);
	}, [products, series, category, query, updatePageData]);

	return (
		<>
			{isLoading ? (
				<Loading show={isLoading} text={'正在載入中...'} />
			) : filteredProducts.length > 0 ? (
				<div className="container">
					<h3 className="text-secondary-100 mb-md-6 mb-3">
						{currentContent.title}
					</h3>
					<p className="fw-light text-secondary-300 mb-md-7 mb-6">
						{currentContent.text}
					</p>
					<p className="text-secondary-300 text-end mb-md-6 mb-5">
						總共 <span className="fw-bold">{filteredLength}</span> 個商品
					</p>
					<div className="row gy-4 mb-md-7 mb-9">
						{displayProducts.map((product) => (
							<div className="col-md-4" key={product.id}>
								<div
									className="card customer-card-mask "
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
							</div>
						))}
					</div>
					<Pagination pagination={pagination} onChangePage={handlePageChange} />
				</div>
			) : (
				<div className="container">
					<h3 className="text-secondary-100 mb-md-6 mb-3">
						抱歉！搜尋不到 <span className="text-secondary-500">{query}</span>{' '}
						相關產品，請重新搜尋。
					</h3>
				</div>
			)}
		</>
	);
}

export default ProductsIndex;
