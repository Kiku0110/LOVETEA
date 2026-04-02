import { Outlet, ScrollRestoration } from 'react-router';
import AdminNavbar from '../components/admin/AdminNavbar';
import Footer from '../components/Footer';

function AdminLayout() {
	return (
		<>
			{/* 路徑改變時處理捲動歸零 */}
			<ScrollRestoration />
			<header className="bg-neutral-700">
				<AdminNavbar />
			</header>
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default AdminLayout;
