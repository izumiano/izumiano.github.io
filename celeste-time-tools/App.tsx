import { useRef, useState } from "react";
import "../src/reset.css";
import "./App.css";
import { logError } from "@izumiano/vite-logger";
import { formatTicksToTime, formatTimeToTicks } from "./utils";

export default function App() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [output, setOutputState] = useState("");
	const [validationError, setValidationErrorState] = useState("");

	return (
		<main>
			<header>Celeste Time Tools</header>
			<input
				placeholder="hh:mm:ss or ticks"
				ref={inputRef}
				onChange={() => {
					if (!inputRef.current) {
						return;
					}
					inputRef.current.setCustomValidity("");

					if (!inputRef.current) {
						logError("Failed getting outputRef or inputRef");
						return;
					}

					const value = inputRef.current?.value;

					if (!value) {
						setValidationErrorState("");
						setOutputState("");
						return;
					}

					let output = "";

					const timeStamp = parseInt(value);
					if (!Number.isNaN(timeStamp) && /^\d+$/.test(value)) {
						output = formatTicksToTime(timeStamp);
					} else {
						const formatResult = formatTimeToTicks(value);

						if (formatResult.failed) {
							logError(formatResult.reason);
							inputRef.current.setCustomValidity(formatResult.reason);
							setValidationErrorState(formatResult.reason);
							setOutputState("");
							return;
						}

						output = `${formatResult.ticks}`;
					}

					setValidationErrorState("");
					setOutputState(output);
				}}
			/>
			<p>{validationError}</p>
			<p>{output}</p>
		</main>
	);
}
