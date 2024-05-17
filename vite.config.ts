import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
export default defineConfig({
    plugins: [uni()],
    define: {
		'process.env.VUE_APP_TEST': JSON.stringify('test'),
	},
    server: {
        port: 3000,
        host: "0.0.0.0",
        proxy: {
            "/api": {
                // target: "http://lyecs8.com:7888",
                target: "http://192.168.5.109:82",
                // target: "http://192.168.5.106:82",
                changeOrigin: true,
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
