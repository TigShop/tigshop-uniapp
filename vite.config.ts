import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
    plugins: [uni()],
    server: {
        port: 3000,
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://www.tigshop.com",
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, "index/"),
                rewrite: (path) => path.replace(/^\/api/, "")
            }
        }
    },
    build: {
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true
            }
        }
    }
});
