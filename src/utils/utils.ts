import * as vscode from 'vscode'

export const getIndentCharacters = () => {
  if (vscode.window.activeTextEditor?.options.insertSpaces) {
    return ' '.repeat(vscode.window.activeTextEditor.options.tabSize as number)
  } else {
    return '\t'
  }
}
export const indent = getIndentCharacters


export const AllTabs = /^\t+$/
export const AllSpaces = /^ +$/

export function adjustMultilineIndentation(code: string, indentSize?: number) {
  if (!indentSize) {
    return code
  }

  const reNewLine = /\r?\n/
  const lines = code.split(reNewLine)

  if (lines.length === 1) {
    return code
  }

  const newLine = reNewLine.exec(code)

  return lines.map((line, i) => i > 0 ? stripLineIndent(line, indentSize) : line)
    .join(newLine ? newLine[0] : "")
}

function stripLineIndent(line: string, indentSize: number) {
  const whitespacesMatch = /^[\t ]+/.exec(line)
  if (!whitespacesMatch) {
    return line
  }

  const whitespaces = whitespacesMatch[0]

  if (AllTabs.test(whitespaces) && indentSize <= whitespaces.length) {
    return line.substring(indentSize)
  }

  const tabSize = vscode.window.activeTextEditor?.options.tabSize as number

  if (AllSpaces.test(whitespaces) && indentSize <= (whitespaces.length / tabSize)) {
    return line.substring(indentSize * tabSize)
  }

  return line
}
