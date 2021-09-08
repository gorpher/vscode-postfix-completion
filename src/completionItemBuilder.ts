import * as vscode from 'vscode'
import { adjustMultilineIndentation, getIndentCharacters, indent } from './utils/utils'

const COMPLETION_ITEM_TITLE = 'Postfix Complection'

export class CompletionItemBuilder {
  private item: vscode.CompletionItem
  private code: string
  private line: number
  private firstNonhitespaceCharacterIndex: number
  private dotIdx: number
  constructor(name: string, inlineText: string, line: number, firstNonhitespaceCharacterIndex: number, dotIdx: number) {
    this.item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Snippet)
    this.item.detail = COMPLETION_ITEM_TITLE
    this.firstNonhitespaceCharacterIndex = firstNonhitespaceCharacterIndex
    // this.code = adjustMultilineIndentation(inlineText, 4)
    this.code = inlineText.substr(firstNonhitespaceCharacterIndex)
    this.line = line
    this.dotIdx = dotIdx
  }

  public static create = (label: string, inlineText: string, line: number, firstNonhitespaceCharacterIndex: number, dotIdx: number) => new CompletionItemBuilder(label, inlineText, line, firstNonhitespaceCharacterIndex, dotIdx)

  public description = (description: string) => {
    this.item.detail = this.item.detail + " (" + description + ")"
    return this
  }
  public command = (command: vscode.Command) => {
    this.item.command = command
    return this
  }

  public insertText = (insertText?: string) => {
    this.item.insertText = insertText
    return this
  }

  public replace = (replacement: string, useSnippets?: boolean): CompletionItemBuilder => {
    if (useSnippets) {
      const escapedCode = this.code.replace('$', '\\$')
      this.item.insertText = new vscode.SnippetString(replacement.replace(new RegExp('{{expr}}', 'g'), escapedCode).replace(new RegExp('{{indent}}', 'g'), getIndentCharacters()))
    } else {
      this.item.insertText = replacement.replace(new RegExp('{{expr}}', 'g'), this.code).replace(new RegExp('{{indent}}', 'g'), getIndentCharacters())
    }


    const rangeToDelete = new vscode.Range(
      new vscode.Position(this.line, this.firstNonhitespaceCharacterIndex),
      new vscode.Position(this.line, this.dotIdx + 1) // accomodate 1 character for the dot
    )

    this.item.additionalTextEdits = [
      vscode.TextEdit.delete(rangeToDelete)
    ]

    return this
  }

  public example = (document: string): CompletionItemBuilder => {
    this.item.documentation = document.replace(/{{expr}}/, this.code).replace(/{{indent}}/, indent())

    return this
  }

  public build = () => this.item
}
