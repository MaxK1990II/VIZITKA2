import http from "node:http";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../out");
const port = Number(process.argv[2] ?? 3100);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid preview port");
await access(path.join(root, "index.html"));

const contentTypes = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
  ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2",
  ".vcf": "text/vcard; charset=utf-8",
};

http.createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = path.resolve(root, `.${pathname}`);
    const relative = path.relative(root, file);
    if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Outside export");
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const body = await readFile(file);
    const isContact = pathname.replace(/\/$/, "") === "/vcard";
    response.writeHead(200, {
      "Content-Type": isContact ? "text/vcard; charset=utf-8" : contentTypes[path.extname(file)] ?? "application/octet-stream",
      "Cache-Control": "no-store",
      ...(isContact ? { "Content-Disposition": 'attachment; filename="maksim-kanochkin.vcf"' } : {}),
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    const body = await readFile(path.join(root, "404.html")).catch(() => Buffer.from("Not found"));
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : body);
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Static export preview: http://127.0.0.1:${port}`);
});
