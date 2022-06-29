import { parse as parsePath } from 'path';
import { ESLintUtils } from '@typescript-eslint/utils';

import { version, repository } from '../../package.json';

export const createRule = ESLintUtils.RuleCreator(name => {
    const ruleName = parsePath(name).name;
    return `${repository?.url ?? ''}/blob/v${version}/docs/rules/${ruleName}.md`;
})