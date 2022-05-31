import React from "react";

const Top = () => {
	return (
		<>
			<div className="container-fluid pt-5">
				<div className="row pt-5">
					<div className="col  ">
						<h1 className="h1">いろいろ検索</h1>
					</div>
				</div>
				<div className="row pt-5 justyfy-content-center">
					<div className="col-2 ">
						<label for="exampleInputEmail1" class="form-label">
							検索したい言葉
						</label>
						<input className="form-control" type="text" name="" id="" />
					</div>
				</div>
			</div>
		</>
	);
};

export default Top;
