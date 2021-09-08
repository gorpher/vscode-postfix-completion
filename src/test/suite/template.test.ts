import * as assert from 'assert'
import _ = require('lodash')
import { after, describe, it, afterEach } from 'mocha'
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode'
import { getCurrentSuggestion, resetCurrentSuggestion } from '../../postfixCompletionProvider'
import { delay, getCurrentDelay } from './utils'
// import * as myExtension from '../../extension'

const LANGUAGE = 'javascript'

const VAR_TEMPLATES = ['var', 'let', 'const']
const FOR_TEMPLATES = ['for', 'forof', 'foreach']
const CONSOLE_TEMPLATES = ['log', 'warn', 'error']
const IF_TEMPLATES = ['if', 'else', 'null', 'notnull', 'undefined', 'notundefined']
const CAST_TEMPLATES = ['cast', 'castas']
const TYPE_TEMPLATES = ['promisify']
const ALL_TEMPLATES = [
    ...VAR_TEMPLATES,
    ...FOR_TEMPLATES,
    ...CONSOLE_TEMPLATES,
    ...IF_TEMPLATES,
    ...CAST_TEMPLATES,
    'not',
    'return',
    'new'
]

suite('Template Test Suite', async () => {
    // describe('Template usage', () => {
    //     afterEach(done => {
    //         vscode.commands.executeCommand('workbench.action.closeOtherEditors').then(() => done(), err => done(err))
    //     })
    //    testTemplateUsage('identifier expression', 'expr', ALL_TEMPLATES)
    // })

    let initText = 'expr.'
    let doc = await vscode.workspace.openTextDocument({ language: LANGUAGE })
    const editor = await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)
    await editor.edit(edit => edit.insert(new vscode.Position(0, 0), initText))
    await vscode.commands.executeCommand('vscode.executeSignatureHelpProvider', editor.document.uri, new vscode.Position(0, initText.length - 1))
    // await vscode.commands.executeCommand('vscode.executeCompletionItemProvider', editor.document.uri, new vscode.Position(0, initText.length - 1))
    await vscode.commands.executeCommand('editor.action.triggerSuggest')
    console.log("done")
})

function testTemplateUsage(testDescription: string, initialText: string, expectedTemplates: string[]) {
    it(testDescription, (done: Mocha.Done) => {
        vscode.workspace.openTextDocument({ language: LANGUAGE }).then((doc) => {
            return getAvailableSuggestions(doc, initialText).then(templates => {
                assert.deepStrictEqual(_.sortBy(templates), _.sortBy(expectedTemplates))
                done()
            }).then(undefined, (reason) => {
                done(reason)
            })
        })
    })
}

async function getAvailableSuggestions(doc: vscode.TextDocument, initialText: string) {
    const editor = await vscode.window.showTextDocument(doc, vscode.ViewColumn.One)

    let cursorIdx = initialText.indexOf('{cursor}')
    if (cursorIdx > -1) {
        initialText = initialText.replace('{cursor}', '.')
    } else {
        initialText += '.'
        cursorIdx = initialText.length
    }

    if (await editor.edit(edit => edit.insert(new vscode.Position(0, 0), initialText))) {
        const pos = new vscode.Position(0, cursorIdx - 1)
        // editor.selection = new vscode.Selection(pos, pos)

        resetCurrentSuggestion()
        // 
        console.log(vscode.env)
        console.log(await vscode.languages.getLanguages())

        await vscode.commands.executeCommand('vscode.executeSignatureHelpProvider', editor.document.uri,
            pos)
        // await vscode.commands.executeCommand('vscode.executeCompletionItemProvider',
        // editor.document.uri,
        // pos,'.')

        await delay(getCurrentDelay())

        const firstSuggestion = getCurrentSuggestion()
        const suggestions = firstSuggestion ? [firstSuggestion] : []

        await delay(400)

        while (true) {
            await vscode.commands.executeCommand('selectNextSuggestion')

            const current = getCurrentSuggestion()

            if (current === undefined || suggestions.indexOf(current) > -1) {
                break
            }

            suggestions.push(current)
        }

        return suggestions
    }
}

