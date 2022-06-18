'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsonLenient = require('@lezer/json-lenient');
var language = require('@codemirror/language');

/// A language provider that provides JSON parsing.
const jsonLanguage = language.LRLanguage.define({
    parser: jsonLenient.parser.configure({
        props: [
            language.indentNodeProp.add({
                Object: language.continuedIndent({ except: /^\s*\}/ }),
                Array: language.continuedIndent({ except: /^\s*\]/ }),
                "String BlockComment": () => -1
            }),
            language.foldNodeProp.add({
                "Object Array": language.foldInside,
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
    return new language.LanguageSupport(jsonLanguage);
}

exports.json = json;
exports.jsonLanguage = jsonLanguage;
