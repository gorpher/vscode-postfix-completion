import * as assert from 'assert'
import { after, describe, it } from 'mocha'
import ts = require('typescript')
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
import { getIndentCharacters } from '../../utils/utils'
import { delay, getCurrentDelay } from './utils'
// import * as myExtension from '../../extension'

suite('Utils Test Suite', () => {
    vscode.window.showInformationMessage('Utils Test Suite.')
    after(() => {
        vscode.window.showInformationMessage('Utils Test done.')
    })
    test('getIndentCharacters when spaces', () => {
        const result = getIndentCharacters()
        assert.strictEqual(true, vscode.window.activeTextEditor?.options.insertSpaces)
        assert.strictEqual(4, vscode.window.activeTextEditor?.options.tabSize)
        assert.strictEqual(result, '    ')
    })

})


