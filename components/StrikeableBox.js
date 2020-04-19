import React, { useState } from "react";

const StrikeableBox = ({ children }) => {
	const [striked, setStriked] = useState(false);
	return (
		<li>
			<div
				className={"box" + (striked ? "-striked" : "")}
				onClick={() => setStriked(!striked)}
			>
				{children}
			</div>
		</li>
	);
};

export default StrikeableBox;
