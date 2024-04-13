import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  manifest: {
    permissions: ["storage"],
    content_scripts: [
      {
        matches: ["https://*/*"],
        run_at: "document_start",
        js: ["content-scripts/content.js"],
      },
    ],
  },
  vite: () => ({
    plugins: [react()],
  }),
});
