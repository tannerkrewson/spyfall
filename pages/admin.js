import React, { useState } from "react";

const Admin = () => {
	const [status, setStatus] = useState();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log("on sumbit");
		setLoading(true);
		const res = await fetch(window.location.origin + "/lock", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ password: event.target.password.value }),
		});
		setLoading(false);
		setStatus(res.status + " " + res.statusText);
	};
	return (
		<>
			{!status && !loading && (
				<form onSubmit={onSubmit}>
					<label>
						Password:
						<input type="text" name="password" />
					</label>
					<input type="submit" value="Lock New Games and Rounds" />
				</form>
			)}
			{loading && <div>Sending...</div>}
			{status && <div>Response: {status}</div>}
		</>
	);
};

export default Admin;
