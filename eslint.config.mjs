import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from './prettier.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'],
        plugins: ['prettier'],
        rules: {
            'prettier/prettier': ['error', prettierConfig],
            semi: ['error', 'always'],
            '@typescript-eslint/no-unused-vars': [
                'warn', // o "error"
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    }),
];

export default eslintConfig;
