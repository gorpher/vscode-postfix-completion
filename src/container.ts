import { toNamespacedPath } from "path"
import { IPostfixTemplate } from "./template"
import { BaseTemplate } from "./templates/baseTemplate"
type Constructor<T = any> = new (...args: any[]) => T

export type StringKey<T = any> = { [key in string]: T }

export type InstanceContainerType = {
  postfixTemplates: StringKey<Array<IPostfixTemplate>>
}

interface ComplectionTemplateDefinition {
  language: string;
  name: string;
  description: string;
  body: string;
}

function isPostfixTemplate(props: any) {
  return typeof (props)['getLanguage'] !== 'undefined' &&
    typeof (props)['buildCompletionItem'] !== 'undefined' &&
    typeof (props)['canUse'] !== 'undefined'
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export function ComplectionTemplate(...templates: ComplectionTemplateDefinition[]) {
  return (c: Constructor) => {
    if (isPostfixTemplate(c.prototype) && c.prototype instanceof BaseTemplate) {
      for (const template of templates) {
        // console.log("loading template ==> ", "[", c.name, "]", template)
        iocContainer.loadTemplates(template.language).push(new c(template.language, template.name, template.description, template.body))
      }
    }
  }
}

class IocContainer {
  private readonly instanceContainer: InstanceContainerType = {
    postfixTemplates: {}
  }

  public templates() {
    if (this.instanceContainer.postfixTemplates) {
    }
    return this.instanceContainer.postfixTemplates
  }

  public loadTemplates(language: string) {
    if (!this.instanceContainer.postfixTemplates[language]) {
      this.instanceContainer.postfixTemplates[language] = []
    }
    return this.instanceContainer.postfixTemplates[language]
  }
}



export const iocContainer = new IocContainer()