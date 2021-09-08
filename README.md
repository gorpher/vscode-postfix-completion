# vscode-postfix-completion

Postfix templates for TypeScript/JavaScript/GO/Rust/More.

## Features
- secondary development builds its own postfix template.
- support for multiple languages.
- support for custom configuration.



## Extension Settings

```json
{
   "postfix_complection.templates": [
      {
         "name": ":",
         "language":"go",
         "description": "Assigns the expression to a new variable by using :=.",
         "body": "$1 := {{expr}}\n$0"
     },
     {
         "name": "if",
         "language":"javascript",
         "description": "Creates if statement from given boolean expression.",
         "body": "if ({{expr}}) {\n{{indent}}${0}\n}"
      },
   ],

}


```
## TODO

- Analytical expression,depending on the type of data ,to provider a corresponding template


## Release Notes

### 0.0.1
replace the line expression text.

