import { PluginCreator } from 'postcss'

export type Options = {}

const plugin: PluginCreator<Options> = (options = {}) => {
  return {
    postcssPlugin: 'postcss-govuk-colour-palette-to-nhsuk-colour-palette',
    Declaration(decl, helper) {
      if (
        !decl.source?.input?.file?.endsWith('settings/_colours-palette.scss')
      ) {
        return
      }

      if (decl.prop !== '$nhsuk-colours') {
        return
      }

      // consider replacing the entire value
      //       decl.value = `(
      // "red": #d5281b,
      // "yellow": #ffeb3b,
      // "green": #007f3b,
      // "blue": #005eb8,
      // "purple": #330072,
      // "black": #212b32,
      // "dark-pink": #7c2855
      // )`

      decl.value = decl.value
        // red
        .replace('#d4351c', '#d5281b')
        // green
        .replace('#00703c', '#007f3b')
        // blue
        .replace('#1d70b8', '#005eb8')
        // yellow
        .replace('#ffdd00', '#ffeb3b')
        // purple
        .replace('#4c2c92', '#330072')
        // black
        .replace('#0b0c0c', '#212b32')
    },
  }
}

plugin.postcss = true

export default plugin
