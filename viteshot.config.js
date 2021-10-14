const playwrightShooter = require("viteshot/shooters/playwright");
const playwright = require("playwright");

module.exports = {
  framework: {
    type: "react",
  },
  wrapper: {
    path: "src/App.tsx",
    componentName: "AppWrapper",
  },
  shooter: playwrightShooter(playwright.chromium),
  filePathPattern: "**/*.screenshot.@(js|jsx|tsx|vue|svelte)",
};
