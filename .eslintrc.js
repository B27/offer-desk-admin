module.exports = {
    env: {
        browser: true,
        es6: true
    },
    plugins: ['svelte3'],
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    overrides: [
        {
            files: ['**/*.svelte'],
            processor: 'svelte3/svelte3'
        }
    ],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module'
    },
    rules: {
        // 'prettier/prettier': 'warn',
        // "require-atomic-updates": "off",
        curly: 'warn'
    },
    settings: {
        'import/core-modules': ['svelte']
    }
};
