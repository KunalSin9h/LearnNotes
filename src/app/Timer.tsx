import React, { useState, useEffect } from "react";

const Timer = () => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [hr, setHr] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			if (seconds === 60) {
				setMinutes((m) => m + 1);
				setSeconds(0);
			}
			if (minutes === 60) {
				setHr((h) => (h += 1));
				setMinutes(0);
			}

			setSeconds((s) => s + 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [minutes, seconds]);

	return (
		<div>
			<h1>{`${hr.toString().padStart(2, "0")}:${minutes
				.toString()
				.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</h1>
		</div>
	);
};

export default Timer;
