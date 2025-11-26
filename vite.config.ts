import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Food Tracker",
                short_name: "FoodTracker",
                description: "Track your meals and nutrition goals",
                theme_color: "#1f2937",
                background_color: "#111827",
                display: "standalone",
                start_url: "/FoodTracker/",
                icons: [
                    {
                        src: "icons/icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icons/icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    base: "/FoodTracker/",
});
