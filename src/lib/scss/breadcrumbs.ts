import { PluginCreator } from 'postcss'

export type Options = {}

const plugin: PluginCreator<Options> = (options = {}) => {
  return {
    postcssPlugin: 'postcss-govuk-breadcrumbs-to-nhsuk-breadcrumbs',
    AtRule(atRule, helper) {
      // Only continue if the source file is the breadcrumbs
      if (
        !atRule.source?.input?.file?.endsWith(
          'components/breadcrumbs/_index.scss',
        )
      ) {
        return
      }

      if (
        atRule.name === 'include' &&
        atRule.params === 'nhsuk-link-style-text'
      ) {
        atRule.replaceWith(
          new helper.AtRule({
            name: 'include',
            params: 'nhsuk-link-style-default',
          }),
        )
      }
    },
  }
}

plugin.postcss = true

export default plugin
