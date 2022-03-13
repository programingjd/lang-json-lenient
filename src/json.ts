import {parser} from "@lezer/json-lenient"
import {continuedIndent, indentNodeProp, foldNodeProp, foldInside, LRLanguage, LanguageSupport} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

/// A language provider that provides JSON parsing.
export const jsonLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Object: continuedIndent({except: /^\s*\}/}),
        Array: continuedIndent({except: /^\s*\]/})
      }),
      foldNodeProp.add({
        "Object Array": foldInside,
        BlockComment(tree) { return {from: tree.from + 2, to: tree.to - 2} }
      }),
      styleTags({
        String: t.string,
        Number: t.number,
        "True False": t.bool,
        PropertyName: t.propertyName,
        Null: t.null,
        ",": t.separator,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        LineComment: t.lineComment,
        BlockComment: t.blockComment
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["[", "{", '"']},
    indentOnInput: /^\s*[\}\]]$/
  }
})

/// JSON language support.
export function json() {
  return new LanguageSupport(jsonLanguage)
}
