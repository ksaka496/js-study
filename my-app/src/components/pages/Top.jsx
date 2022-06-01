import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Top = () => {
	// アドバイスURL
	const adviceUrl = "https://api.adviceslip.com/advice";
	// 翻訳URL
	const translateUrl =
		"https://ho25j6wrh5tl7vni4t5vvgax3q0tgyhp.lambda-url.ap-northeast-1.on.aws?input_text=";
	// API実行時管理state
	const [onExecution, setOnExecution] = useState(false);
	// アドバイス（原文）state
	const [advice, setAdvice] = useState("");
	// アドバイス（原文）
	let adviceStr = "";
	// アドバイス（訳分）state
	const [adviceTranslate, setAdviceTranslate] = useState("");
	// 検索実行
	const onClickSearch = async () => {
		setOnExecution(true);
		await getEnAdvice();
		await trancelateJa(adviceStr);
		setOnExecution(false);
	};

	// 英語アドバイス取得
	const getEnAdvice = async () => {
		try {
			await axios.get(adviceUrl).then((response) => {
				const adviceStrAPI = response.data.slip.advice;
				setAdvice(adviceStrAPI);
				adviceStr = adviceStrAPI;
			});
		} catch (e) {
			console.log(e);
		} finally {
		}
	};

	// 日本語へ翻訳
	const trancelateJa = async (str) => {
		const getTranslateUrl = translateUrl + str;
		try {
			await axios.get(getTranslateUrl).then((response) => {
				setAdviceTranslate(response.data.output_text);
			});
		} catch (e) {
			console.log(e);
		} finally {
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
					<div className="row pt-5 d-flex justify-content-center">
						<div className="col-5">
							<label className="form-label h4">英語でアドバイス</label>
							<br />
							<label className="form-label h5">
								ランダムで英語アドバイスがもらえるよ
							</label>
						</div>
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
					<span>
						<div className="pt-3">{advice}</div>
						<div className="pt-3">{adviceTranslate}</div>
					</span>
				)}
			</div>
			{/* start GitRanking */}
			<Link to={"GitRanking"} className="link-primary">
				GitRanking
			</Link>
		</>
	);
};

export default Top;
