/**
 * @fileoverview 不允许使用http拼接字符串
 * @author Jy
 */
"use strict";

import { createRule } from '../utils';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const HTTP_START_REGEX = /https?:\/\/(.*)/;

function check(value: string | undefined = '') {
    return HTTP_START_REGEX.test(value);
}

const description = 'no use http prefix url';

function replacer(matcher: string, $1: string) {
    return `'//${$1}'`;
}

export default createRule({
    name: __dirname,
    meta: {
        docs: {
            description,
            recommended: 'warn',
        },
        messages: {
            noHttpPrefix: 'no use http prefix url',
        },
        fixable: 'code',
        schema: [],
        type: 'suggestion',
    },
    defaultOptions: [],
    create(context) {
        return {
            Literal: (node) => {
                const value = (node?.value ?? '') as string;
                if (check(value)) {
                    context.report({
                        node,
                        messageId: 'noHttpPrefix',
                        fix: function (fixer) {
                            return fixer.replaceText(node, value.replace(HTTP_START_REGEX, replacer));
                        },
                    })
                }
            },
            TemplateLiteral: (node) => {
                const firstTemplateElement = node.quasis[0];
                if (check(firstTemplateElement?.value?.raw)) {
                    context.report({
                        node,
                        messageId: 'noHttpPrefix',
                        fix: function (fixer) {
                            const text = firstTemplateElement?.value?.raw;
                            return fixer.replaceText(node.quasis[0], text.replace(HTTP_START_REGEX, (_matcher, $1) => '`' + '//' + $1 + '${'));
                        }
                    });
                }
            }
        };
    },
})
