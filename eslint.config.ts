import pluginVue from "eslint-plugin-vue";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import stylistic from "@stylistic/eslint-plugin";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,

  {
    plugins: {
      "@stylistic": stylistic,
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            "UNIQUE",
            "SLOT",
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            "ATTR_STATIC",
            "ATTR_DYNAMIC",
            "ATTR_SHORTHAND_BOOL",
            "EVENTS",
            "CONTENT",
          ],
          alphabetical: false,
        },
      ],

      "vue/order-in-components": [
        "error",
        {
          order: [
            "el",
            "name",
            "key",
            "parent",
            "functional",
            "delimiters",
            "comments",
            "components",
            "directives",
            "filters",
            "extends",
            "mixins",
            "provide",
            "inject",
            "ROUTER_GUARDS",
            "layout",
            "middleware",
            "validate",
            "scrollToTop",
            "transition",
            "loading",
            "inheritAttrs",
            "model",
            "props",
            "propsData",
            "emits",
            "setup",
            "asyncData",
            "data",
            "fetch",
            "head",
            "computed",
            "watch",
            "watchQuery",
            "LIFECYCLE_HOOKS",
            "methods",
            "template",
            "render",
            "renderError",
          ],
        },
      ],

      "vue/no-irregular-whitespace": [
        "error",
        {
          skipStrings: true,
          skipComments: false,
          skipRegExps: false,
          skipTemplates: false,
          skipHTMLAttributeValues: false,
          skipHTMLTextContents: false,
        },
      ],

      "vue/component-definition-name-casing": ["error", "PascalCase"],

      "vue/match-component-file-name": [
        "error",
        {
          extensions: ["vue"],
          shouldMatchCase: true,
        },
      ],

      "vue/component-name-in-template-casing": [
        "error",
        "kebab-case",
        {
          registeredComponentsOnly: true,
          ignores: [],
        },
      ],

      "vue/custom-event-name-casing": [
        "error",
        "camelCase",
        {
          ignores: [],
        },
      ],

      "vue/new-line-between-multi-line-property": [
        "error",
        {
          minLineOfMultilineProperty: 2,
        },
      ],

      "vue/padding-lines-in-component-definition": [
        "error",
        {
          betweenOptions: "always",
          withinOption: {
            components: "ignore",
          },
        },
      ],

      "vue/next-tick-style": ["error", "promise"],

      "vue/v-bind-style": [
        "error",
        "shorthand",
        {
          sameNameShorthand: "always",
        },
      ],

      "vue/no-empty-component-block": ["error"],

      "vue/v-on-event-hyphenation": [
        "error",
        "always",
        {
          autofix: true,
          ignore: [],
        },
      ],

      "@stylistic/js/linebreak-style": ["error", "unix"],

      "vue/padding-line-between-tags": [
        "error",
        [
          {
            blankLine: "always",
            prev: "*",
            next: "*",
          },
        ],
      ],

      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],

      "vue/require-explicit-emits": [
        "off",
        {
          allowProps: false,
        },
      ],
    },
  },

  skipFormatting,
);
