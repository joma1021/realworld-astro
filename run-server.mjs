import express from "express";
import compression from "compression";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import { join } from "path";
import { fileURLToPath } from "url";

// Directories where the static assets are located
const distDir = join(fileURLToPath(import.meta.url), "..", "..", "dist");
const buildDir = join(distDir, "client");

console.log(buildDir);

const app = express();
const PORT = process.env.PORT ?? 3000;

// Static asset handlers
// https://expressjs.com/en/starter/static-files.html
app.use(`/_astro`, express.static(buildDir, { immutable: true, maxAge: "1y" }));
app.use(express.static(distDir, { redirect: false }));

app.use(compression());
// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = "/";
app.use(base, express.static("dist/client/"));
app.use(ssrHandler);

// Start the express server
app.listen(PORT, () => {
  /* eslint-disable */
  console.log(`Server started: http://localhost:${PORT}/`);
});
