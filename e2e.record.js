import { execSync } from 'node:child_process';
// URL par défaut
const defaultUrl = 'http://localhost:4200';
// Récupérer l'URL depuis les arguments passés en ligne de commande
const url = process.argv[2] || defaultUrl; // Valeur par défaut si aucune URL n'est spécifiée

console.log(`Launching Playwright codegen with URL: ${url}`);
execSync(`npx playwright codegen ${url}`, { stdio: 'inherit' });
