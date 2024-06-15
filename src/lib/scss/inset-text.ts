import { PluginCreator } from 'postcss'

export type Options = {}

const plugin: PluginCreator<Options> = (options = {}) => {
  return {
    postcssPlugin: 'postcss-govuk-inset-text-to-nhsuk-inset-text',
    Declaration(decl, helper) {
      if (
        !decl.source?.input?.file?.endsWith('components/inset-text/_index.scss')
      ) {
        return
      }

      if (decl.prop === 'border-left') {
        decl.replaceWith(
          new helper.Declaration({
            prop: 'border-left',
            value: '$nhsuk-border-width-wide solid nhsuk-colour("blue")',
          }),
        )
      }
    },
  }
}

plugin.postcss = true

export default plugin
