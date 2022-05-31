import React, { useState } from "react";
import axios from "axios";

const Top = () => {
	// アドバイスURL
	const adviceUrl = "https://api.adviceslip.com/advice";
	// API実行時管理state
	const [onExecution, setOnExecution] = useState(false);
	// アドバイスstate
	const [advice, setAdvice] = useState("");
	// 検索実行
	const onClickSearch = async () => {
		setOnExecution(true);
		try {
			console.log(onExecution);
			await axios.get(adviceUrl).then((response) => {
				setAdvice(response.data.slip.advice);
			});
		} catch (e) {
			alert(e);
		} finally {
			setOnExecution(false);
		}
	};
	return (
		<>
			<div className="container-fluid pt-5">
				<div className="row pt-5">
					<div className="col  ">
						<div className="display-4">いろいろ検索</div>
					</div>
				</div>
				<div className="row pt-5 d-flex justify-content-center">
					<div className="col-3 ">
						<label className="form-label h4">検索したい言葉</label>
						<input
							className="form-control mt-1"
							type="text"
							name="searchText"
							id="searchText"
							placeholder="コード or 会社名"
						/>
					</div>
				</div>

				<div className="row pt-3 d-flex justify-content-center">
					<div className="col-3 ">
						<button
							type="button"
							className="btn btn-primary"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
						>
							！Search！
						</button>
					</div>
					<div className="row pt-3 d-flex justify-content-center">
						<div className="col">
							<button
								type="button"
								className="btn btn-primary"
								onClick={onClickSearch}
							>
								Get Advice
							</button>
						</div>
					</div>
					<div
						className="modal fade"
						id="exampleModal"
						tabIndex="-1"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">
										確認
									</h5>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
									></button>
								</div>
								<div className="modal-body">～を検索します。</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										data-bs-dismiss="modal"
										// ref={useRef}
									>
										やめる
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={onClickSearch}
									>
										続ける
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* row end */}
				</div>
				{onExecution ? (
					<div className="spinner-border text-primary mt-3" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				) : (
					<div className="pt-3">{advice}</div>
				)}
			</div>
		</>
	);
};

export default Top;
