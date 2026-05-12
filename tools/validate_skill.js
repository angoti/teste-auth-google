const fs = require("fs");
const path = require("path");

const file = path.resolve(process.cwd(), "SKILL.md");
if (!fs.existsSync(file)) {
  console.error("SKILL.md not found");
  process.exit(2);
}

const content = fs.readFileSync(file, "utf8");
const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
if (!frontmatterMatch) {
  console.error("Frontmatter YAML block not found at top of SKILL.md");
  process.exit(2);
}

const yaml = frontmatterMatch[1];
if (!/name:\s*agent-customization/.test(yaml)) {
  console.error('Frontmatter does not include "name: agent-customization"');
  process.exit(2);
}
if (!/scope:\s*workspace/.test(yaml)) {
  console.error('Frontmatter does not include "scope: workspace"');
  process.exit(2);
}

console.log("SKILL.md frontmatter OK");
process.exit(0);
