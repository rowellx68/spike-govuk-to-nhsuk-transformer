import { PluginCreator } from 'postcss'

export type Options = {}

const plugin: PluginCreator<Options> = (options = {}) => {
  return {
    postcssPlugin: 'postcss-govuk-font-faces-to-nhsuk-font-faces',
    AtRule(atRule, helper) {
      if (
        atRule.source?.input?.file?.endsWith('helpers/_font-faces.scss') &&
        atRule.name === 'mixin' &&
        atRule.params === '_nhsuk-font-face-gds-transport'
      ) {
        atRule.params = '_nhsuk-font-face-frutiger'
      } else if (
        atRule.source?.input?.file?.endsWith('helpers/_font-faces.scss') &&
        atRule.name === 'at-root'
      ) {
        atRule.removeAll()
        atRule.append(
          new helper.AtRule({
            raws: {
              before: '\n      ',
              afterName: ' ',
            },
            name: 'font-face',
            nodes: [
              new helper.Declaration({
                raws: {
                  before: '\n        ',
                },
                prop: 'font-display',
                value: 'swap',
              }),
              new helper.Declaration({
                prop: 'font-family',
                value: '"Frutiger W01"',
              }),
              new helper.Declaration({
                prop: 'font-style',
                value: 'normal',
              }),
              new helper.Declaration({
                prop: 'font-weight',
                value: 'normal',
              }),
              new helper.Declaration({
                prop: 'src',
                value: 'nhsuk-font-url("FrutigerLTW01-55Roman.eot?#iefix")',
              }),
              new helper.Declaration({
                prop: 'src',
                value: `nhsuk-font-url("FrutigerLTW01-55Roman.eot?#iefix") format("eot"),
        nhsuk-font-url("FrutigerLTW01-55Roman.woff2") format("woff2"),
        nhsuk-font-url("FrutigerLTW01-55Roman.woff") format("woff"),
        nhsuk-font-url("FrutigerLTW01-55Roman.ttf") format("truetype"),
        nhsuk-font-url("FrutigerLTW01-55Roman.svg#7def0e34-f28d-434f-b2ec-472bde847115") format("svg")`,
              }),
            ],
          }),
          new helper.AtRule({
            raws: {
              afterName: ' ',
              before: '\n\n      ',
            },
            name: 'font-face',
            nodes: [
              new helper.Declaration({
                prop: 'font-display',
                value: 'swap',
              }),
              new helper.Declaration({
                prop: 'font-family',
                value: '"Frutiger W01"',
              }),
              new helper.Declaration({
                prop: 'font-style',
                value: 'normal',
              }),
              new helper.Declaration({
                prop: 'font-weight',
                value: 'bold',
              }),
              new helper.Declaration({
                prop: 'src',
                value: 'nhsuk-font-url("FrutigerLTW01-65Bold.eot?#iefix")',
              }),
              new helper.Declaration({
                prop: 'src',
                value: `nhsuk-font-url("FrutigerLTW01-65Bold.eot?#iefix") format("eot"),
        nhsuk-font-url("FrutigerLTW01-65Bold.woff2") format("woff2"),
        nhsuk-font-url("FrutigerLTW01-65Bold.woff") format("woff"),
        nhsuk-font-url("FrutigerLTW01-65Bold.ttf") format("truetype"),
        nhsuk-font-url("FrutigerLTW01-65Bold.svg#7def0e34-f28d-434f-b2ec-472bde847115") format("svg")`,
              }),
            ],
          }),
        )
      } else if (
        atRule.source?.input?.file?.endsWith('helpers/_typography.scss') &&
        atRule.name === 'mixin' &&
        atRule.params ===
          'nhsuk-typography-common($font-family: $nhsuk-font-family)'
      ) {
        atRule.walkAtRules('if', (rule) => {
          if (rule.params === '$nhsuk-include-default-font-face') {
            rule.walkAtRules('include', (ruleInclude) => {
              if (ruleInclude.params === '_nhsuk-font-face-gds-transport') {
                ruleInclude.replaceWith(
                  new helper.AtRule({
                    name: 'include',
                    params: '_nhsuk-font-face-frutiger',
                  }),
                )
              }
            })
          }
        })
      }
    },
    Declaration(decl) {
      if (
        decl.source?.input?.file?.endsWith('settings/_typography-font.scss')
      ) {
        if (decl.prop === '$nhsuk-font-family') {
          decl.value = '"Frutiger W01", arial, sans-serif !default'
        } else if (decl.prop === '$nhsuk-include-default-font-face') {
          decl.value =
            'if(index($nhsuk-font-family, "Frutiger W01"), true, false) !default'
        }
      } else if (decl.source?.input?.file?.endsWith('settings/_assets.scss')) {
        if (decl.prop === '$nhsuk-fonts-path') {
          decl.value = '"https://assets.nhs.uk/fonts/" !default'
        }
      }
    },
  }
}

plugin.postcss = true

export default plugin
