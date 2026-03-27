import person1 from '../../../assets/images/home/person-1.jpg';
import person2 from '../../../assets/images/home/person-2.jpg';
import person3 from '../../../assets/images/home/person-3.jpg';

function CraftSection() {
	const craftPerson = [
		{
			id: 1,
			name: '林橙心',
			title: '東方茶器美學工藝師',
			image: person1,
		},
		{
			id: 2,
			name: '佐藤悠',
			title: '日本​當代​茶道​生活​設計師',
			image: person2,
		},
		{
			id: 3,
			name: 'Matteo Rossi',
			title: '東方​茶​文化​跨界​設計​師',
			image: person3,
		},
	];

	return (
		<>
			<section className="py-md-11 py-7">
				<div className="container">
					{/* Desktop */}
					<div className="mb-9 d-none d-md-block">
						<h2 className="text-secondary-300">職人茶器，</h2>
						<h2 className="text-secondary-100">美好茶生活的創造者</h2>
					</div>
					{/* Mobile */}
					<div className="mb-6 d-block d-md-none">
						<h3 className="text-secondary-300">職人茶器，</h3>
						<h3 className="text-secondary-100">美好茶生活的創造者</h3>
					</div>
					<div className="row row-gap-3">
						{craftPerson.map((person) => (
							<div className="col-md-4" key={person.id}>
								<div className="card customer-card">
									<img
										src={person.image}
										className="card-img-top rounded-circle"
										alt={person.name}
										decoding="async"
										loading="lazy"
									/>
									<div className="card-body">
										<h5 className="card-title">{person.name}</h5>
										<p className="card-text">{person.title}</p>
									</div>
									<div className="vertical-line"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default CraftSection;
