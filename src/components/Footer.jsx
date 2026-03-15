import { Link, useNavigate } from 'react-router';
import logoFooter from '../assets/images/logo/logo_footer.svg';

function Footer() {
	const navigate = useNavigate();

	return (
		<>
			<footer className="bg-neutral-700 border-top border-primary-500 pt-md-9 pb-md-7 py-7">
				<div className="container">
					<div className="d-flex justify-content-between flex-wrap mb-md-11 mb-7">
						<div className="d-flex flex-column">
							<Link className="mb-md-5 mb-7" to="/">
								<img
									src={logoFooter}
									style={{ width: '339px', height: '32px', objectFit: 'cover' }}
									alt="logo"
								/>
							</Link>
							<p className="text-primary-100 fw-light d-none d-md-block">
								推廣「簡約、慢活、有溫度」的現代茶文化。 <br />
								融合東方美學 × 當代極簡 × 手工職人工藝。
							</p>
						</div>
						<div className="d-flex flex-column">
							<p className="text-secondary-300 mb-3">SHOP</p>
							<button
								type="button"
								className="btn footerLink"
								onClick={() => navigate('/products')}
							>
								所有商品
							</button>
						</div>
						<div className="d-flex flex-column">
							<p className="text-secondary-300 mb-3">ABOUT</p>
							<button
								type="button"
								className="btn footerLink"
								onClick={() => navigate('/about')}
							>
								關於樂茶
							</button>
							<button
								type="button"
								className="btn footerLink"
								onClick={() => navigate('/brand')}
							>
								品牌專欄
							</button>
						</div>
						<div className="d-flex flex-column">
							<p className="text-secondary-300 mb-6">CONTACT</p>
							<div className="d-flex flex-column mb-6">
								<p className="text-secondary-100 fw-light mb-2">
									service@lovetea.com
								</p>
								<p className="text-secondary-100 fw-light">
									臺北市中正區重慶南路一段122號
								</p>
							</div>
							<div className="d-flex gap-3">
								<button
									type="button"
									className="btn customerBtn-circle-secondary-500"
								>
									<i className="bi bi-instagram"></i>
								</button>
								<button
									type="button"
									className="btn customerBtn-circle-secondary-500"
								>
									<i className="bi bi-facebook"></i>
								</button>
								<button
									type="button"
									className="btn customerBtn-circle-secondary-500"
								>
									<i className="bi bi-line"></i>
								</button>
							</div>
						</div>
					</div>
					<div className="border border-primary-300 w-100 mb-6"></div>
					<p className="text-primary-100 fw-light">
						© Copyright 2025 TTH. All rights reserved.
					</p>
				</div>
			</footer>
		</>
	);
}

export default Footer;
