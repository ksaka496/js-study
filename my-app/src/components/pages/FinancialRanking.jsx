import React, { useMemo, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import * as Config from "../../config/Config";

const FinancialRanking = () => {
	// FinancialAPI
	const fpmAPI = `https://financialmodelingprep.com/api/v3/income-statement/`;
	// 言語セレクトボックス
	const [ticker, settTicker] = useState();
	const tikerControl = async (value) => {
		settTicker(value);
	};
	let selectTiker = "";
	// セレクトボックス変更用
	const handleChange = async (event) => {
		await tikerControl(event.target.value);
		selectTiker = event.target.value;
		await onClickSearch(selectTiker);
	};
	// 表示用state
	const [sales, setSales] = useState("-");
	const [costOfRevenue, setCostOfRevenue] = useState("-");
	const [grossProfit, setGrossProfit] = useState("-");
	const [grossProfitRatio, setGrossProfitRatio] = useState("-");
	// ticker
	const tickers = {
		AMZN: "AMZN",
		AAPL: "AAPL",
		MSFT: "MSFT",
		META: "META",
		NFLX: "NFLX",
	};
	// gitスター表示用row
	const [gitRow, setGitRow] = useState("");
	const [gitColumnDefs] = useState([
		{ field: "symbol", headerName: "シンボル" },
		{ field: "date", headerName: "決算発表日" },
		{ field: "revenue", headerName: "売上高" },
		{ field: "costOfRevenue", headerName: "収益コスト" },
		{ field: "grossProfit", headerName: "売上総利益", editable: true },
		{ field: "grossProfitRatio", headerName: "売上利益率", editable: true },
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
	const onClickSearch = async (selectTiker) => {
		const fpmAPIUrl = `${fpmAPI}${selectTiker}?limit=480&apikey=${Config.key}`;
		console.log(fpmAPIUrl);
		try {
			await axios.get(fpmAPIUrl).then((response) => {
				const fmpItems = response.data;
				console.table(fmpItems);
				setSales(fmpItems[0].revenue.toLocaleString());
				setGrossProfit(fmpItems[0].grossProfit.toLocaleString());
				setCostOfRevenue(fmpItems[0].costOfRevenue.toLocaleString());
				setGrossProfitRatio(fmpItems[0].grossProfitRatio.toLocaleString());
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
					<div className="col-sm-3">
						<label className="form-label h4">検索したい米国企業</label>
						<select
							className="form-select"
							aria-label="Default select example"
							onChange={handleChange}
						>
							<option selected disabled>
								GAFAM銘柄
							</option>
							<option value={tickers.AMZN}>Amazon(AMZN)</option>
							<option value={tickers.AAPL}>Apple(AAPL)</option>
							<option value={tickers.MSFT}>MicroSoft(MSFT)</option>
							<option value={tickers.META}>Meta(META)</option>
							<option value={tickers.NFLX}>Netflix(NFLX)</option>
						</select>
					</div>
				</div>
				<div className="row pt-3 d-flex justify-content-center">
					<div className="col-12">
						<button
							type="button"
							className="btn btn-primary"
							onClick={onClickSearch}
						>
							！Search！
						</button>
					</div>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col pt-5 d-flex justify-content-center">
						<div className="card" style={{ width: "18rem" }}>
							<div className="card-body">
								<h3 className="card-title">シンボル</h3>
								<h6 className="card-subtitle mb-2 text-muted">Symbol</h6>
								<p className="h2 card-text">{ticker}</p>
								{ticker === tickers.AMZN ? (
									<i class="fa-brands fa-amazon fa-3x"></i>
								) : ticker === tickers.AAPL ? (
									<i className="fa-brands  fa-apple fa-3x"></i>
								) : ticker === tickers.MSFT ? (
									<i class="fa-brands fa-microsoft  fa-3x"></i>
								) : ticker === tickers.META ? (
									<i class="fa-solid fa-thumbs-up  fa-3x"></i>
								) : null}
							</div>
						</div>
					</div>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col pt-5 d-flex justify-content-center">
						<div className="card" style={{ width: "18rem" }}>
							<div className="card-body">
								<h3 className="card-title">売上高</h3>
								<h6 className="card-subtitle mb-2 text-muted">Sales Revenue</h6>
								<p className="h2 card-text">{sales}</p>
								<i className="fa-solid fa-dollar-sign fa-2x"></i>
							</div>
						</div>
					</div>
					<div className="col pt-5 d-flex justify-content-center">
						<div className="card" style={{ width: "18rem" }}>
							<div className="card-body">
								<h3 className="card-title">収益コスト</h3>
								<h6 className="card-subtitle mb-2 text-muted">
									Cost of Revenue
								</h6>
								<p className="h2 card-text">{costOfRevenue}</p>
								<i className="fa-solid fa-dollar-sign fa-2x"></i>
							</div>
						</div>
					</div>
					<div className="col pt-5 d-flex justify-content-center">
						<div className="card" style={{ width: "18rem" }}>
							<div className="card-body">
								<h3 className="card-title">売上総利益</h3>
								<h6 className="card-subtitle mb-2 text-muted">Gross Profit</h6>
								<p className="h2 card-text">{grossProfit}</p>
								<i className="fa-solid fa-dollar-sign fa-2x"></i>
							</div>
						</div>
					</div>

					<div className="col pt-5 d-flex justify-content-center">
						<div className="card" style={{ width: "18rem" }}>
							<div className="card-body">
								<h3 className="card-title">売上利益率</h3>
								<h6 className="card-subtitle mb-2 text-muted">
									grossProfitRatio
								</h6>
								<p className="h2 card-text">{grossProfitRatio}</p>
								<i class="fa-solid fa-percent fa-2x"></i>
							</div>
						</div>
					</div>
				</div>

				<div className="row pt-3 d-flex justify-content-center">
					<div className="col-12  d-flex justify-content-center">
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
