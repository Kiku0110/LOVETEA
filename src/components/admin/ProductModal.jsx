import { useEffect, useRef } from 'react';

function ProductModal({
	modalType,
	templateProduct,
	handleModalInputChange,
	handleModalImageChange,
	handleAddImage,
	handleDeleteImage,
	updateProduct,
	delProduct,
	uploadImage,
	closeModal,
	handleModalSizeChange,
	handleAddSize,
	handleDeleteSize,
	handleModalColorChange,
	handleAddColor,
	handleDeleteColor,
}) {
	const fileInputRef = useRef(null);
	const resetFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};
	const handleFileChange = async (e) => {
		await uploadImage(e); // 等待執行父元件傳來的 uploadImage
		resetFileInput(); // 上傳成功清除 input 文字
	};
	useEffect(() => {
		resetFileInput(); // 切換不同產品或開啟新視窗時呼叫
	}, [templateProduct.id]); // 監聽產品 ID，ID 變了就代表換產品了
	return (
		<>
			<div
				className="modal fade"
				id="productModal"
				tabIndex="-1"
				aria-labelledby="productModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-xl">
					<div className="modal-content border-0">
						<div
							className={`modal-header bg-${modalType === 'delete' ? 'danger' : 'dark'} text-white`}
						>
							<h5 id="productModalLabel" className="modal-title">
								<span>
									{modalType === 'delete'
										? '刪除'
										: modalType === 'edit'
											? '編輯'
											: '新增'}
									產品
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
									<span className="text-danger">{templateProduct.title}</span>
									嗎？
								</p>
							) : (
								<div className="row">
									<div className="col-sm-4">
										<div className="mb-2">
											<div className="mb-3">
												<label htmlFor="fileUpload" className="form-label">
													上傳圖片檔案
												</label>
												<input
													className="form-control"
													type="file"
													ref={fileInputRef}
													name="fileUpload"
													id="fileUpload"
													accept=".jpg,.jpeg,.png"
													onChange={(e) => handleFileChange(e)}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="imageUrl" className="form-label">
													輸入圖片網址
												</label>
												<input
													type="text"
													id="imageUrl"
													name="imageUrl"
													className="form-control"
													placeholder="請輸入圖片連結"
													value={templateProduct.imageUrl}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
											{/* 判斷是否有圖片的值 */}
											{templateProduct.imageUrl && (
												<img
													className="img-fluid"
													src={templateProduct.imageUrl}
													alt="主圖"
												/>
											)}
										</div>
										<div>
											{templateProduct.imagesUrl.map((url, index) => (
												<div key={index}>
													<label htmlFor="imageUrl" className="form-label">
														輸入圖片網址
													</label>
													<input
														type="text"
														className="form-control"
														placeholder={`圖片網址${index + 1}`}
														value={url}
														onChange={(e) =>
															handleModalImageChange(index, e.target.value)
														}
													/>
													{url && (
														<img
															className="img-fluid"
															src={url}
															alt={`副圖${index + 1}`}
														/>
													)}
												</div>
											))}
											<button
												className="btn btn-outline-primary btn-sm d-block w-100"
												onClick={() => handleAddImage()}
											>
												新增圖片
											</button>
										</div>
										<div>
											<button
												className="btn btn-outline-danger btn-sm d-block w-100"
												onClick={() => handleDeleteImage()}
											>
												刪除圖片
											</button>
										</div>
									</div>
									<div className="col-sm-8">
										<div className="mb-3">
											<label htmlFor="title" className="form-label">
												標題
											</label>
											<input
												name="title"
												id="title"
												type="text"
												className="form-control"
												placeholder="請輸入標題"
												value={templateProduct.title}
												onChange={(e) => handleModalInputChange(e)}
											/>
										</div>
										{/* 分類、單位 */}
										<div className="row">
											<div className="mb-3 col-md-6">
												<label htmlFor="category" className="form-label">
													分類
												</label>
												<input
													name="category"
													id="category"
													type="text"
													className="form-control"
													placeholder="請輸入分類"
													value={templateProduct.category}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
											<div className="mb-3 col-md-6">
												<label htmlFor="unit" className="form-label">
													單位
												</label>
												<input
													name="unit"
													id="unit"
													type="text"
													className="form-control"
													placeholder="請輸入單位"
													value={templateProduct.unit}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
										</div>
										{/* 系列、材質 */}
										<div className="row">
											<div className="mb-3 col-md-6">
												<label htmlFor="series" className="form-label">
													系列
												</label>
												<input
													name="series"
													id="series"
													type="text"
													className="form-control"
													placeholder="請輸入系列"
													value={templateProduct.series}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
											<div className="mb-3 col-md-6">
												<label htmlFor="material" className="form-label">
													材質
												</label>
												<input
													name="material"
													id="material"
													type="text"
													className="form-control"
													placeholder="請輸入材質"
													value={templateProduct.material}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
										</div>
										{/* 耐熱、產地 */}
										<div className="row">
											<div className="mb-3 col-md-6">
												<label htmlFor="heat_resistance" className="form-label">
													耐熱
												</label>
												<input
													name="heat_resistance"
													id="heat_resistance"
													type="text"
													className="form-control"
													placeholder="請輸入耐熱範圍"
													value={templateProduct.heat_resistance}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
											<div className="mb-3 col-md-6">
												<label htmlFor="origin" className="form-label">
													產地
												</label>
												<input
													name="origin"
													id="origin"
													type="text"
													className="form-control"
													placeholder="請輸入產地"
													value={templateProduct.origin}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
										</div>
										{/* 原價、售價 */}
										<div className="row">
											<div className="mb-3 col-md-6">
												<label htmlFor="origin_price" className="form-label">
													原價
												</label>
												<input
													name="origin_price"
													id="origin_price"
													type="number"
													min="0"
													className="form-control"
													placeholder="請輸入原價"
													value={templateProduct.origin_price}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
											<div className="mb-3 col-md-6">
												<label htmlFor="price" className="form-label">
													售價
												</label>
												<input
													name="price"
													id="price"
													type="number"
													min="0"
													className="form-control"
													placeholder="請輸入售價"
													value={templateProduct.price}
													onChange={(e) => handleModalInputChange(e)}
												/>
											</div>
										</div>
										<hr />
										{/* 尺寸、顏色 */}
										<div className="row">
											<div className="mb-3 col-md-6">
												<label className="form-label d-flex justify-content-between align-items-center">
													尺寸
													<button
														type="button"
														className="btn btn-outline-primary btn-sm"
														onClick={handleAddSize} // 新增尺寸
													>
														+ 新增尺寸
													</button>
												</label>
												{/* 使用 map 渲染陣列中的每一個尺寸 */}
												{templateProduct.sizes.map((size, index) => (
													<div key={index} className="input-group mb-2">
														<input
															type="text"
															className="form-control"
															placeholder={`尺寸 ${index + 1}`}
															value={size}
															onChange={(e) =>
																handleModalSizeChange(index, e.target.value)
															} // 處理特定 index 的更新
														/>
														<button
															className="btn btn-outline-danger"
															type="button"
															onClick={() => handleDeleteSize(index)} // 刪除特定 index
														>
															刪除
														</button>
													</div>
												))}
											</div>
											<div className="mb-3 col-md-6">
												<label className="form-label d-flex justify-content-between align-items-center">
													顏色
													<button
														type="button"
														className="btn btn-outline-primary btn-sm"
														onClick={handleAddColor} // 新增顏色
													>
														+ 新增顏色
													</button>
												</label>

												{templateProduct.colors.map((color, index) => (
													<div key={index} className="input-group mb-2">
														<input
															type="text"
															className="form-control"
															placeholder={`顏色 ${index + 1}`}
															value={color}
															onChange={(e) =>
																handleModalColorChange(index, e.target.value)
															}
														/>
														<button
															className="btn btn-outline-danger"
															type="button"
															onClick={() => handleDeleteColor(index)}
														>
															刪除
														</button>
													</div>
												))}
											</div>
										</div>
										<hr />
										{/* 產品描述 */}
										<div className="mb-3">
											<label htmlFor="description" className="form-label">
												產品描述
											</label>
											<textarea
												name="description"
												id="description"
												className="form-control"
												placeholder="請輸入產品描述"
												value={templateProduct.description}
												onChange={(e) => handleModalInputChange(e)}
											></textarea>
										</div>
										{/* 說明內容 */}
										<div className="mb-3">
											<label htmlFor="content" className="form-label">
												說明內容
											</label>
											<textarea
												name="content"
												id="content"
												className="form-control"
												placeholder="請輸入說明內容"
												value={templateProduct.content}
												onChange={(e) => handleModalInputChange(e)}
											></textarea>
										</div>
										{/* 注意事項 */}
										<div className="mb-3">
											<label htmlFor="notices" className="form-label">
												注意事項
											</label>
											<textarea
												name="notices"
												id="notices"
												className="form-control"
												placeholder="請輸入注意事項"
												value={templateProduct.notices}
												onChange={(e) => handleModalInputChange(e)}
											></textarea>
										</div>
										{/* 是否啟用 */}
										<div className="mb-3">
											<div className="form-check">
												<input
													name="is_enabled"
													id="is_enabled"
													className="form-check-input"
													type="checkbox"
													checked={templateProduct.is_enabled}
													onChange={(e) => handleModalInputChange(e)}
												/>
												<label
													className="form-check-label"
													htmlFor="is_enabled"
												>
													是否啟用
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
									className="btn btn-danger"
									onClick={() => delProduct(templateProduct.id)}
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
										onClick={() => updateProduct(templateProduct.id)}
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

export default ProductModal;
