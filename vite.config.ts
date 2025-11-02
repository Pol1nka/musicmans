import vueDevTools from "vite-plugin-vue-devtools";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint2";
import stylelint from "vite-plugin-stylelint";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    plugins: [
      vueDevTools({ launchEditor: "webstorm" }),
      vue(),
      eslint({ fix: isDev }),
      stylelint({ fix: isDev }),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },

    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `@use "@/assets/styles/main.scss";`,
        },
      },
    },
    // Запуск хоста сервера разработки для доступа с других устройств
    // server: {
    //   host: true,
    // },
  };
});
