import { Outlet, ScrollRestoration } from 'react-router';
import CarouselPromotion from '../components/CarouselPromotion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FrontedLayout() {
	return (
		<>
			{/* 路徑改變時處理捲動歸零 */}
			<ScrollRestoration />
			<header>
				<CarouselPromotion />
				<Navbar />
			</header>
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default FrontedLayout;
