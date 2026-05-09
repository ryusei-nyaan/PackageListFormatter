# 📦 PackageListFormatter

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

</div>

A streamlined utility for generating, cleaning, and formatting license lists for your projects. Optimized for React Native and modern JavaScript applications.

## 🌟 Overview

`PackageListFormatter` automates the tedious process of collecting third-party license information. It leverages `license-checker-rseidelsohn` to extract data and applies a custom cleaning script to ensure you only keep the data you actually need for your "About" or "Licenses" screen.

### Key Features

- **Automated Extraction**: Scans your `node_modules` for license information.
- **Data Sanitization**: Filters out unnecessary noise, keeping only licenses, repository links, publishers, and license texts.
- **Version Sanitization**: Automatically cleans package names and versions.
- **Developer Friendly**: Simple shell script execution.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [pnpm](https://pnpm.io/) (recommended package manager)

## 🛠️ Usage

Simply run the main shell script. By default, it generates a `licenses.json` file.

```bash
./creatingLicense.sh
```

### Advanced Usage

You can specify a custom output filename or a different format configuration:

```bash
./creatingLicense.sh [output_filename.json] [config_file.json]
```

## ⚠️ Security & Maintenance Considerations

This script is designed as a **minimal utility**. For production-grade projects, please consider the following:

### 1. Version Pinning (Recommended)
The default script uses `pnpm dlx` which fetches the latest version of tools at runtime. To ensure build stability and security, it is recommended to add these tools to your `devDependencies`:

```bash
pnpm add -D license-checker-rseidelsohn tsx
```

Then, modify `creatingLicense.sh` to use local binaries:
```bash
# Example: replace 'pnpm dlx tsx' with 'pnpm tsx'
pnpm tsx $SCRIPT_DIR/cleanLicenses.ts $OUTPUTFILE
```

### 2. Version Disclosure Risk
By default, this tool may include package versions in the output. Disclosing specific dependency versions in your app's "About" screen can help attackers identify known vulnerabilities (CVEs).
- **Tip**: Consider modifying `cleanLicenses.ts` to omit version numbers if they are not legally required by the specific license.

### 3. Supply Chain Security
Always audit the `node_modules` and the tools you use (`license-checker-rseidelsohn`). Running third-party scripts should always be done in a secure environment.

## ⚙️ Configuration

### `customFormat.json`

This file tells the license checker which fields to include in the raw output.

```json
{
  "licenses": "",
  "repository": "",
  "publisher": "",
  "licenseText": ""
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
