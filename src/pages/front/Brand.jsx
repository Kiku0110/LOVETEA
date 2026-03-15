import bgImage from '../../assets/images/banner/brand-banner.svg';
import Banner from '../../components/Banner';
import ArticleSection from '../../components/front/home/ArticleSection';

function Brand() {
	return (
		<>
			<Banner bgImg={bgImage} text={'品牌專欄'} />
			<ArticleSection />
		</>
	);
}

export default Brand;
