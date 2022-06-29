import { readdirSync } from 'fs';
import { TSESLint } from '@typescript-eslint/utils';
import { join, parse } from 'path';

const namespace = 'test';

type RuleModule = TSESLint.RuleModule<string, unknown[]> & {
    meta: Required<Pick<TSESLint.RuleMetaData<string>, 'docs'>>;
};

const interopRequireDefault = (obj: any): { default: any } =>
    obj && obj.__esModule ? obj : { default: obj };

const importDefault = (moduleName: string) => {
    return interopRequireDefault(require(moduleName)).default;
}

const rulesDir = join(__dirname, 'rules');
const excludeFiles = ['__tests__'];
const rules = readdirSync(rulesDir)
    .map(rule => parse(rule).name)
    .filter(rule => !excludeFiles.includes(rule))
    .reduce<Record<string, RuleModule>>(
        (acc, cur) => ({
            ...acc,
            [cur]: importDefault(join(rulesDir, cur))
        }),
        {},
    );

const recommendedRules = Object.entries(rules)
    .filter(([, rule]) => rule.meta.docs.recommended)
    .reduce(
      (acc, [name, rule]) => ({
        ...acc,
        [`${namespace}/${name}`]: rule.meta.docs.recommended,
      }),
      {},
    );

module.exports = {
    rules,
    configs: {
        recommended: {
            plugins: [namespace],
            rules: recommendedRules,
        }
    },
    environments: {
        globals: {
           /** globals env */
        },
    },
}
