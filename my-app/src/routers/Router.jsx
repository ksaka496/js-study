import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "../components/pages/Top";
import GitRanking from "../components/pages/GitRanking";
import FinancialRanking from "../components/pages/FinancialRanking";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Top />} />
					<Route path="GitRanking" element={<GitRanking />} />
					<Route path="FinancialRanking" element={<FinancialRanking />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
