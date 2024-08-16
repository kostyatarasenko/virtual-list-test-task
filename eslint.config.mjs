import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-unresolved": "error",
      "import/no-dynamic-require": "error",
      "import/no-webpack-loader-syntax": "error",
      "import/no-self-import": "error",
      "import/no-cycle": ["error", { maxDepth: 1 }],
      "import/no-useless-path-segments": "error",
      "import/no-relative-packages": "error",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.js",
            "**/*.spec.js",
            "**/test/**/*.js",
            "**/tests/**/*.js",
          ],
        },
      ],
      "no-console": "warn",
      "no-plusplus": "off",
      "max-len": ["warn", { code: 120 }],
      "no-underscore-dangle": "off",
    },
  },
];
