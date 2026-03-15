import { Outlet } from 'react-router';
import CarouselPromotion from '../components/CarouselPromotion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FrontedLayout() {
	return (
		<>
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
