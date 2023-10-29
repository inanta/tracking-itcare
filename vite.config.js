import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import eslintPlugin from "vite-plugin-eslint";
import htmlMinifier from "rollup-plugin-html-minifier";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  // root: "./private",
  base: "",
  // publicDir: "https://a.com",
  build: {
    assetsDir: "public",
    rollupOptions: {
      external: [
        "../../../../../assets/js/config.js",
        "config.js" // Exclude the config.js file from the build
      ],
      plugins: [
        htmlMinifier({
          // These are the default values:

          // Glob pattern or array of glob patterns to include
          include: "**/*.html",

          // Glob pattern or array of glob patterns to exclude
          exclude: undefined,

          // Method returning a boolean that filters files to process
          // given their name (overrides include and exclude parameters)
          filter: undefined,

          // html-minifier options
          options: {
            collapseWhitespace: true
          }
        })
      ],
      input: {
        index: resolve(__dirname, "index.html")
      },
      output: {
        assetFileNames: (assetInfo) => {
          console.log(assetInfo.name + " -- " + assetInfo.type);
          let info = assetInfo.name.split(".");
          let extType = info[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          } else if (/woff|woff2|ttf|eot/.test(extType)) {
            extType = "css";
          }

          return `${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js"
      }
    }
  }
});
