import { MyPlugin } from "./MyPlugin";
import forms from "@tailwindcss/forms";

import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [],
  plugins: [MyPlugin, forms({strategy:"class"})],
} satisfies Config;
export default config;
