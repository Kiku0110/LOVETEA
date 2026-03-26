import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';
import Loading from './Loading';
import useMessage from '../hooks/useMessage';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProtectedRoute({ children }) {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { showError } = useMessage();

	useEffect(() => {
		// 檢查登入狀態
		const token = document.cookie
			.split('; ')
			.find((row) => row.startsWith('hexToken='))
			?.split('=')[1]; // 讀取 Cookie

		// 有取得 Token 才將 Token 設定到 Header 上
		if (token) {
			axios.defaults.headers.common['Authorization'] = token;
		}

		// 檢查管理員權限
		const checkLogin = async () => {
			try {
				await axios.post(`${API_BASE}/api/user/check`);
				setIsAuth(true);
			} catch (error) {
				showError(error.response?.data.message);
			} finally {
				setIsLoading(false);
			}
		};
		checkLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (isLoading) {
		return <Loading show={isLoading} text={'載入中...'} />;
	}
	//驗證失敗跳至登入頁
	if (!isAuth) {
		return <Navigate to="/login" />;
	}

	return children;
}

export default ProtectedRoute;
