import * as vsc from 'vscode'

export interface IPostfixTemplate {

  getLanguage(): string

  buildCompletionItem(inlineText: string, line: number , firstNonhitespaceCharacterIndex:number, dotIdx: number): vsc.CompletionItem

  canUse(inlineText: string): boolean
}

