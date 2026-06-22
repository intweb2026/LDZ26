// server/index.js

// Load .env from the project root before anything else
(function loadEnv() {
  const fs = require('fs');
  const path = require('path');
  const envPath = path.resolve(__dirname, '..', '.env');
  try {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
      const eqIdx = trimmed.indexOf('=');
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch (_) {}
})();

// 🧩 Ignore all non-JavaScript imports for SSR
require("ignore-styles").default([
  ".css", ".scss", ".sass", ".less", ".styl"
]);

// 🧩 Ignore image, font, and other static assets
const assetExtensions = [
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp', '.ico',
  '.woff', '.woff2', '.ttf', '.eot', '.otf',
  '.mp4', '.webm', '.ogg', '.mp3', '.wav',
  '.pdf', '.zip', '.csv'
];

assetExtensions.forEach(ext => {
  require.extensions[ext] = () => null;
});

// 🧩 Setup Babel transpilation for JSX and ES6
require('@babel/register')({
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: 'commonjs'
    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  extensions: ['.js', '.jsx'],
  ignore: [/(node_modules)/],
  cache: false
});

// 🧩 Start the actual Express SSR server
require('./server.js');