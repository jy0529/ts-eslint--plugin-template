import { parse as parsePath } from 'path';
import { ESLintUtils } from '@typescript-eslint/utils';

import { version, repo } from '../../package.json';

export const createRule = ESLintUtils.RuleCreator(name => {
    const ruleName = parsePath(name).name;
    return `${repo}/blob/v${version}/docs/rules/${ruleName}.md`;
})