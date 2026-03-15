function Select({ title, id, options = [], value, onChange }) {
	return (
		<>
			<div className="d-flex justify-content-between align-items-center">
				<p className="fw-light text-secondary-100">{title}</p>
				<div className="input-group customer-inputGroup">
					<select
						className="form-select shadow-none"
						id={id}
						value={value}
						onChange={(e) => {
							// newOption 為資料內容 options，判斷其資料型態是否為 number
							const newOption =
								typeof value === 'number'
									? Number(e.target.value)
									: e.target.value;
							onChange(newOption);
						}}
					>
						{options.map((opt, index) => (
							<option key={index} value={opt.value} className="fw-light">
								{opt.label}
							</option>
						))}
					</select>
					<label className="input-group-text" htmlFor={id}>
						<span className="material-symbols-outlined">
							keyboard_arrow_down
						</span>
					</label>
				</div>
			</div>
		</>
	);
}

export default Select;
