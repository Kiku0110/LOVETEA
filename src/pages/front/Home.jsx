import HeroCarousel from '../../components/front/home/HeroCarousel';
import BrandSection from '../../components/front/home/BrandSection';
import ProductsSection from '../../components/front/home/ProductsSection';
import ArticleSection from '../../components/front/home/ArticleSection';
import CraftSection from '../../components/front/home/CraftSection';

function Home() {
	return (
		<>
			<HeroCarousel />
			<BrandSection />
			<ProductsSection />
			<ArticleSection />
			<CraftSection />
		</>
	);
}

export default Home;
