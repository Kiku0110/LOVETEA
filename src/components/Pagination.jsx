function Pagination({ pagination, onChangePage }) {
	const handleClick = (e, page) => {
		e.preventDefault();
		onChangePage(page);
	};

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination customer-pagination">
				<li className={`page-item ${!pagination.has_pre && 'disabled'}`}>
					<a
						className="page-link"
						href="#"
						aria-label="Previous"
						onClick={(e) => handleClick(e, pagination.current_page - 1)}
					>
						<span aria-hidden="true" className="material-symbols-outlined">
							arrow_back_ios_new
						</span>
					</a>
				</li>
				{Array.from({ length: pagination.total_pages }, (_, index) => (
					<li
						className={`page-item ${pagination.current_page === index + 1 && 'active'}`}
						key={`${index}_page`}
					>
						<a
							className="page-link"
							href="#"
							onClick={(e) => handleClick(e, index + 1)}
						>
							{index + 1}
						</a>
					</li>
				))}
				<li className={`page-item ${!pagination.has_next && 'disabled'}`}>
					<a
						className="page-link"
						href="#"
						aria-label="Next"
						onClick={(e) => handleClick(e, pagination.current_page + 1)}
					>
						<span aria-hidden="true" className="material-symbols-outlined">
							arrow_forward_ios
						</span>
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Pagination;
