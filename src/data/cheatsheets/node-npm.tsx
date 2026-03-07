// src/data/cheatsheets/node-npm.tsx
import React from 'react';

export const nodeNpmPages = [
  {
    title: 'NPM – Comandos básicos',
    content: (
      <div className="space-y-6">
        <p className="font-semibold">NPM – COMANDOS</p>
        <ul className="list-none space-y-1 text-sm lg:text-base">
          <li>npm init -y .................. iniciar proyecto</li>
          <li>npm install &lt;pkg&gt; .......... instalar dependencia</li>
          <li>npm install -D &lt;pkg&gt; ...... dev dependency</li>
          <li>npm install -g &lt;pkg&gt; ...... instalación global</li>
          <li>npm run &lt;script&gt; .......... ejecutar script</li>
          <li>npm audit fix ................ reparar vulnerabilidades</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'package.json – Estructura básica',
    content: (
      <div className="space-y-6">
        <pre className="bg-gray-800 text-gray-200 p-5 rounded-lg overflow-x-auto text-sm font-mono">
          <code>{`{
  "name": "mi-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node dist/main.js",
    "dev": "nodemon src/index.js",
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}`}</code>
        </pre>
      </div>
    ),
  },
  // Agrega más páginas aquí
];