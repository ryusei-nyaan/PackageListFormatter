import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// process.argv は [nodeのパス, ファイルのパス, 引数1, 引数2, ...]
const args = process.argv.slice(2);

const arg1 = args[0] ?? "licenses.json";

// 必要な項目の型定義
interface RawLicenseItem {
  licenses?: string;
  repository?: string;
  publisher?: string;
  email?: string;
  licenseText?: string;
  path?: string;
  licenseFile?: string;
  copyright?: string;
}

interface CleanedLicenseItem {
  licenses: string;
  repository: string;
  publisher: string;
  licenseText: string;
}
const targetFullPath = `${__dirname}/${arg1}`;
if (!fs.existsSync(targetFullPath)) {
  console.log("❌ Failed: Not found file");
  process.exit();
}
const rawData: Record<string, RawLicenseItem> = JSON.parse(
  fs.readFileSync(targetFullPath, "utf8"),
);

const cleanedData: Record<string, CleanedLicenseItem> = {};

const sanitizeVersion = (w: string) => {
  return w.split("@").slice(0, -1).join(",").split(",").at(-1) ?? "Unknown";
};

for (const key in rawData) {
  const item = rawData[key];
  const sanitizedKey = sanitizeVersion(key);
  cleanedData[sanitizedKey] = {
    licenses: item.licenses ?? "Unknown",
    repository: item.repository || "Unknown",
    publisher: item.publisher || "Unknown",
    licenseText: item.licenseText || "No license text available.",
  };
}

fs.writeFileSync(targetFullPath, JSON.stringify(cleanedData, null, 2));

console.log("✅ Success: Cleaned license JSON created.");
