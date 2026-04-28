function addLeadingZeroes(val: number, totalDigits: number) {
	return (10 ** totalDigits + val).toString().slice(1); // (val: 123, totalDigits: 4), 10^4 + 123 = 10123
}

export function formatTicksToTime(ticks: number) {
	const hours = ticks / 36000000000.0;
	const hoursInt = Math.floor(hours);
	const minutes = (hours - hoursInt) * 60;
	const minutesInt = Math.floor(minutes);
	const seconds = (minutes - minutesInt) * 60;
	const secondsInt = Math.floor(seconds);
	const milliseconds = (seconds - secondsInt) * 1000;
	const millisecondsInt = Math.floor(milliseconds);

	return `${hoursInt}:${addLeadingZeroes(minutesInt, 2)}:${addLeadingZeroes(secondsInt, 2)}.${addLeadingZeroes(millisecondsInt, 3)}`;
}

export function formatTimeToTicks(
	time: string,
): { failed: false; ticks: number } | { failed: true; reason: string } {
	const isDigit = (char: string) => /\d/.test(char);
	for (const char of time) {
		if (!isDigit(char) && char !== "." && char !== ":") {
			return { failed: true, reason: `Invalid character '${char}'.` };
		}
	}

	const parts = time.split(":");

	const partsLength = parts.length;
	const hasHours = partsLength === 3;

	if (!hasHours && partsLength !== 2) {
		return { failed: true, reason: "Invalid amount of ':' in input." };
	}

	const minutesString = parts[hasHours ? 1 : 0];
	const secondsString = parts[hasHours ? 2 : 1];

	if (hasHours && minutesString.length !== 2) {
		return {
			failed: true,
			reason: `Invalid minutes value. (${minutesString})`,
		};
	}

	const hours = hasHours ? parseInt(parts[0]) : null;
	const minutes = parseInt(minutesString);
	const seconds = parseFloat(secondsString);
	const secondsParts = secondsString.split(".");

	if (secondsParts.length > 2 || secondsParts[0].length !== 2) {
		return {
			failed: true,
			reason: `Invalid seconds part. (${secondsParts})`,
		};
	}

	if (secondsParts.length < 2 || secondsParts[1].length === 0) {
		return {
			failed: true,
			reason: "Missing milliseconds.",
		};
	}

	if (Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) {
		return {
			failed: true,
			reason: "A part of the input was not a valid number.",
		};
	}

	const ticks = ((hours ?? 0) + (minutes + seconds / 60) / 60) * 36000000000;

	return { failed: false, ticks: Math.round(ticks) };
}
