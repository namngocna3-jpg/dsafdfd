// Nap bien moi truong tu file .env TRUOC khi cac module khac (orchestrator/providers)
// doc process.env. Phai duoc import dau tien.
// Dung process.loadEnvFile (Node >= 20.6) — khong can goi dependency ngoai.
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env");
try {
  if (typeof process.loadEnvFile === "function" && fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
    console.log(`[loadenv] da nap ${envPath}`);
  } else if (!fs.existsSync(envPath)) {
    console.log(`[loadenv] khong thay .env tai ${envPath} — dung gia tri mac dinh`);
  }
} catch (e) {
  console.error("[loadenv] khong nap duoc .env:", e.message);
}
