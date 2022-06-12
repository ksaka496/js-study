import React, { useMemo, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import * as Config from "../../config/Config";
import Sidebar from "./Sidebar";
import LineSample from "./LineSample";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const FinancialRanking = () => {
	const fmt = new Intl.NumberFormat("ja-JP", {
		notation: "compact",
	});
	// FinancialAPI
	const fpmAPI = `https://financialmodelingprep.com/api/v3/income-statement/`;
	const yen = 130;
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
	const [salesYen, setSalesYen] = useState("-");
	const [costOfRevenue, setCostOfRevenue] = useState("-");
	const [costOfRevenueYen, setCostOfRevenueYen] = useState("-");
	const [grossProfit, setGrossProfit] = useState("-");
	const [grossProfitYen, setGrossProfitYen] = useState("-");
	const [grossProfitRatio, setGrossProfitRatio] = useState("-");
	const [dateData, seDateData] = useState([]);
	const [initialData, setInitialData] = useState(false);
	const [revenueData, setRevenueData] = useState([]);
	// ticker
	const tickers = {
		AMZN: "AMZN",
		AAPL: "AAPL",
		MSFT: "MSFT",
		META: "META",
		NFLX: "NFLX",
	};
	// グラフ用
	// let dateData = [];
	// let revenueData = [];
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
	/**
	 *
	 * @param {selectTiker} selectTiker
	 */
	const onClickSearch = async (selectTiker) => {
		await getDollYen();
		const fpmAPIUrl = `${fpmAPI}${selectTiker}?limit=120&apikey=${Config.key}`;
		console.log(fpmAPIUrl);
		try {
			await axios.get(fpmAPIUrl).then((response) => {
				const fmpItems = response.data;
				seDateData(
					fmpItems.map((item, index) => (dateData[index] = item.date)).reverse()
				);
				console.log(dateData);
				setRevenueData(
					fmpItems
						.map((item, index) => (revenueData[index] = item.revenue))
						.reverse()
				);
				console.log(revenueData);

				console.table(fmpItems);
				setSales(fmpItems[0].revenue.toLocaleString());
				setSalesYen(fmt.format(fmpItems[0].revenue * yen).toLocaleString());
				setGrossProfit(fmpItems[0].grossProfit.toLocaleString());
				setGrossProfitYen(
					fmt.format(fmpItems[0].grossProfit * yen).toLocaleString()
				);
				setCostOfRevenue(fmpItems[0].costOfRevenue.toLocaleString());
				setCostOfRevenueYen(
					fmt.format(fmpItems[0].costOfRevenue * yen).toLocaleString()
				);
				setGrossProfitRatio(
					fmpItems[0].grossProfitRatio.toLocaleString() * 100
				);
				setGitRow(fmpItems);
				setInitialData(true);
			});
		} catch (e) {
			console.log(e);
		} finally {
		}
	};

	const getDollYen = async () => {
		const url = "https://www.gaitameonline.com/rateaj/getrate";
		try {
			await axios.get(url).then((response) => {
				console.log(response.data);
			});
		} catch (e) {
			console.log(e);
		} finally {
		}
	};

	const linedata = {
		labels: dateData,
		datasets: [
			{
				label: "My First dataset",
				data: revenueData,
			},
		],
	};

	return (
		<>
			<div className="container-fluid pt-3">
				<div className="row pt-3">
					<div className="col  ">
						<div className="display-4">米国企業分析</div>
					</div>
				</div>
				<div className="row pt-3 d-flex justify-content-center">
					<div className="col-sm-3">
						<label className="form-label h4">検索したい米国企業</label>
						<select
							className="form-select"
							aria-label="Default select example"
							onChange={handleChange}
						>
							<option defaultValue={"GAFAM銘柄"} disabled>
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
				{/* <div className="row pt-3 d-flex justify-content-center">
					<div className="col-12">
						<button
							type="button"
							className="btn btn-primary"
							onClick={onClickSearch}
						>
							！Search！
						</button>
					</div>
				</div> */}
				<div className="row d-flex justify-content-center">
					<div className="col pt-3 d-flex justify-content-center">
						<div
							className="card border border-3 rounded-3 shadow"
							style={{ width: "18rem" }}
						>
							<div className="card-body">
								<h3 className="card-title">シンボル</h3>
								<h6 className="card-subtitle mb-2 text-muted">Symbol</h6>
								<p className="h2 card-text">{ticker}</p>
								{ticker === tickers.AMZN ? (
									<i className="fa-brands fa-amazon fa-3x"></i>
								) : ticker === tickers.AAPL ? (
									<i className="fa-brands  fa-apple fa-3x"></i>
								) : ticker === tickers.MSFT ? (
									<i className="fa-brands fa-microsoft  fa-3x"></i>
								) : ticker === tickers.META ? (
									<i className="fa-solid fa-thumbs-up  fa-3x"></i>
								) : null}
							</div>
						</div>
					</div>
				</div>
				<div className="row d-flex justify-content-center">
					<div className="col pt-3 d-flex justify-content-center">
						<div
							className="card border border-3 shadow"
							style={{ width: "22rem" }}
						>
							<div className="card-body">
								<h3 className="card-title">売上高</h3>
								<h6 className="card-subtitle mb-2 text-muted">Sales Revenue</h6>
								<p className="h2 card-text">
									<i className="fa-solid fa-dollar-sign"></i>
									{sales}
								</p>
								<p className="h2 card-text">
									<i class="fa-solid fa-yen-sign"></i>
									{salesYen}
								</p>
							</div>
						</div>
					</div>
					<div className="col pt-3 d-flex justify-content-center">
						<div
							className="card border border-3 shadow rounded"
							style={{ width: "20rem" }}
						>
							<div className="card-body">
								<h3 className="card-title">収益コスト</h3>
								<h6 className="card-subtitle mb-2 text-muted">
									Cost of Revenue
								</h6>
								<p className="h2 card-text">
									<i className="fa-solid fa-dollar-sign"></i>
									{costOfRevenue}
								</p>
								<p className="h2 card-text">
									<i class="fa-solid fa-yen-sign"></i>
									{costOfRevenueYen}
								</p>
							</div>
						</div>
					</div>
					<div className="col pt-3 d-flex justify-content-center">
						<div
							className="card rounded-start border border-3 "
							style={{ width: "20rem" }}
						>
							<div className="card-body shadow">
								<h3 className="card-title">売上総利益</h3>
								<h6 className="card-subtitle mb-2 text-muted">Gross Profit</h6>
								<p className="h2 card-text">
									<i className="fa-solid fa-dollar-sign"></i>
									{grossProfit}
								</p>
								<p className="h2 card-text">
									<i class="fa-solid fa-yen-sign"></i>
									{grossProfitYen}
								</p>
							</div>
						</div>
					</div>

					<div className="col pt-3 d-flex justify-content-center">
						<div
							className="card border border-3 shadow"
							style={{ width: "20rem" }}
						>
							<div className="card-body">
								<h3 className="card-title">売上利益率</h3>
								<h6 className="card-subtitle mb-2 text-muted">
									grossProfitRatio
								</h6>
								<p className="h2 card-text">
									{grossProfitRatio}
									<i className="fa-solid fa-percent"></i>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="row pt-3 d-flex justify-content-center">
					<div className="col-5  d-flex justify-content-center">
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
					<div className="col-5">
						<div className="card border border-3 shadow">
							<div className="card-body">
								<h3 className="card-title">売上高推移</h3>
								<h6 className="card-subtitle mb-2 text-muted">
									grossProfitRatio
								</h6>
								<Line data={linedata} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div className="row d-flex justify-content-center">
					<div className="col-6">
						<h2>売上高推移</h2>
						<Line data={linedata} />
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center">
				<div className="col-6">
					{initialData === true ? console.log(dateData) : null}
				</div>
			</div>
		</>
	);
};

export default FinancialRanking;
