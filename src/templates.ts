import * as vscode from 'vscode'
import * as glob from 'glob'
import { IPostfixTemplate } from './template'
import { CustomTemplate } from './templates/customTemplate'
import { iocContainer } from './container'
import { CompletionItemBuilder } from './completionItemBuilder'
import { ICustomTemplateDefinition } from './templates/baseTemplate'
export const loadCustomTemplates = (language: string) => {
  const config = vscode.workspace.getConfiguration('postfix_complection')
  const templates = config.get<ICustomTemplateDefinition[]>('templates')
  if (templates) {
    return templates.filter(v => v.language === language).filter(v => v.language && v.name && v.body).map(t => new CustomTemplate(t.language, t.name, t.description, t.body) as IPostfixTemplate)
  }
  return []
}

export const loadBuiltinTemplates = (language: string) => {
  const templates = iocContainer.loadTemplates(language) as IPostfixTemplate[]
  return templates
}


