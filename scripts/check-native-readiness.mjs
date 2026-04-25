import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const rootDir = process.cwd();
const args = new Set(process.argv.slice(2));
const runDomCheck = args.size === 0 || args.has('--dom');
const runBundledDataCheck = args.size === 0 || args.has('--bundled-data');
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']);
const requiredBundledFiles = ['ship.csv', 'images.zip', 'no-image.svg'];
const useDomDirectivePattern = /(^|\n)\s*['"]use dom['"]\s*;?/;
const domImportPattern =
  /(?:from\s*['"]|import\s*\(\s*['"]|require\s*\(\s*['"])(?:\.\.?\/)+dom(?:\/|['"]|\))/;

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function getExtension(filePath) {
  const lastDot = filePath.lastIndexOf('.');
  return lastDot === -1 ? '' : filePath.slice(lastDot);
}

function walkSourceFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...walkSourceFiles(fullPath));
      continue;
    }

    if (stats.isFile() && sourceExtensions.has(getExtension(fullPath))) {
      files.push(fullPath);
    }
  }

  return files;
}

function checkDomBoundary() {
  const domDir = join(rootDir, 'src', 'dom');

  if (existsSync(domDir)) {
    fail('src/dom still exists. Remove the DOM wrapper directory before merging.');
  }

  const sourceDir = join(rootDir, 'src');
  const violations = [];

  for (const filePath of walkSourceFiles(sourceDir)) {
    const source = readFileSync(filePath, 'utf8');
    const relativePath = relative(rootDir, filePath);

    if (useDomDirectivePattern.test(source)) {
      violations.push(`${relativePath}: contains use dom directive`);
    }

    if (domImportPattern.test(source) || source.includes('src/dom')) {
      violations.push(`${relativePath}: references src/dom`);
    }
  }

  if (violations.length > 0) {
    fail(`DOM wrapper references found:\n${violations.map((entry) => `- ${entry}`).join('\n')}`);
  }
}

function checkBundledData() {
  const missing = requiredBundledFiles.filter((fileName) => !existsSync(join(rootDir, fileName)));

  if (missing.length > 0) {
    fail(`Required bundled data files are missing: ${missing.join(', ')}`);
  }
}

if (runDomCheck) {
  checkDomBoundary();
}

if (runBundledDataCheck) {
  checkBundledData();
}

if (!process.exitCode) {
  console.log('Native port readiness checks passed.');
}
