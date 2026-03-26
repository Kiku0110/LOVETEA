import { Link } from 'react-router';

function NotFound() {
	return (
		<>
			<div className="container py-5 d-flex flex-column align-items-center">
				<h1 className="text-light text-center mb-4">404 Not Found！</h1>
				<Link to="/" className="customer-link text-center">
					回到首頁
				</Link>
			</div>
		</>
	);
}

export default NotFound;
