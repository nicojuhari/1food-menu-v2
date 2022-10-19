// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "./main.js"),
            name: "1food-menu",
            formats: ["es", "umd"],
        },
    },
});
