import {parser} from "@lezer/json-lenient"
import {continuedIndent, indentNodeProp, foldNodeProp, foldInside, LRLanguage, LanguageSupport} from "@codemirror/language"

/// A language provider that provides JSON parsing.
export const jsonLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Object: continuedIndent({except: /^\s*\}/}),
        Array: continuedIndent({except: /^\s*\]/}),
        "String BlockComment": () => -1
      }),
      foldNodeProp.add({
        "Object Array": foldInside,
        BlockComment(tree) { return {from: tree.from + 2, to: tree.to - 2} }
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["[", "{", '"']},
    commentTokens: {line: '//', block: {open: '/*', close: '*/'}},
    indentOnInput: /^\s*[\}\]]$/
  }
})

/// JSON language support.
export function json() {
  return new LanguageSupport(jsonLanguage)
}
