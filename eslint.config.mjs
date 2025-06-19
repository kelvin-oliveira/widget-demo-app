import { FlatCompat } from "@eslint/eslintrc";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier/recommended";
import tailwind from "eslint-plugin-tailwindcss";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const baseDirectory = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({ baseDirectory });

const nextConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          filter: { match: false, regex: "^_+$" },
          format: ["camelCase"],
          selector: "variableLike",
        },
        {
          format: ["camelCase", "PascalCase"],
          selector: "function",
        },
        {
          format: ["camelCase", "PascalCase"],
          selector: "variable",
          types: ["function"],
        },
        {
          custom: {
            match: false,
            regex: "(^(I|T)[A-Z])|([A-Z]*(Type|Interface)$)",
          },
          format: ["PascalCase"],
          selector: "typeLike",
        },
        {
          format: ["UPPER_CASE"],
          selector: "enumMember",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          caughtErrors: "none",
          ignoreRestSiblings: false,
          vars: "all",
        },
      ],
    },
  }),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

const tailwindConfig = [
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      "tailwindcss/no-custom-classname": ["off"],
    },
  },
  {
    settings: {
      callees: ["cn"],
      tailwindcss: { config: join(baseDirectory, "./tailwind.config.js") },
    },
  },
];

const perfectionistConfig = [
  {
    ...perfectionist.configs["recommended-natural"],
    rules: {
      ...perfectionist.configs["recommended-natural"].rules,
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "type",
            "side-effect",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "style",
            "object",
            "unknown",
          ],
          internalPattern: ["^@/.*$"],
          newlinesBetween: "never",
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-modules": ["off"],
    },
  },
];

const unicornConfig = [
  {
    languageOptions: { globals: globals.builtin },
    plugins: { unicorn },
    rules: {
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
    },
  },
];

const prettierConfig = [
  prettier,
  {
    rules: {
      "react/jsx-newline": ["error", { prevent: true }],
    },
  },
];

const eslintConfig = [
  ...nextConfig,
  ...tailwindConfig,
  ...perfectionistConfig,
  ...unicornConfig,
  ...prettierConfig,
];

export default eslintConfig;
