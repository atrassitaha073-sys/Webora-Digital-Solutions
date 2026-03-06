import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Try both possible locations for dist folder
  let distPath = path.resolve(__dirname, "../dist");
  
  // If dist/public exists (older Vite build), use that
  if (fs.existsSync(path.join(distPath, "public"))) {
    distPath = path.join(distPath, "public");
  }
  
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static files (CSS, JS, images, etc.)
  app.use(express.static(distPath));

  // Fallback: any route that doesn't match a file should serve index.html
  app.get("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send("index.html not found");
    }
    res.sendFile(indexPath);
  });
}
