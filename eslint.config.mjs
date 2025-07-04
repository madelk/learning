// XO-inspired ultra-strict ESLint flat configuration for Nx workspace
// Following XO's modern flat config patterns with comprehensive rule coverage
// Enforces the highest level of code quality and consistency

import commentsPlugin from "@eslint-community/eslint-plugin-eslint-comments";
import nx from "@nx/eslint-plugin";
import stylisticPlugin from "@stylistic/eslint-plugin";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import nodePlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

// File extension mappings for import resolution
const jsExtensions = [".js", ".mjs", ".cjs", ".jsx"];
const tsExtensions = [".ts", ".cts", ".mts", ".tsx", ".d.ts"];
const allExtensions = [...jsExtensions, ...tsExtensions];

// File glob patterns following XO conventions
const jsFilesGlob = "**/*.{js,cjs,mjs,jsx}";
const tsFilesGlob = "**/*.{ts,cts,mts,tsx}";
const allFilesGlob = "**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}";

const eslintConfig = [
  // Global ignores - XO pattern
  {
    name: "XO Default Ignores",
    ignores: [
      "**/dist/**",
      "**/out-tsc/**",
      "**/node_modules/**",
      "**/.nx/**",
      "**/coverage/**",
      "**/build/**",
      "**/tmp/**",
      "**/temp/**",
      "**/*.min.js",
      "**/*.bundle.js",
      "**/vite.config.*.timestamp*",
      "**/vitest.config.*.timestamp*",
      "**/test-output/**"
    ]
  },

  // Nx workspace foundation
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],

  // Ultra-strict TypeScript
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // XO-inspired base configuration with comprehensive plugin setup
  {
    name: "XO Base Configuration",
    files: [allFilesGlob],
    plugins: {
      import: importPlugin,
      security,
      sonarjs,
      unicorn,
      n: nodePlugin,
      promise: promisePlugin,
      "@stylistic": stylisticPlugin,
      "@eslint-community/eslint-comments": commentsPlugin
    },
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
        // Filter out malformed global from browser globals and add correct one
        ...Object.fromEntries(
          Object.entries(globals.browser).filter(
            ([key]) => key !== "AudioWorkletGlobalScope "
          )
        ),
        AudioWorkletGlobalScope: globals.browser["AudioWorkletGlobalScope "]
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      // Import resolver configuration following XO patterns
      "import/extensions": allExtensions,
      "import/core-modules": ["electron", "atom"],
      "import/parsers": {
        espree: jsExtensions,
        "@typescript-eslint/parser": tsExtensions
      },
      "import/external-module-folders": ["node_modules", "node_modules/@types"],
      "import/resolver": {
        node: {
          extensions: allExtensions
        },
        typescript: {
          alwaysTryTypes: true,
          project: [
            "tsconfig.json",
            "tsconfig.*.json",
            "./*/tsconfig.json",
            "./*/tsconfig.*.json"
          ]
        }
      }
    },
    rules: {
      // XO base rules - comprehensive coverage
      ...unicorn.configs.recommended.rules,
      ...security.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,

      // Import rules following XO patterns
      "import/default": "error",
      "import/export": "error",
      "import/extensions": ["error", "always", { ignorePackages: true }],
      "import/first": "error",
      "import/named": "error",
      "import/namespace": ["error", { allowComputed: true }],
      "import/no-absolute-path": "error",
      "import/no-anonymous-default-export": "error",
      "import/no-named-default": "error",
      "import/no-webpack-loader-syntax": "error",
      "import/no-self-import": "error",
      "import/no-cycle": ["error", { ignoreExternal: true }],
      "import/no-useless-path-segments": "error",
      "import/newline-after-import": "error",
      "import/no-amd": "error",
      "import/no-duplicates": ["error", { "prefer-inline": true }],

      // Node.js rules following XO patterns
      "n/file-extension-in-import": [
        "error",
        "always",
        { ".ts": "never", ".tsx": "never" }
      ],
      "n/no-mixed-requires": ["error", { grouping: true, allowCall: true }],
      "n/no-new-require": "error",
      "n/no-path-concat": "error",
      "n/process-exit-as-throw": "error",
      "n/no-deprecated-api": "error",
      "n/prefer-global/buffer": ["error", "never"],
      "n/prefer-global/console": ["error", "always"],
      "n/prefer-global/process": ["error", "never"],
      "n/prefer-global/text-decoder": ["error", "always"],
      "n/prefer-global/text-encoder": ["error", "always"],
      "n/prefer-global/url-search-params": ["error", "always"],
      "n/prefer-global/url": ["error", "always"],
      "n/prefer-promises/dns": "error",
      "n/prefer-promises/fs": "error",

      // Promise rules
      "promise/param-names": "error",
      "promise/no-return-wrap": ["error", { allowReject: true }],
      "promise/no-new-statics": "error",
      "promise/no-return-in-finally": "error",
      "promise/prefer-await-to-then": ["error", { strict: true }],
      "promise/catch-or-return": "error",
      "promise/valid-params": "error",

      // ESLint comments rules
      "@eslint-community/eslint-comments/disable-enable-pair": [
        "error",
        { allowWholeFile: true }
      ],
      "@eslint-community/eslint-comments/no-aggregating-enable": "error",
      "@eslint-community/eslint-comments/no-duplicate-disable": "error",
      "@eslint-community/eslint-comments/no-unused-disable": "error",
      "@eslint-community/eslint-comments/no-unused-enable": "error",

      // Stylistic rules
      "@stylistic/indent": ["error", 2, { SwitchCase: 1 }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/comma-style": ["error", "last"],
      "@stylistic/computed-property-spacing": ["error", "never"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/eol-last": "error",
      "@stylistic/func-call-spacing": ["error", "never"],
      "@stylistic/key-spacing": [
        "error",
        { beforeColon: false, afterColon: true }
      ],
      "@stylistic/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/lines-around-comment": [
        "error",
        { beforeBlockComment: true, allowBlockStart: true }
      ],
      "@stylistic/max-statements-per-line": ["error", { max: 1 }],
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-multiple-empty-lines": [
        "error",
        { max: 1, maxEOF: 0, maxBOF: 0 }
      ],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/operator-linebreak": ["error", "before"],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/rest-spread-spacing": ["error", "never"],
      "@stylistic/semi-spacing": ["error", { before: false, after: true }],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/space-before-function-paren": [
        "error",
        { anonymous: "always", named: "never", asyncArrow: "always" }
      ],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": ["error", { words: true, nonwords: false }],
      "@stylistic/spaced-comment": ["error", "always"],
      "@stylistic/template-curly-spacing": ["error", "never"],
      "@stylistic/template-tag-spacing": ["error", "never"],
      "@stylistic/yield-star-spacing": ["error", "after"],

      // Allow console.warn and console.error for legitimate use
      "no-console": ["error", { allow: ["warn", "error"] }],

      // Framework compatibility adjustments
      "unicorn/filename-case": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            arg: true,
            args: true,
            ctx: true,
            db: true,
            env: true,
            i: true,
            j: true,
            k: true,
            param: true,
            params: true,
            props: true,
            ref: true,
            refs: true,
            req: true,
            res: true
          }
        }
      ]
    }
  },

  // TypeScript-specific configuration following XO patterns
  {
    name: "XO TypeScript",
    files: [tsFilesGlob],
    rules: {
      // Disable conflicting rules for TypeScript
      "unicorn/import-style": "off",
      "n/file-extension-in-import": "off",
      "import/export": "off", // Buggy with TypeScript
      "import/default": "off", // Doesn't work with TS default const exports
      "import/named": "off", // Buggy with TypeScript

      // TypeScript-specific import rules
      "import/no-unresolved": "off", // TypeScript handles this
      "import/extensions": ["error", "never", { json: "always" }]
    }
  },

  // React configuration - XO React patterns
  {
    name: "XO React",
    files: [
      "apps/react/**/*.{js,jsx,ts,tsx}",
      "libs/**/react/**/*.{js,jsx,ts,tsx}"
    ],
    plugins: {
      "jsx-a11y": jsxA11y,
      react,
      "react-hooks": reactHooks
    },
    rules: {
      // React best practices
      "react/prop-types": "off", // TypeScript handles this
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-key": "error",
      "react/no-danger": "error",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-unescaped-entities": "error",
      "react/no-unknown-property": "error",
      "react/no-unsafe": "error",
      "react/require-render-return": "error",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // JSX a11y
      ...jsxA11y.configs.recommended.rules
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },

  // Test files - relaxed rules
  {
    files: [
      "**/*.{spec,test}.{js,jsx,ts,tsx}",
      "**/__tests__/**/*.{js,jsx,ts,tsx}"
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "import/no-extraneous-dependencies": "off",
      "no-console": "off",
      "sonarjs/no-duplicate-string": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-null": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/prevent-abbreviations": "off"
    }
  },

  // Configuration files - relaxed rules
  {
    files: [
      "**/*.config.{js,mjs,ts}",
      "**/eslint.config.*",
      "**/vite.config.*",
      "**/vitest.config.*",
      "**/postcss.config.*",
      "**/tailwind.config.*"
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "unicorn/prefer-module": "off"
    }
  },

  // Nx module boundaries
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          allow: [String.raw`^.*/eslint(\.base)?\.config\.[cm]?[jt]s$`],
          depConstraints: [
            {
              onlyDependOnLibsWithTags: ["*"],
              sourceTag: "*"
            }
          ],
          enforceBuildableLibDependency: true
        }
      ]
    }
  },

  // Apply Prettier last to disable conflicting rules
  prettier
];

export default eslintConfig;
