const fs = require('fs');
const path = require('path');

const toolsPath = path.join(process.cwd(), 'src', 'data', 'tools.ts');
const toolsContent = fs.readFileSync(toolsPath, 'utf8');

// Simple extraction of the tools array
const toolsMatch = toolsContent.match(/export const tools: Tool\[] = (\[[\s\S]*?\]);/);
if (!toolsMatch) {
  console.error('Could not find tools array in tools.ts');
  process.exit(1);
}

const toolsArray = toolsMatch[1];

// Create a JavaScript file with the tools array
const jsContent = `
module.exports = {
  tools: ${toolsArray}
};
`;

fs.writeFileSync(path.join(process.cwd(), 'scripts', 'tools.js'), jsContent);
console.log('✓ Compiled tools.ts to tools.js'); 