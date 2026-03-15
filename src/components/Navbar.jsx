import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import logo from '../assets/images/logo/logo_header_desktop.svg';
import logoMobile from '../assets/images/logo/logo_header_mobile.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncGetCart } from '../slice/cartSlice';

function Navbar() {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false); // 漢堡選單開關
	const [isSearchOpen, setIsSearchOpen] = useState(false); // 搜尋欄開關
	const [search, setSearch] = useState(''); // 搜尋欄狀態

	const carts = useSelector((state) => state.cart.carts); // cartSlice initialState 資料
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(createAsyncGetCart());
	}, [dispatch]);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		if (isSearchOpen) setIsSearchOpen(false); // 打開漢堡選單時關閉搜尋
	};

	const toggleSearch = () => {
		setIsSearchOpen(!isSearchOpen);
		if (isMenuOpen) setIsMenuOpen(false); // 打開搜尋時關閉選單
	};

	const handleSearch = (e) => {
		if (e.code === 'Enter') {
			const value = e.target.value.trim();
			navigate(`/products?q=${value}`);
			setSearch('');
		}
	};

	return (
		<>
			<div className="container">
				<ul className="nav py-5 d-flex justify-content-between align-items-center position-relative">
					<li className="nav-item d-none d-md-block">
						<Link className="nav-link p-0" to="/">
							<img
								src={logo}
								alt="logo"
								style={{ width: '256px', height: '48px', objectFit: 'cover' }}
							/>
						</Link>
					</li>
					<li className="nav-item d-md-none d-block">
						<Link className="nav-link p-0" to="/">
							<img
								src={logoMobile}
								alt="logo"
								style={{ width: '115px', height: '48px', objectFit: 'cover' }}
							/>
						</Link>
					</li>
					<div className="d-flex gap-3">
						<li className="nav-item d-none d-md-block">
							<Link className="nav-link customer-link" to="/products">
								商品分類
							</Link>
						</li>
						<li className="nav-item d-none d-md-block">
							<Link className="nav-link customer-link" to="/about">
								關於樂茶
							</Link>
						</li>
						<li className="nav-item d-none d-md-block">
							<Link className="nav-link customer-link" to="/brand">
								品牌專欄
							</Link>
						</li>
					</div>
					<div className="d-flex gap-3">
						{/* 搜尋欄按鈕 */}
						<li className="nav-item">
							<button
								type="button"
								className="btn customerBtn-transparent"
								onClick={() => toggleSearch()}
							>
								<span className="material-symbols-outlined">search</span>
							</button>
						</li>

						<li className="nav-item d-none d-md-block">
							<Link className="nav-link customer-link" to="/login">
								<span className="material-symbols-outlined">person</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link customer-link position-relative"
								to="/cart"
							>
								<span className="material-symbols-outlined">local_mall</span>
								{carts.length > 0 && (
									<span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-secondary-500">
										{carts.length}
									</span>
								)}
							</Link>
						</li>
						{/* Mobile: 漢堡選單按鈕 */}
						<li className="nav-item d-md-none d-block">
							<button
								type="button"
								className="btn customerBtn-transparent"
								onClick={() => toggleMenu()}
							>
								<span className="material-symbols-outlined">
									{isMenuOpen ? 'close' : 'dehaze'}
								</span>
							</button>
						</li>
						<div className="position-absolute start-0 end-0 z-1 bg-primary-900">
							<div
								className={`collapse ${isSearchOpen ? 'show' : ''}`}
								id="navbar-search"
							>
								<div className="d-flex align-items-center">
									<form className="position-relative w-100">
										<input
											type="search"
											className="form-control customer-formControl"
											id="search"
											placeholder="茶器商品熱賣中"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											onKeyUp={(e) => handleSearch(e)}
										></input>
										<span className="material-symbols-outlined text-secondary-300 position-absolute top-50 end-5 translate-middle-y">
											search
										</span>
									</form>
									<button
										type="button"
										className="btn customerBtn-transparent"
										onClick={() => toggleSearch()}
									>
										<span className="material-symbols-outlined">close</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</ul>
				<div
					className={`collapse py-3 ${isMenuOpen ? 'show' : ''}`}
					id="navbar-collapse"
				>
					<div className="d-flex flex-column">
						<ul className="nav d-flex flex-column mb-11">
							<li className="nav-item d-md-none d-block">
								<Link
									className="nav-link w-100 headerLink d-flex justify-content-between align-items-center"
									to="/products"
								>
									<span>商品分類</span>
									<span className="material-symbols-outlined">
										arrow_forward
									</span>
								</Link>
							</li>
							<li className="nav-item d-md-none d-block">
								<Link
									className="nav-link w-100 headerLink d-flex justify-content-between align-items-center"
									to="/about"
								>
									<span>關於樂茶</span>
									<span className="material-symbols-outlined">
										arrow_forward
									</span>
								</Link>
							</li>
							<li className="nav-item d-md-none d-block">
								<Link
									className="nav-link w-100 headerLink d-flex justify-content-between align-items-center"
									to="/brand"
								>
									<span>品牌專欄</span>
									<span className="material-symbols-outlined">
										arrow_forward
									</span>
								</Link>
							</li>
						</ul>
						<div className="d-md-none d-block">
							<button
								type="button"
								className="btn w-100 headerLink bg-neutral-500 d-flex justify-content-between align-items-center"
								onClick={() => navigate('/login')}
							>
								<span className="material-symbols-outlined">person</span>
								<span>登入 / 註冊</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Navbar;
