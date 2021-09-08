// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import * as _ from 'lodash'
import {  ICustomTemplateDefinition } from './templates/baseTemplate'
import { PostfixCompletionProvider } from './postfixCompletionProvider'
import glob = require('glob')
import { iocContainer } from './container'
import ts = require('typescript')


let completionProvider: vscode.Disposable

// this method is called when your extension is activated
// your extension is activated the very first ti me the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "vscode-postfix-extension" is now active!')

	registerCompletionProvider(context)

	console.log('start')
	
	  
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (!e.affectsConfiguration('postfix_complection')) {
		  return
		}
	
		if (completionProvider) {
		  const idx = context.subscriptions.indexOf(completionProvider)
		  context.subscriptions.splice(idx, 1)
		  completionProvider.dispose()
		}
	
		registerCompletionProvider(context)
	}))
}

function registerCompletionProvider (context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration('postfix_complection')
	const templates = config.get<ICustomTemplateDefinition[]>('templates')
	let containers = initIocContainer()
	
	if (templates) {
		const languages =  _.uniq(_.concat(Object.keys(containers.templates),templates.map(t => t.language)))
	   for (const i in languages) {
		const language=languages[i]
		const provider = new PostfixCompletionProvider(language)
		const DOCUMENT_SELECTOR: vscode.DocumentSelector = language
		completionProvider = vscode.languages.registerCompletionItemProvider(DOCUMENT_SELECTOR, provider, '.')
		context.subscriptions.push(completionProvider)
	   }
	}
}
  
function initIocContainer(){
	const files = glob.sync('./templates/*.js', { cwd: __dirname })
	files.forEach(path => {require(path)})
	return iocContainer
}
// this method is called when your extension is deactivated
export function deactivate() {}
