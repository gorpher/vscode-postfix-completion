import { CompletionItemBuilder } from "../completionItemBuilder"
import { IPostfixTemplate } from "../template"
import * as vscode from 'vscode'

export interface ICustomTemplateDefinition {
  name: string
  language: string
  description: string
  body: string
}

export abstract class BaseTemplate implements IPostfixTemplate {

    abstract getLanguage(): string
    
    constructor(public language: string,
      public name: string,
      public description: string,
      public body: string,
    ) {}
  
    buildCompletionItem(inlineText: string, line: number, firstNonhitespaceCharacterIndex:number, dotIdx: number): vscode.CompletionItem {
      return CompletionItemBuilder
        .create(this.name, inlineText, line, firstNonhitespaceCharacterIndex, dotIdx)
        .description(this.description)
        .example(this.body)
        .replace(this.body, true)
        .build()
    }
    abstract canUse(inlineText: string): boolean
  }
  