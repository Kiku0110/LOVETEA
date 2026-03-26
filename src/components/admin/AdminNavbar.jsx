import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import useMessage from '../../hooks/useMessage';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminNavbar() {
	const navigate = useNavigate();
	const { showSuccess, showError } = useMessage();

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${API_BASE}/logout`);
			// 將 expires 設為過去的時間，讓瀏覽器自動刪除它
			document.cookie = `hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
			navigate('/');
			showSuccess('登出成功');
		} catch (error) {
			showError(error.response.data.message);
		}
	};

	return (
		<>
			<div className="container d-flex justify-content-between align-items-center">
				<ul className="nav py-5 d-flex align-items-center">
					<li className="nav-item">
						<Link className="nav-link customer-link" to="/">
							首頁
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link customer-link" to="/admin/products">
							後台商品列表
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link customer-link" to="/admin/orders">
							後台訂單列表
						</Link>
					</li>
				</ul>
				<Link className="customer-link" to="/" onClick={handleLogout}>
					登出
				</Link>
			</div>
		</>
	);
}
export default AdminNavbar;
