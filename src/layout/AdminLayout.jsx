import { Outlet } from 'react-router';
import AdminNavbar from '../components/admin/AdminNavbar';
import Footer from '../components/Footer';

function AdminLayout() {
	return (
		<>
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
