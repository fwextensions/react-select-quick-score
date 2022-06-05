/// <reference types="vitest" />

import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		react(),
		dts()
	],
	build: {
		lib: {
			entry: "src/index.ts",
			name: "ReactSelectQuickScore"
		},
		sourcemap: true,
		emptyOutDir: true,
		rollupOptions: {
			external: [
				"react",
				"react-select"
			],
			output: {
				globals: {
					react: "React",
					"react-select": "ReactSelect"
				}
			}
		}
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "test/setup.ts",
		coverage: {
			reporter: ["text", "json", "html"],
		}
	}
});
