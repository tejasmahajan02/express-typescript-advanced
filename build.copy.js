const fs = require('fs');
const path = require('path');

const API_VERSION = process.env.API_VERSION || 'v1';
const src = path.resolve(__dirname, `src/modules/${API_VERSION}/mail/templates`);
const dest = path.resolve(__dirname, `dist/modules/${API_VERSION}/mail/templates`);

fs.mkdirSync(dest, { recursive: true });
fs.cpSync(src, dest, { recursive: true });
