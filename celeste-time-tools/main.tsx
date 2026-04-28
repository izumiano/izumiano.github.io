import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "../src/index.css";
import "../src/index.css"
import App from "./App";

// biome-ignore lint/style/noNonNullAssertion: <root will always exist>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
