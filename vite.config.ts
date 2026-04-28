import path from "node:path";
import logPlugin from "@izumiano/vite-plugin-logger";
import { biomePlugin } from "@pbr1111/vite-plugin-biome";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const { VITE_TRACE, VITE_DO_SERVER_LOG, VITE_LOG_URL } = loadEnv(
		mode,
		path.resolve(__dirname),
	);

	const isVitest = !!process.env.VITEST;

	return {
		plugins: [
			react(),
			!isVitest ? biomePlugin() : undefined,
			!isVitest
				? logPlugin({
						mode,
						traceEnabled: VITE_TRACE === "true",
						doServerLog: VITE_DO_SERVER_LOG === "true",
						logUrl: VITE_LOG_URL,
					})
				: undefined,
		],
		base: "/",
		build: {
			rollupOptions: {
				output: {
					// ==For GitHub Pages==
					entryFileNames: `[name].js`,
					chunkFileNames: `[name]-[hash].js`,
					assetFileNames: `[name]-[hash][extname]`,
					// ====================
				},
			},
		},
	};
});
