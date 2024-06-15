import { PluginCreator } from 'postcss'

export type Options = {}

const plugin: PluginCreator<Options> = (options = {}) => {
  return {
    postcssPlugin: 'postcss-govuk-colour-palette-to-nhsuk-colour-palette',
    Declaration(decl, helper) {
      if (!decl.source?.input?.file?.endsWith('settings/_colours-palette.scss')) {
        return
      }

      if (decl.prop !== '$nhsuk-colours') {
        return
      }

      decl.value = `(
  "red": #d5281b,
  "yellow": #ffeb3b,
  "green": #007f3b,
  "blue": #005eb8,
  "purple": #330072,
  "black": #212b32,
  "dark-pink": #7c2855
) !default`
    },
  }
}

plugin.postcss = true

export default plugin
