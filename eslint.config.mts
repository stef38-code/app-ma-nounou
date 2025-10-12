import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import {defineConfig, globalIgnores} from "eslint/config";
import angular from 'angular-eslint';
import eslintConfigPrettier from'eslint-config-prettier';
import importer from 'eslint-plugin-import';
import unused_imports from 'eslint-plugin-unused-imports';
import security from 'eslint-plugin-security';
import sonarjs from'eslint-plugin-sonarjs';
import eslint_plugin_import from 'eslint-plugin-import';
// Définition de la configuration ESLint pour gérer différents fichiers et règles
export default defineConfig([
  // Gestion des fichiers globalement ignorés (comme les dossiers générés automatiquement)
  globalIgnores(['**/dist/**', '**/coverage/**/*',
    '**/node_modules/**/*','src/app/api/**/*','src/index.html','package-lock.json']),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {js: eslint}, // Les règles spécifiques à JavaScript
    extends: ["js/recommended"], // Recommandations standards pour le JS par ESLint
    languageOptions: {
      globals: {...globals.browser, ...globals.node}, // Définition des variables globales (navigateur et Node.js)
      parserOptions: {
        ecmaVersion: 'latest', // Utilisation de fonctionnalités ECMAScript modernes
        project: ['./tsconfig.json', './tsconfig.spec.json'] // TSConfig utilisé pour TypeScript-aware linting
      }
    }
  },

  {
    // Ignorer certains dossiers Angular spécifiques
    ignores: ['.angular/**', '.nx/**', 'coverage/**', 'dist/**'],
    files: ['**/*.ts'], // Fichiers TypeScript concernés
    plugins: {
      "import": importer,
      'unused-imports': unused_imports,
      'eslint_plugin_import':eslint_plugin_import
    },
    extends: [
      eslint.configs.recommended, // Règles ESLint de base
      ...tseslint.configs.recommended, // Bonne pratique TypeScript par TypeScript-ESLint
      ...tseslint.configs.stylistic, // Règles spécifiques au style de code TypeScript
      ...angular.configs.tsRecommended, // Meilleures pratiques pour Angular TypeScript
      security.configs.recommended,
      sonarjs.configs.recommended,
      eslintConfigPrettier, // Désactivation des conflits entre ESLint et Prettier pour un formatage propre
    ],
    processor: angular.processInlineTemplates, // Gère les templates inline dans les composants Angular
    rules: {
      'eslint_plugin_import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'always',
        },
      ],
      // Meilleures pratiques Angular - conventions de nommage pour les directives et composants
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute', // Les directives doivent être utilisées comme attribut
          prefix: 'app', // Préfixe recommandé (évite les conflits globaux)
          style: 'camelCase', // Style camelCase pour les directives
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element', // Les composants doivent être déclarés comme éléments HTML
          prefix: 'app', // Préfixe recommandé pour les composants
          style: 'kebab-case', // Utiliser kebab-case pour les balises des composants
        },
      ],
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'import/no-cycle': ['warn', { maxDepth: 1 }],
      // Bonnes pratiques générales Angular
      '@angular-eslint/no-empty-lifecycle-method': 'warn', // Signale les méthodes de cycle de vie vides inutiles
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn', // Encourager la détection des changements OnPush pour les composants
      '@angular-eslint/prefer-output-readonly': 'warn', // Préférer les sorties avec la déclaration readonly
      '@angular-eslint/prefer-signals': 'warn', // Préférer l'utilisation des Observable Signals (si compatible)
      '@angular-eslint/prefer-standalone': 'warn', // Encourager les composants autonomes (non dépendants de modules)
      // Bonnes pratiques TypeScript
      '@typescript-eslint/array-type': ['warn'], // Forcer un style cohérent pour les types des tableaux
      '@typescript-eslint/consistent-indexed-object-style': 'off', // Désactivé pour définir des objets indexés
      '@typescript-eslint/consistent-type-assertions': 'warn', // Règles uniformes pour les assertions de type
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'], // Préférer les mots-clés `type` au lieu d'`interface`
      '@typescript-eslint/explicit-function-return-type': 'error', // Forcer la définition explicite des types de retour
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public', // Ne pas spécifier "public" explicitement (implicite par défaut)
        },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable', // Conventions pour nommer les variables
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'], // camelCase pour les variables, UPPER_CASE pour les constantes, PascalCase pour les enums
        },
      ],
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn', //Élimine les types redondants dans les définitions explicites.
      '@typescript-eslint/prefer-optional-chain': 'warn', //Encourage l'utilisation de l'optional chaining (?.) pour simplifier l'accès conditionnel aux propriétés.
      '@typescript-eslint/no-empty-function': 'warn', // Avertissement si une fonction vide est déclarée
      '@typescript-eslint/no-empty-interface': 'error', // Interdire les interfaces vides (inutile ou erreur)
      '@typescript-eslint/no-explicit-any': 'warn', // Interdire l'usage excessif de `any`
      '@typescript-eslint/no-inferrable-types': 'warn', // Éviter les types inférés redondants
      '@typescript-eslint/no-shadow': 'warn', // Éviter les problèmes de shadowing (redéclaration de variables dans un contexte interne)
      '@typescript-eslint/no-unused-vars': 'warn', // Avertissement pour les variables non utilisées
      eqeqeq: 'error', // Obligatoire d'utiliser `===` au lieu de `==`
      complexity: ['error', 20], // Limiter la complexité des fonctions à 20
      curly: 'error', // Toujours utiliser des accolades pour les blocs
      'guard-for-in': 'error', // Toujours vérifier les propriétés en boucles for-in
      'max-classes-per-file': ['error', 1], // Une seule classe par fichier
      'max-len': [
        'warn',
        {
          code: 120, // Longueur maximale des lignes (sauf commentaires)
          comments: 160, // Longueur maximale des commentaires
        },
      ],
      'max-lines': ['error', 400], // Fichier limité à 400 lignes pour une meilleure lisibilité
      'no-bitwise': 'error', // Interdire l'usage des opérateurs bitwise (peu courant et potentiellement confus)
      'no-console': 'off', // Permet d'utiliser console (utile en développement)
      'no-new-wrappers': 'error', // Empêche de créer des objets String, Number, etc. de manière explicite (inutile en JS moderne)
      'no-useless-concat': 'error', // Éviter les concaténations inutiles (utiliser `template strings`)
      'no-var': 'error', // Interdire `var`, préférer `let` ou `const`
      'prefer-arrow-callback': 'error', // Utiliser systématiquement des fonctions fléchées pour les callbacks
      'prefer-const': 'error', // Utiliser `const` pour les valeurs immuables
      'sort-imports': [
        'error',
        {
          ignoreCase: true, // Ne pas tenir compte de la casse pour trier les imports
          ignoreDeclarationSort: true, // Autorise les blocs d'import triés séparément
          allowSeparatedGroups: true, // Autoriser des groupes d'import séparés par des lignes
        },
      ],

      // Règles de sécurité
      'no-eval': 'error', // Interdire l'usage de `eval` pour éviter les attaques XSS
      'no-implied-eval': 'error', // Éviter les usages indirects de `eval`
    },
  },
  {
    files: ['**/*.html'],
    processor: angular.processInlineTemplates, // Ajustement pour les templates inline Angular
    extends: [
      eslint.configs.recommended, // Règles ESLint de base
      ...angular.configs.templateRecommended, // Bonnes pratiques Angular HTML
      ...angular.configs.templateAccessibility, // Accessibilité dans les templates
      eslintConfigPrettier, // Désactivation des conflits entre ESLint et Prettier pour un formatage propre
    ],
    rules: {
      '@angular-eslint/template/attributes-order': [
        'warn',
        {
          alphabetical: true, // Forcer l'ordre alphabétique des attributs
          order: [
            'STRUCTURAL_DIRECTIVE', // Les directives (e.g., *ngIf) apparaissent en premier
            'TEMPLATE_REFERENCE', // Références de type template (e.g., #myRef)
            'ATTRIBUTE_BINDING', // Les attributs standards (e.g., id="3", required)
            'INPUT_BINDING', // Inputs `[value]="..."` suivent
            'TWO_WAY_BINDING', // Binding bidirectionnel comme `[(value)]`
            'OUTPUT_BINDING', // Puis les `outputs` comme `(event)="..."`.
          ],
        },
      ],
      // Meilleures pratiques et simplifications pour les templates Angular
      '@angular-eslint/template/button-has-type': 'warn',
      '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 10 }], // Complexité des templates
      '@angular-eslint/template/eqeqeq': 'error', // Toujours utiliser `===` dans les templates
      '@angular-eslint/template/prefer-control-flow': 'error', // Préférer les instructions de contrôle logiques aux constructions DOM redondantes
      '@angular-eslint/template/prefer-ngsrc': 'warn', // Suggère `ngSrc` au lieu de `src` simple
      '@angular-eslint/template/prefer-self-closing-tags': 'warn', // Encourager les balises auto-fermantes
      '@angular-eslint/template/use-track-by-function': 'warn', // Toujours utiliser `trackBy` dans *ngFor pour meilleures performances
    },
  },

  // Configuration JSON (par exemple, fichiers de config Angular)
  { files: ["**/*.jsonc","**/*.json"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },

  // Configuration Markdown (y compris la documentation)
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/commonmark", extends: ["markdown/recommended"] },
]);
