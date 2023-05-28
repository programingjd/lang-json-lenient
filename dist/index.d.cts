import { LRLanguage, LanguageSupport } from '@codemirror/language';

declare const jsonLanguage: LRLanguage;
declare function json(): LanguageSupport;

export { json, jsonLanguage };
