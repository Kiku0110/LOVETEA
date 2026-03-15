import articleImg from '../../../assets/images/home/article images-1.svg';
import articleImg2 from '../../../assets/images/home/article images-2.svg';
import articleImg3 from '../../../assets/images/home/article images-3.svg';
import articleImg4 from '../../../assets/images/home/article images-4.svg';

const articles = [
	{
		id: 1,
		date: '2025.12.17',
		title: '【5 ​分鐘​打造​】質感​茶​桌​布置​指南',
		content:
			'想​讓​喝​茶​變​成​每​天​最​期待​的​儀式​嗎？​本​篇帶​你​從​茶​具​選擇、​桌面​配置​到​光線​氛圍，​打造​一​個​屬於​自己​的​靜心角落。​只要​ 5 ​分鐘，​就​能​替日​常​開​啟​片刻​的​安靜​時光。​',
		image: articleImg,
	},
	{
		id: 2,
		date: '2025.11.10',
		title: '茶​具​收​納術：​讓​你​的​茶​生活​更​俐落、​有​質​感',
		content:
			'茶​具​種​類多、​尺寸​又​不同，​該怎​麼​收才​不​凌亂？​本篇​提供​實用​的​茶​具​收​納​方法：​分層​擺放、​布袋​防​碰撞、​木盒​收納…讓​你​的​茶桌​乾淨、​舒適​又​有​儀式​感，​喝​茶​心情​也​更​輕鬆。​​',
		image: articleImg2,
	},
	{
		id: 3,
		date: '2025.10.21',
		title: '沖泡​新​手​不​踩雷：​讓​茶​更​好喝​的​ 4 個沖​泡​小技巧​',
		content:
			'不論​是​綠​茶、​烏龍還​是​花草​茶，​風味​都​取決於​細節。​本篇​整理​ 4 個​最​關鍵​的​小技​巧：​水溫、​浸泡​時間、​茶量​比例​與器​具​選擇。​簡單​調整，​就​能​讓​每​一​杯​茶​都​回到​清香​與​平衡。​',
		image: articleImg3,
	},
	{
		id: 4,
		date: '2025.09.23',
		title: '用​茶讓生活​慢​下來：3 個​把​日常​變得​更​柔軟​的​小方​法',
		content:
			'想​讓​喝​茶​變​成​每​天​最​期待​的​儀式​嗎？​本​篇帶​你​從​茶​具​選擇、​桌面​配置​到​光線​氛圍，​打造​一​個​屬於​自己​的​靜心角落。​只要​ 5 ​分鐘，​就​能​替日​常​開​啟​片刻​的​安靜​時光。​',
		image: articleImg4,
	},
];
function ArticleSection() {
	return (
		<>
			<section className="py-md-11 py-7">
				<div className="container">
					<div className="d-flex flex-column gap-5 mb-md-7 mb-6">
						<h2 className="text-secondary-100 d-none d-md-block">
							為生活打造一份
							<br /> 帶著茶香的靜心質感
						</h2>
						<h3 className="text-secondary-100 d-block d-md-none">
							為生活打造一份
							<br /> 帶著茶香的靜心質感
						</h3>
						<div
							className="border border-secondary-500 border-4"
							style={{ width: '96px' }}
						/>
					</div>
					{/* Desktop */}
					<div className="d-none d-md-block">
						<div className="row">
							{articles.map((article) => (
								<div className="col-md-3" key={article.id}>
									<div className="card customer-card-long h-100">
										<img
											src={article.image}
											className="card-img-top"
											alt="文章首圖"
										/>
										<div className="card-body">
											<span className="fw-light text-primary-100 mb-1">
												{article.date}
											</span>
											<h5 className="card-title">{article.title}</h5>
											<h6 className="card-text text-line-clamp-2">
												{article.content}
											</h6>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Mobile */}
					<div className="overflow-auto overflow-card d-block d-md-none">
						<div className="row">
							{articles.map((article) => (
								<div className="col-md-3" key={article.id}>
									<div className="card customer-card-long h-100">
										<img
											src={article.image}
											className="card-img-top"
											alt="文章首圖"
										/>
										<div className="card-body">
											<span className="fw-light text-primary-100 mb-1">
												{article.date}
											</span>
											<h5 className="card-title">{article.title}</h5>
											<h6 className="card-text text-line-clamp-2">
												{article.content}
											</h6>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default ArticleSection;
