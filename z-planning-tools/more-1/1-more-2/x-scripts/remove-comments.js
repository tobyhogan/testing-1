const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');

function removeSelectiveComments(code) {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });
  
  // Keep only comments that start with !
  ast.comments = ast.comments.filter(comment => {
    const text = comment.value.trimStart();
    return text.startsWith('!');
  });
  
  const output = generate(ast, { comments: true }, code);
  return output.code;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const cleaned = removeSelectiveComments(content);
      fs.writeFileSync(filePath, cleaned, 'utf8');
      console.log(`Processed: ${filePath}`);
    }
  });
}

processDirectory('./src');