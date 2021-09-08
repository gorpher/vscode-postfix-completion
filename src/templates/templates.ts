import { ComplectionTemplate } from "../container"
import { IPostfixTemplate } from "../template"
import { BaseTemplate } from "./baseTemplate"


@ComplectionTemplate(
    { language: "go", name: "for", description: "", body: "for {{expr}} {\n{{indent}}$1\n}\n" },
    { language: "go", name: "fori", description: "", body: "for i := 0; i < {{expr}}; i++ {\n{{indent}}$1\n}\n" },
    { language: "go", name: "forr", description: "", body: "for $1,$2 := range {{expr}} {\n{{indent}}$0\n}\n" },
    { language: "go", name: "if", description: "", body: "if {{expr}} {\n{{indent}}$1\n}\n" },
    { language: "go", name: "len", description: "", body: "len({{expr}})" },

    { language: "javascript", name: "fori", description: "", body: "for (let i = 0; i < {{expr}}.length; i++) {\n{{indent}}const item = {{expr}}[i];$0\n}" },
    { language: "javascript", name: "forin", description: "", body: "for (var key in {{expr}}) {\n{{indent}} if (Object.hasOwnProperty.call({{expr}}, key)) {\n{{indent}}{{indent}}$0\n{{indent}}}\n}" },
    { language: "javascript", name: "forof", description: "", body: "for (let obj of {{expr}}) {\n{{indent}}$0\n}" },
    { language: "javascript", name: "if", description: "", body: "if ({{expr}}) {\n{{indent}}\${0}\n}" },
    { language: "javascript", name: "else", description: "", body: "if (!{{expr}}) {\n${{indent}}\${0}\n}" },
    { language: "javascript", name: "not", description: "", body: "!{{expr}}" },
    { language: "javascript", name: "return", description: "", body: "return {{expr}}" },
    { language: "javascript", name: "var", description: "", body: "var $1 = {{expr}}\n$0" },
    { language: "javascript", name: "let", description: "", body: "let $1 = {{expr}}\n$0" },
    { language: "javascript", name: "const", description: "", body: "const $1 `= {{expr}}\n$0" },
    { language: "javascript", name: "await", description: "", body: "await {{expr}}" },
    { language: "javascript", name: "log", description: "", body: "console.log({{expr}})" },
    { language: "javascript", name: "warn", description: "", body: "console.warn({{expr}})" },
    { language: "javascript", name: "error", description: "", body: "console.error({{expr}})" },


    { language: "typescript", name: "fori", description: "", body: "for (let i = 0; i < {{expr}}.length; i++) {\n{{indent}}const item = {{expr}}[i];$0\n}" },
    { language: "typescript", name: "forin", description: "", body: "for (var key in {{expr}}) {\n{{indent}} if (Object.hasOwnProperty.call({{expr}}, key)) {\n{{indent}}{{indent}}$0\n{{indent}}}\n}" },
    { language: "typescript", name: "forof", description: "", body: "for (let obj of {{expr}}) {\n{{indent}}$0\n}" },
    { language: "typescript", name: "if", description: "", body: "if ({{expr}}) {\n{{indent}}\${0}\n}" },
    { language: "typescript", name: "else", description: "", body: "if (!{{expr}}) {\n${{indent}}\${0}\n}" },
    { language: "typescript", name: "not", description: "", body: "!{{expr}}" },
    { language: "typescript", name: "return", description: "", body: "return {{expr}}" },
    { language: "typescript", name: "var", description: "", body: "var $1 = {{expr}}\n$0" },
    { language: "typescript", name: "let", description: "", body: "let $1 = {{expr}}\n$0" },
    { language: "typescript", name: "const", description: "", body: "const $1 `= {{expr}}\n$0" },
    { language: "typescript", name: "await", description: "", body: "await {{expr}}" },
    { language: "typescript", name: "log", description: "", body: "console.log({{expr}})" },
    { language: "typescript", name: "warn", description: "", body: "console.warn({{expr}})" },
    { language: "typescript", name: "error", description: "", body: "console.error({{expr}})" },


    { language: "rust", name: "assert", description: "", body: "assert_eq!({{expr}},$1);$0" },
    { language: "rust", name: "ok", description: "", body: "Ok({{expr}})" },
    { language: "rust", name: "par", description: "", body: "({{expr}})" },
    { language: "rust", name: "println", description: "", body: 'println!("{:?}", {{expr}});' },
    { language: "rust", name: "def", description: "", body: '&{{expr}}' },
    { language: "rust", name: "deref", description: "", body: '*{{expr}}' },
    { language: "rust", name: "defm", description: "", body: '&mut {{expr}}' },
    { language: "rust", name: "some", description: "", body: 'Some({{expr}})' },
    { language: "rust", name: "err", description: "", body: ' Err({{expr}})' },
    { language: "rust", name: "lambda", description: "", body: '|| {{expr}}' },
    { language: "rust", name: "for", description: "", body: 'for $1 in {{expr}} {\n${{indent}}\${0}\n}' },


)
class ImplTemplate extends BaseTemplate implements IPostfixTemplate {

    constructor(public language: string, public name: string, public description: string, public body: string) {
        super(language, name, description, body)
    }
    getLanguage(): string {
        return this.language
    }
    canUse(inlineText: string): boolean {
        return true
    }
}
