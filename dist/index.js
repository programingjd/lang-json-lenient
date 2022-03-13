import { parser } from '@lezer/json-lenient';
import { LRLanguage, indentNodeProp, continuedIndent, foldNodeProp, foldInside, LanguageSupport } from '@codemirror/language';
import { styleTags, tags } from '@codemirror/highlight';

/// A language provider that provides JSON parsing.
const jsonLanguage = /*@__PURE__*/LRLanguage.define({
    parser: /*@__PURE__*/parser.configure({
        props: [
            /*@__PURE__*/indentNodeProp.add({
                Object: /*@__PURE__*/continuedIndent({ except: /^\s*\}/ }),
                Array: /*@__PURE__*/continuedIndent({ except: /^\s*\]/ })
            }),
            /*@__PURE__*/foldNodeProp.add({
                "Object Array": foldInside,
                BlockComment(tree) { return { from: tree.from + 2, to: tree.to - 2 }; }
            }),
            /*@__PURE__*/styleTags({
                String: tags.string,
                Number: tags.number,
                "True False": tags.bool,
                PropertyName: tags.propertyName,
                Null: tags.null,
                ",": tags.separator,
                "[ ]": tags.squareBracket,
                "{ }": tags.brace,
                LineComment: tags.lineComment,
                BlockComment: tags.blockComment
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
    return new LanguageSupport(jsonLanguage);
}

export { json, jsonLanguage };
