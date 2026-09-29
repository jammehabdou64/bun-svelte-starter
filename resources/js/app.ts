import { createInertiaApp } from "@inertiajs/svelte";
import { mount } from "svelte";
import "../css/app.css";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.svelte", { eager: true });
    const page = pages[`./Pages/${name}.svelte`];
    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }
    return page;
  },
  setup({ el, App, props }) {
    mount(App, { target: el, props });
  },
  progress: { color: "#c6f25c", delay: 1 },
});
