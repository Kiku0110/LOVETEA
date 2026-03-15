function OrderModal({
	modalType,
	templateOrder,
	handleModalInputChange,
	delOrder,
	closeModal,
	updateOrder,
}) {
	return (
		<>
			<div
				className="modal fade"
				id="orderModal"
				tabIndex="-1"
				aria-labelledby="orderModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content border-0">
						<div
							className={`modal-header bg-${modalType === 'delete' ? 'danger' : 'dark'} text-white`}
						>
							<h5 id="productModalLabel" className="modal-title">
								<span>
									{modalType === 'delete' ? '刪除' : '編輯'}
									訂單
								</span>
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							{modalType === 'delete' ? (
								<p className="fs-4">
									確定要刪除
									<span className="text-danger">{templateOrder.id}</span>
									這筆訂單嗎？
								</p>
							) : (
								<div className="row">
									<div className="col-sm-4">
										<div className="mb-2">
											<label htmlFor="id" className="form-label">
												訂單編號
											</label>
											<input
												type="text"
												id="id"
												name="id"
												className="form-control"
												placeholder="請輸入訂單編號"
												value={templateOrder.id}
												onChange={(e) => handleModalInputChange(e)}
											/>
										</div>
									</div>
									<div className="col-sm-8">
										<div className="mb-3">
											<label htmlFor="name" className="form-label">
												聯絡人
											</label>
											<input
												name="name"
												id="name"
												type="text"
												className="form-control"
												placeholder="請輸入聯絡人"
												value={templateOrder.user.name}
												onChange={(e) => handleModalInputChange(e)}
											/>
										</div>

										<div className="row">
											<div className="mb-3 col-md-6">
												<label htmlFor="tel" className="form-label">
													連絡電話
												</label>
												<input
													name="tel"
													id="tel"
													type="tel"
													className="form-control"
													placeholder="請輸入連絡電話"
													value={templateOrder.user.tel}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
											<div className="mb-3 col-md-6">
												<label htmlFor="address" className="form-label">
													聯絡地址
												</label>
												<input
													name="address"
													id="address"
													type="text"
													className="form-control"
													placeholder="請輸入聯絡地址"
													value={templateOrder.user.address}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
										</div>

										<div className="row">
											<div className="mb-3 col-md-6">
												<label htmlFor="email" className="form-label">
													Email
												</label>
												<input
													name="email"
													id="email"
													type="email"
													className="form-control"
													placeholder="請輸入 Email"
													value={templateOrder.user.email}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
											<div className="mb-3 col-md-6">
												<label htmlFor="payment" className="form-label">
													付款方式
												</label>
												<input
													name="payment"
													id="payment"
													type="text"
													className="form-control"
													placeholder="請輸入付款方式"
													value={templateOrder.user.payment}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
										</div>
										<hr />
										<div className="mb-3">
											<div className="form-check">
												<input
													name="is_paid"
													id="is_paid"
													className="form-check-input"
													type="checkbox"
													checked={templateOrder.is_paid}
													onChange={(e) => handleModalInputChange(e)}
												/>
												<label className="form-check-label" htmlFor="is_paid">
													是否付款
												</label>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
						<div className="modal-footer">
							{modalType === 'delete' ? (
								<button
									type="button"
									className="btn btn-sm btn-outline-danger"
									onClick={() => delOrder(templateOrder.id)}
								>
									刪除
								</button>
							) : (
								<>
									<button
										type="button"
										className="btn btn-outline-secondary"
										data-bs-dismiss="modal"
										onClick={() => closeModal()}
									>
										取消
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => updateOrder(templateOrder.id)}
									>
										確認
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default OrderModal;
