import React, { useMemo, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const GitRanking = () => {
	// gitスター取得API
	const gitStarAPI =
		"https://api.github.com/search/repositories?q=stars:%3E1&s=stars&type=Repositories";
	// 言語セレクトボックス
	const [language, setLanguage] = useState();
	// セレクトボックス変更用
	const handleChange = (event) => {
		setLanguage(event.target.value);
	};
	// gitスター表示用row
	const [gitRow, setGitRow] = useState("");
	const [gitColumnDefs] = useState([
		{ field: "name", headerName: "名前" },
		{ field: "full_name", headerName: "フルネーム" },
		{ field: "stargazers_count", headerName: "スター数" },
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
			await axios.get(gitStarAPI).then((response) => {
				const gitStarItems = response.data.items;
				console.table(gitStarItems);
				setGitRow(gitStarItems);
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
						<div className="display-4">Git star ランキング</div>
					</div>
				</div>
				<div className="row pt-5 d-flex justify-content-center">
					<div className="col-3 ">
						<label className="form-label h4">検索したい言語</label>
						<select
							className="form-select"
							aria-label="select"
							value={language}
							onChange={handleChange}
						>
							<option defaultValue value="0">
								全部
							</option>
							<option value="1">Java Script</option>
							<option value="2">Python</option>
							<option value="3">C</option>
						</select>
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

export default GitRanking;
