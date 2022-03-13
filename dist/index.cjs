'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsonLenient = require('@lezer/json-lenient');
var language = require('@codemirror/language');
var highlight = require('@codemirror/highlight');

/// A language provider that provides JSON parsing.
const jsonLanguage = language.LRLanguage.define({
    parser: jsonLenient.parser.configure({
        props: [
            language.indentNodeProp.add({
                Object: language.continuedIndent({ except: /^\s*\}/ }),
                Array: language.continuedIndent({ except: /^\s*\]/ })
            }),
            language.foldNodeProp.add({
                "Object Array": language.foldInside,
                BlockComment(tree) { return { from: tree.from + 2, to: tree.to - 2 }; }
            }),
            highlight.styleTags({
                String: highlight.tags.string,
                Number: highlight.tags.number,
                "True False": highlight.tags.bool,
                PropertyName: highlight.tags.propertyName,
                Null: highlight.tags.null,
                ",": highlight.tags.separator,
                "[ ]": highlight.tags.squareBracket,
                "{ }": highlight.tags.brace,
                LineComment: highlight.tags.lineComment,
                BlockComment: highlight.tags.blockComment
            })
        ]
    }),
    languageData: {
        closeBrackets: { brackets: ["[", "{", '"'] },
        indentOnInput: /^\s*[\}\]]$/
    }
});
/// JSON language support.
function json() {
    return new language.LanguageSupport(jsonLanguage);
}

exports.json = json;
exports.jsonLanguage = jsonLanguage;
