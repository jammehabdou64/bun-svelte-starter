import tailwindcss from "@tailwindcss/vite";
import inertia from "@inertiajs/vite";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.ts"],
      refresh: true,
    }),
    inertia(),
    tailwindcss(),
    svelte(),
  ],
});
