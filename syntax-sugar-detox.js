#!/usr/bin/env node

// Syntax Sugar Detoxifier - Because sometimes you need to see the ugly truth
// Warning: May cause withdrawal symptoms in React/Vue developers

const fs = require('fs');
const path = require('path');

// The Great Un-sweetening: Where magic becomes mundane
const detoxPatterns = [
    // Arrow functions to regular functions (the OG way)
    { regex: /\(([^)]*)\)\s*=>\s*{?([^}]*)}?/g, replace: 'function($1) { $2 }' },
    
    // Template literals to boring concatenation
    { regex: /`([^`]+)`/g, replace: (match) => {
        return match.replace(/\$\{([^}]+)\}/g, '" + $1 + "');
    }},
    
    // Destructuring? More like re-constructuring!
    { regex: /const\s*\{([^}]+)\}\s*=\s*(\w+)/g, replace: 'const $1 = $2.$1' },
    
    // Optional chaining? We chain with CONFIDENCE!
    { regex: /\?\./g, replace: '.' },
    
    // Nullish coalescing? We'll take our chances!
    { regex: /\?\?/g, replace: '||' },
    
    // Spread operator? Time to spread some reality
    { regex: /\.\.\.(\w+)/g, replace: '/* ...spread magic removed */ $1' }
];

function detoxify(code) {
    let detoxed = code;
    
    detoxPatterns.forEach(pattern => {
        detoxed = detoxed.replace(pattern.regex, pattern.replace);
    });
    
    // Add a warning comment because truth hurts
    detoxed = `// WARNING: This code has been detoxified
// You're now seeing JavaScript as your grandparents wrote it
// No refunds for emotional distress

${detoxed}`;
    
    return detoxed;
}

// Main function - where dreams of clean code go to die
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node syntax-sugar-detox.js <file.js>');
        console.log('Example: node syntax-sugar-detox.js fancy-modern-code.js');
        console.log('\nWarning: May cause existential crisis in framework developers');
        return;
    }
    
    const inputFile = args[0];
    const outputFile = inputFile.replace(/\.js$/, '.detox.js');
    
    try {
        const code = fs.readFileSync(inputFile, 'utf8');
        const detoxedCode = detoxify(code);
        
        fs.writeFileSync(outputFile, detoxedCode);
        
        console.log(`✅ Detox complete! Your code is now 100% sugar-free!`);
        console.log(`📁 Output: ${outputFile}`);
        console.log(`⚠️  Side effects may include: clarity, understanding, and sadness`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        console.log('Maybe the sugar was too strong for this one...');
    }
}

// Let's get this party started (the boring, old-school way)
if (require.main === module) {
    main();
}
