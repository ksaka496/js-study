import React, { useMemo, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import * as Config from "../../config/Config";

const FinancialRanking = () => {
	// FinancialAPI
	const fpmAPI = `https://financialmodelingprep.com/api/v3/ratios/AAPL?limit=120&apikey=${Config.key}`;
	// 言語セレクトボックス
	const [ticker, settTicker] = useState();
	// セレクトボックス変更用
	const handleChange = (event) => {
		settTicker(event.target.value);
	};
	// gitスター表示用row
	const [gitRow, setGitRow] = useState("");
	const [gitColumnDefs] = useState([
		{ field: "symbol", headerName: "シンボル" },
		{ field: "date", headerName: "決算発表日" },
		{ field: "currentRatio", headerName: "レシオ" },
		{ field: "language", headerName: "言語", editable: true },
	]);
	// 列用
	const defaultColDef = useMemo(
		() => ({
			resizable: true,
			editable: true,
			sortable: true,
			flex: 1,
			filter: true,
		}),
		[]
	);
	// row整形用
	// const makeGitRow = (items) => {
	// 	setGitRow(items);
	// };
	// 検索実行
	const onClickSearch = async () => {
		try {
			await axios.get(fpmAPI).then((response) => {
				const fmpItems = response.data;
				console.table(fmpItems);
				setGitRow(fmpItems);
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
						<div className="display-4">米国企業分析</div>
					</div>
				</div>
				<div className="row pt-5 d-flex justify-content-center">
					<div className="col-3 ">
						<label className="form-label h4">検索したい米国企業</label>
						<input
							className="form-control mt-1"
							type="text"
							name="searchText"
							id="searchText"
							placeholder="コード or 会社名"
							onChange={handleChange}
							value={ticker}
						/>
					</div>
				</div>

				<div className="row pt-3 d-flex justify-content-center">
					<div className="col-3 ">
						<button
							type="button"
							className="btn btn-primary"
							onClick={onClickSearch}
						>
							！Search！
						</button>
					</div>
				</div>
				<div className="row pt-3 d-flex justify-content-center">
					<div className="col-6">
						<div
							className="ag-theme-alpine"
							style={{ height: 600, width: 1000 }}
						>
							<AgGridReact
								rowData={gitRow}
								columnDefs={gitColumnDefs}
								defaultColDef={defaultColDef}
								pagination={true}
							></AgGridReact>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FinancialRanking;
