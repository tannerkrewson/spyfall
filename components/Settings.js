import React, { useState, useEffect } from "react";

const Settings = ({ gameState, socket }) => {
	const { settings, AVAILABLE_LOCATION_PACKS } = gameState;
	const { timeLimit: serverMinutes, locationPack: serverPackId } = settings;

	return (
		<div>
			<TimeLimit
				onSetMinutes={(minutes) => socket.emit("setTimeLimit", minutes)}
				serverMinutes={serverMinutes}
			/>
			<br />
			<LocationPack
				onSetLocationPack={(packId) => socket.emit("setLocationPack", packId)}
				serverPackId={serverPackId}
				locationPackList={AVAILABLE_LOCATION_PACKS}
			/>
		</div>
	);
};

const TimeLimit = ({ onSetMinutes, serverMinutes }) => {
	const minLength = 0;
	const maxLength = 60;

	const [minutes, setMinutes] = useState(serverMinutes);
	const handleChange = (change) => () => {
		const newMinutes = minutes + change;
		if (newMinutes >= minLength && newMinutes <= maxLength) {
			setMinutes(newMinutes);
			onSetMinutes(newMinutes);
		}
	};

	useEffect(() => {
		setMinutes(serverMinutes);
	}, [serverMinutes]);

	return (
		<div>
			<label>Time Limit:</label>
			<div>
				<button
					className="btn-small"
					onClick={handleChange(-1)}
					disabled={minutes <= minLength}
				>
					-
				</button>
				<span>
					{minutes} minute{minutes !== 1 ? "s" : ""}
				</span>

				<button
					className="btn-small"
					onClick={handleChange(1)}
					disabled={minutes >= maxLength}
				>
					+
				</button>
				<style jsx>{`
					button {
						margin: 1em, 0;
						font-size: 1.5em;
					}
				`}</style>
			</div>
		</div>
	);
};

const LocationPack = ({
	onSetLocationPack,
	locationPackList,
	serverPackId,
}) => {
	const [selectedPackId, setSelectedPackId] = useState(serverPackId);

	const handleChange = (newPackId) => {
		setSelectedPackId(newPackId);
		onSetLocationPack(newPackId);
	};

	useEffect(() => {
		setSelectedPackId(serverPackId);
	}, [serverPackId]);

	return (
		<div>
			<label for="location-pack">Location Pack:</label>
			<select
				class="u-full-width"
				id="location-pack"
				value={selectedPackId}
				onChange={({ target: { value } }) => handleChange(value)}
			>
				{locationPackList.map(({ id, name }) => (
					<option value={id}>{name}</option>
				))}
			</select>
		</div>
	);
};

export default Settings;
