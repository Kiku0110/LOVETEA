import { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useMessage from '../hooks/useMessage';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const navigate = useNavigate();
	const { showSuccess, showError } = useMessage();

	const onSubmit = async (formData) => {
		try {
			const response = await axios.post(`${API_BASE}/admin/signin`, formData);
			//解構取出 Token,expired
			const { token, expired } = response.data;
			// 設定 Cookie
			// eslint-disable-next-line react-hooks/immutability
			document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
			// 將 Token 設定到 axios 的預設 Header
			// eslint-disable-next-line react-hooks/immutability
			axios.defaults.headers.common['Authorization'] = token;
			showSuccess('登入成功');
			//跳至後台產品管理列表
			navigate('/admin/products');
		} catch (error) {
			showError(error.response.data.message);
		}
	};
	useEffect(() => {
		// 檢查登入狀態
		const token = document.cookie
			.split('; ')
			.find((row) => row.startsWith('hexToken='))
			?.split('=')[1]; // 讀取 Cookie

		if (token) {
			//跳至後台產品管理列表
			navigate('/admin/products');
		}
	}, [navigate]);

	return (
		<>
			<div className="container login">
				<h2 className="text-secondary-500 mb-4">請先登入</h2>
				<form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-floating mb-3">
						<input
							type="email"
							className="form-control"
							name="username"
							id="username"
							placeholder="name@example.com"
							{...register('username', {
								required: '請輸入 Email',
								pattern: {
									value: /^\S+@\S+$/i,
									message: 'Email 格式不正確',
								},
							})}
						/>
						<label htmlFor="username">Email address</label>
						{errors.username && (
							<p className="text-danger">{errors.username.message}</p>
						)}
					</div>
					<div className="form-floating">
						<input
							type="password"
							className="form-control"
							name="password"
							id="password"
							placeholder="Password"
							{...register('password', {
								required: '請輸入密碼',
								minLength: {
									value: 6,
									message: '密碼長度至少需 6 碼',
								},
							})}
						/>
						<label htmlFor="password">Password</label>
						{errors.password && (
							<p className="text-danger">{errors.password.message}</p>
						)}
					</div>
					<button type="submit" className="btn btn-secondary-500 w-100 mt-3">
						登入
					</button>
				</form>
			</div>
		</>
	);
}

export default Login;
