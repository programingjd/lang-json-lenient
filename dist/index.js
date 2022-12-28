import { parser } from '@lezer/json-lenient';
import { LRLanguage, indentNodeProp, continuedIndent, foldNodeProp, foldInside, LanguageSupport } from '@codemirror/language';

/// A language provider that provides JSON parsing.
const jsonLanguage = /*@__PURE__*/LRLanguage.define({
    name: 'json-lenient',
    parser: /*@__PURE__*/parser.configure({
        props: [
            /*@__PURE__*/indentNodeProp.add({
                Object: /*@__PURE__*/continuedIndent({ except: /^\s*\}/ }),
                Array: /*@__PURE__*/continuedIndent({ except: /^\s*\]/ }),
                "String BlockComment": () => -1
            }),
            /*@__PURE__*/foldNodeProp.add({
                "Object Array": foldInside,
                BlockComment(tree) { return { from: tree.from + 2, to: tree.to - 2 }; }
            })
        ]
    }),
    languageData: {
        closeBrackets: { brackets: ["[", "{", '"'] },
        commentTokens: { line: '//', block: { open: '/*', close: '*/' } },
        indentOnInput: /^\s*[\}\]]$/
    }
});
/// JSON language support.
function json() {
    return new LanguageSupport(jsonLanguage);
}

export { json, jsonLanguage };
