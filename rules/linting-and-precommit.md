# Rule: Linting, Formatting, and Pre-commit Hooks

## Purpose

Maintain a high-quality, consistent codebase by enforcing linting, formatting, and automated checks before code is committed. This rule applies to all contributors and all code (TypeScript, JavaScript, Svelte, and configuration files).

## Requirements

- **Linting:**
  - Use [ESLint](https://eslint.org/) with [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte3) for SvelteKit projects.
  - Lint all `.js`, `.ts`, and `.svelte` files.
  - Use [Prettier](https://prettier.io/) for code formatting. Integrate with ESLint to avoid conflicts.
  - Linting and formatting should be autofixed where possible (`--fix` for ESLint, `--write` for Prettier).

- **Pre-commit Hooks:**
  - Use [Husky](https://typicode.github.io/husky/) for git hook management.
  - Use [lint-staged](https://github.com/okonet/lint-staged) to run linters and formatters only on staged files.
  - Hooks must:
    - Run `eslint --fix` and `prettier --write` on staged files.
    - Run all tests (`npm test` or `npm run test`).
    - Block commits of files larger than 2MB (enforced by git or CI).
  - Hooks must run automatically on every commit.

- **Manual Commands:**
  - `npm run lint` — Lint all files.
  - `npm run lint:fix` — Lint and autofix all files.
  - `npm run format` — Format all files with Prettier.
  - `npm test` — Run all tests.

## Configuration Example

### ESLint (`.eslintrc.cjs`)
```js
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:svelte/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['svelte', '@typescript-eslint'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  ignorePatterns: ['node_modules/', 'build/', '.svelte-kit/'],
};
```

### Prettier (`.prettierrc`)
```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Husky & lint-staged

**Install:**
```sh
npm install --save-dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

**Configure lint-staged in `package.json`:**
```json
"lint-staged": {
  "*.{js,ts,svelte}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css,scss}": ["prettier --write"]
}
```

## Enforcement

- All contributors must have Husky hooks installed (`npm run prepare` or `npx husky install`).
- CI/CD should also run linting and tests to prevent bypassing hooks.
- PRs that do not pass linting, formatting, or tests will not be merged.

## References
- [SvelteKit Linting Docs](https://kit.svelte.dev/docs/integrations#linting)
- [Husky Docs](https://typicode.github.io/husky/)
- [lint-staged Docs](https://github.com/okonet/lint-staged)
- [ESLint Plugin Svelte](https://github.com/sveltejs/eslint-plugin-svelte3)
- [Prettier](https://prettier.io/) 