import { TSESLint } from '@typescript-eslint/utils';
import { espreeParser } from '../../utils';
import rule from '../no-http-prefix';

const ruleTester = new TSESLint.RuleTester({
    parser: espreeParser,
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'module',
    }
});

ruleTester.run('no-http-prefix', rule, {
    valid: ["'//' + 'text'"],
    invalid: [
        {
            code: "'http://' + window._portalHost",
            errors: [{
                messageId: 'noHttpPrefix'
            }],
            output: "'//' + window._portalHost"
        },
        {
            code: "location.href = `http://${window._portalHost}`",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: 'noHttpPrefix'
            }],
            output: "location.href = `//${window._portalHost}`",
        },
        {
            code: "window.open(`http://${window._portalHost}${a}`)",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                messageId: 'noHttpPrefix'
            }],
            output: "window.open(`//${window._portalHost}${a}`)",
        },
        {
            code: "'http://www.baidu.com'",
            errors: [{
                messageId: 'noHttpPrefix'
            }],
            output: "'//www.baidu.com'"
        },
    ],
})