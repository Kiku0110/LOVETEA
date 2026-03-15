import { createHashRouter } from 'react-router';
import FrontedLayout from './layout/FrontedLayout';
import Home from './pages/front/Home';
import Products from './pages/front/Products';
import ProductsIndex from './pages/front/ProductsIndex';
import SingleProduct from './pages/front/SingleProduct';
import Cart from './pages/front/Cart';
import Checkout from './pages/front/Checkout';
import About from './pages/front/About';
import Brand from './pages/front/Brand';

import AdminLayout from './layout/AdminLayout';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import NotFound from './pages/NotFound';

export const router = createHashRouter([
	{
		path: '/',
		element: <FrontedLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'products',
				element: <Products />,
				children: [
					{
						index: true,
						element: <ProductsIndex />,
					},
				],
			},
			{
				path: 'product/:id',
				element: <SingleProduct />,
			},
			{
				path: 'cart',
				element: <Cart />,
			},
			{
				path: 'checkout',
				element: <Checkout />,
			},
			{
				path: 'about',
				element: <About />,
			},
			{
				path: 'brand',
				element: <Brand />,
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
	{
		path: 'admin',
		element: (
			<ProtectedRoute>
				<AdminLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: 'products',
				element: <AdminProducts />,
			},
			{
				path: 'orders',
				element: <AdminOrders />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);
