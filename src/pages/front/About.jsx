/* eslint-disable no-irregular-whitespace */
import bgImage from '../../assets/images/banner/about-banner.jpg';
import storyImage from '../../assets/images/about/about-1.jpg';
import storyImage2 from '../../assets/images/about/about-2.jpg';
import storyImage3 from '../../assets/images/about/about-3.jpg';
import Banner from '../../components/Banner';
import RoundedSection from '../../components/front/about/RoundedSection';

function About() {
	return (
		<>
			<Banner bgImg={bgImage} text={'關於樂茶'} />
			<RoundedSection prevColor={'transparent'} bgColor={'bg-primary-700'}>
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<div className="mb-md-0 mb-6">
								{/* Desktop */}
								<div className="d-none d-md-block">
									<div className="d-flex flex-column gap-1">
										<p className="fw-light text-secondary-300">Brand HISTORY</p>
										<h2 className="text-secondary-100">品牌年表</h2>
									</div>
								</div>
								{/* Mobile */}
								<div className="d-block d-md-none">
									<div className="d-flex flex-column">
										<p className="fw-light text-secondary-300">Brand HISTORY</p>
										<h3 className="text-secondary-100">品牌年表</h3>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-9">
							<ul className="list-group list-group-flush customer-listGroupFlush">
								<li className="list-group-item">
									<h2 className="text-secondary-100">2004</h2>
									<p className="fs-5 text-secondary-300">
										在台北松山​，第一家 LOVETEA 樂茶生活開幕
									</p>
								</li>
								<li className="list-group-item">
									<h2 className="text-secondary-100">2008</h2>
									<p className="fs-5 text-secondary-300">
										除​了​品牌​手​作外，​也​引進​優質​選品，​擴大營業
									</p>
								</li>
								<li className="list-group-item">
									<h2 className="text-secondary-100">2010</h2>
									<p className="fs-5 text-secondary-300">
										LOVETEA 樂​茶​生活​線​上​購物網開始營運
									</p>
								</li>
								<li className="list-group-item">
									<h2 className="text-secondary-100">2018</h2>
									<p className="fs-5 text-secondary-300">
										榮獲 ECSA 環保企業永續獎
									</p>
								</li>
								<li className="list-group-item">
									<h2 className="text-secondary-100">2024</h2>
									<p className="fs-5 text-secondary-300">
										30 間店鋪達成，員工突破 1000 人
									</p>
								</li>
								<li className="list-group-item"></li>
							</ul>
						</div>
					</div>
				</div>
			</RoundedSection>
			<RoundedSection prevColor={'bg-primary-700'} bgColor={'bg-primary-500'}>
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<div className="mb-md-0 mb-6">
								{/* Desktop */}
								<div className="d-none d-md-block">
									<div className="d-flex flex-column gap-1">
										<p className="fw-light text-secondary-300">Brand Story</p>
										<h2 className="text-secondary-100">品牌故事</h2>
									</div>
								</div>
								{/* Mobile */}
								<div className="d-block d-md-none">
									<div className="d-flex flex-column">
										<p className="fw-light text-secondary-300">Brand Story</p>
										<h3 className="text-secondary-100">品牌故事</h3>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-9">
							<div className="py-md-6 py-0">
								{/* Desktop */}
								<div className="d-none d-md-block">
									<img
										src={storyImage}
										alt="背景圖"
										className="w-100 object-fit-cover rounded mb-9"
										style={{ height: '480px' }}
										decoding="async"
										loading="lazy"
									/>
								</div>
								{/* Mobile */}
								<div className="d-block d-md-none">
									<img
										src={storyImage}
										alt="背景圖"
										className="w-100 object-fit-cover rounded mb-5"
										style={{ height: '200px' }}
										decoding="async"
										loading="lazy"
									/>
								</div>
								<h5 className="text-secondary-300 mb-md-7 mb-4">
									以​一杯​茶，​找回​生活​的​步調​
								</h5>
								<p className="fw-light text-secondary-300 mb-4">
									LOVETEA
									​相信，​茶，​不​只​是​飲品，​而​是​一​種​回到​生活​本心​的​方式。​
									<br />
									​在​快速​變動​的​現代，​我​們常​忘記​停下​腳步，​聽​一​聽​自己​的​呼吸，​茶​的​存在，​就​是​那​個讓​我​們願意慢​下來​的​理由。​​
								</p>
								<p className="fw-light text-secondary-300 mb-4">
									​我​們​以​「簡約、​慢活、​有​溫度」​為​品牌​核心，​從器​物​到​茶葉、​從香​氣​到​手感，​希望​每​一​件​選物，​都​能​陪伴​你​在​繁忙​日常​中​找到​片刻​的​安定。​
									<br />
									器物​的​線條、​陶釉​的​溫潤、​茶湯​的​明亮，​是​我​們探索​生活​美學​最​真誠​的​方式。​
									<br />
									在​
									L​OVETEA，​我​們​不​僅​追求​茶具​的​質地​與​功能，​更​注重​每​件​器​物​背後​的​文化​脈絡​與職人​精神。​
								</p>
								<p className="fw-light text-secondary-300">
									​我​們​相信，​好​的​茶器​不​只​是​工具，​而​是​承載​時間、​心境​與​故事​的​存在；​好​的​茶葉​不​只​是​風味，​而​是​自然​與​四季​的​贈禮。​
								</p>
							</div>
						</div>
					</div>
				</div>
			</RoundedSection>
			<RoundedSection prevColor={'bg-primary-500'} bgColor={'bg-neutral-700'}>
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<div className="mb-md-0 mb-6">
								{/* Desktop */}
								<div className="d-none d-md-block">
									<div className="d-flex flex-column gap-1">
										<p className="fw-light text-secondary-300">CSR</p>
										<h2 className="text-secondary-100">社會責任</h2>
									</div>
								</div>
								{/* Mobile */}
								<div className="d-block d-md-none">
									<div className="d-flex flex-column">
										<p className="fw-light text-secondary-300">CSR</p>
										<h3 className="text-secondary-100">社會責任</h3>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-9">
							<div className="py-md-6 py-0">
								<div className="row">
									<div className="col-md-6">
										<div className="mb-md-0 mb-8">
											{/* Desktop */}
											<div className="d-none d-md-block">
												<img
													src={storyImage2}
													alt="背景圖"
													className="w-100 object-fit-cover rounded mb-7"
													style={{ height: '296px' }}
													decoding="async"
													loading="lazy"
												/>
											</div>
											{/* Mobile */}
											<div className="d-block d-md-none">
												<img
													src={storyImage2}
													alt="背景圖"
													className="w-100 object-fit-cover rounded mb-6"
													style={{ height: '200px' }}
													decoding="async"
													loading="lazy"
												/>
											</div>
											<h5 className="text-secondary-100 mb-md-3 mb-1">
												守護​自然，​延續​茶山​的​純淨​
											</h5>
											{/* Desktop */}
											<p className="fw-light text-secondary-300 d-none d-md-block">
												每​一​片​茶葉、​每​一​件​茶器，​都​來​自土地​的​恩賜。​
												<br />
												​因此，​我​們致力​支持​友善​耕​作與永​續​茶園，​選擇​無農藥殘​留與符合環境​保育​標準​的​茶葉​來源，​讓​茶山​能​在​最​自然​的​節奏​中繼續生長。
												<br />
												​我​們​也​與​在​地​小​農與​環境組織​合作，​推廣​生態​茶園​管理，​讓每​一​杯​茶，​都​能​成為​守​護山林​的​力量。​
												<br />
												​我​們​相信，​唯​有​尊重土地，​茶香​才​能​長久​而​清澈。​
											</p>
											{/* Mobile */}
											<p className="fw-light text-secondary-300 d-block d-md-none">
												每​一​片​茶葉、​每​一​件​茶器，​都​來​自土地​的​恩賜。​
												​因此，​我​們致力​支持​友善​耕​作與永​續​茶園，​選擇​無農藥殘​留與符合環境​保育​標準​的​茶葉​來源，​讓​茶山​能​在​最​自然​的​節奏​中繼續生長。
												​我​們​也​與​在​地​小​農與​環境組織​合作，​推廣​生態​茶園​管理，​讓每​一​杯​茶，​都​能​成為​守​護山林​的​力量。​
												​我​們​相信，​唯​有​尊重土地，​茶香​才​能​長久​而​清澈。​
											</p>
										</div>
									</div>
									<div className="col-md-6">
										{/* Desktop */}
										<div className="d-none d-md-block">
											<img
												src={storyImage3}
												alt="背景圖"
												className="w-100 object-fit-cover rounded mb-7"
												style={{ height: '296px' }}
												decoding="async"
												loading="lazy"
											/>
										</div>
										{/* Mobile */}
										<div className="d-block d-md-none">
											<img
												src={storyImage3}
												alt="背景圖"
												className="w-100 object-fit-cover rounded mb-6"
												style={{ height: '200px' }}
												decoding="async"
												loading="lazy"
											/>
										</div>
										<h5 className="text-secondary-100 mb-md-3 mb-1">
											減塑​環境，​共創​更​好​的​地球​循​環
										</h5>
										{/* Desktop */}
										<p className="fw-light text-secondary-300 d-none d-md-block">
											LOVETEA
											​承諾​在​商品​包裝​與物​流過程​中，​減少​不​必要​的​塑料​與​一​次​性​耗材。​我​們選擇​可​回收、​可再​利用​材質，​並持​續​尋​找​更​環境​友善​的​替代​方案，​讓​茶​不​僅​好喝，​也​讓​地​球​能​更​輕鬆​地​呼吸。​
											<br />
											​我​們​希望​透過​每​一​次​小小​的​行動，​喚起​更​多​品牌​與消費者​一起​加入​永續​循環​的​行列，​為下​一​代​保留​更​美​好​的​自然​樣貌。​
										</p>
										{/* Mobile */}
										<p className="fw-light text-secondary-300 d-block d-md-none">
											LOVETEA
											​承諾​在​商品​包裝​與物​流過程​中，​減少​不​必要​的​塑料​與​一​次​性​耗材。​我​們選擇​可​回收、​可再​利用​材質，​並持​續​尋​找​更​環境​友善​的​替代​方案，​讓​茶​不​僅​好喝，​也​讓​地​球​能​更​輕鬆​地​呼吸。​
											​我​們​希望​透過​每​一​次​小小​的​行動，​喚起​更​多​品牌​與消費者​一起​加入​永續​循環​的​行列，​為下​一​代​保留​更​美​好​的​自然​樣貌。​
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</RoundedSection>
		</>
	);
}

export default About;
