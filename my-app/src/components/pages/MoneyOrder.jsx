import React, { useState } from "react";
import axios from "axios";
import * as Config from "../../config/Config";
import {
	VictoryAxis,
	VictoryChart,
	VictoryCandlestick,
	VictoryTheme,
	VictoryZoomContainer,
	VictoryCursorContainer,
} from "victory";
import moment from "moment";

const MoneyOrder = () => {
	// state
	const [data, setData] = useState();
	// FinancialAPI
	const fpmAPI = `https://financialmodelingprep.com/api/v3/historical-chart/`;

	const handleChange = async (event) => {
		await onClickSearch();
	};

	const onClickSearch = async () => {
		const fpmAPIUrl = `${fpmAPI}5min/USDJPY?apikey=${Config.key}`;
		console.log(fpmAPIUrl);
		try {
			await axios.get(fpmAPIUrl).then((response) => {
				setData(response.data);
			});
		} catch (e) {
			console.log(e);
		} finally {
		}
	};

	return (
		<div className="content">
			<select
				className="form-select"
				aria-label="Default select example"
				onChange={handleChange}
			>
				<option defaultValue={"選んでください"}>チャート</option>
				<option value="1分">１分足</option>
			</select>
			<VictoryChart
				containerComponent={<VictoryZoomContainer />}
				scale={{ x: "time" }}
				// domainPadding={{ x: 25 }}
				// theme={VictoryTheme.material}
			>
				<VictoryAxis dependentAxis />
				<VictoryAxis
					tickFormat={(t) => moment(t).format("YYYY-MM-DD HH:mm:ss")}
				/>
				<VictoryCandlestick
					candleColors={{ positive: "#c43a31", negative: "#2f8be0" }}
					data={data}
				/>
			</VictoryChart>
		</div>
	);
};

export default MoneyOrder;
