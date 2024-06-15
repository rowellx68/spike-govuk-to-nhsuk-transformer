import { PluginCreator } from 'postcss'

export type Options = {}

const plugin: PluginCreator<Options> = (options = {}) => {
  return {
    postcssPlugin: 'postcss-govuk-button-to-nhsuk-button',
    AtRule(atRule, helper) {
      // Only continue if the source file is the button
      if (
        !atRule.source?.input?.file?.endsWith('components/button/_index.scss')
      ) {
        return
      }

      if (atRule.params !== 'nhsuk-exports("nhsuk/component/button")') {
        return
      }

      // remove comments and declarations relating to the warning button
      atRule.walkComments((comment) => {
        if (comment.text.match(/(w|W)arning/)) {
          comment.remove()
        }
      })

      atRule.walkDecls((decl) => {
        if (decl.prop.match(/\$nhsuk-warning-button-.*/)) {
          decl.remove()
        }
      })

      // update the button styles
      atRule.walkRules((rule) => {
        if (rule.selector === '.nhsuk-button') {
          rule.walkDecls((decl) => {
            // remove margin-left and margin-right
            if (decl.prop.match(/margin-(left|right)/)) {
              decl.remove()
            }
            // update the border-radius
            else if (decl.prop === 'border-radius') {
              decl.replaceWith(
                new helper.Declaration({
                  prop: 'border-radius',
                  value: '4px',
                }),
              )
            }
            // update the padding
            else if (decl.prop === 'padding') {
              decl.replaceWith(
                new helper.Declaration({
                  prop: 'padding',
                  value: '12px nhsuk-spacing(3)',
                }),
              )
            }
            // update the width
            else if (decl.prop === 'width') {
              decl.replaceWith(
                new helper.Declaration({
                  prop: 'width',
                  value: 'auto',
                }),
              )
            }
            // add font weight
            else if (decl.prop === 'color') {
              decl.after(
                new helper.Declaration({
                  prop: 'font-weight',
                  value: '600',
                }),
              )
            }
          })

          rule.walkAtRules((ruleAtRule) => {
            // add padding to the media query
            if (
              ruleAtRule.name === 'include' &&
              ruleAtRule.params === 'nhsuk-media-query($from: tablet)'
            ) {
              ruleAtRule.before(
                new helper.AtRule({
                  name: 'include',
                  params: 'nhsuk-media-query($until: tablet)',
                  nodes: [
                    new helper.Declaration({
                      prop: 'padding',
                      value: 'nhsuk-spacing(2) nhsuk-spacing(3)',
                    }),
                    new helper.Comment({
                      raws: {
                        before: ' ',
                        left: ' ',
                        right: ' ',
                      },
                      text: 's2',
                    }),
                  ],
                }),
              )
            }
            // update the font mixin
            else if (
              ruleAtRule.name === 'include' &&
              ruleAtRule.params === 'nhsuk-font($size: 19, $line-height: 19px)'
            ) {
              ruleAtRule.replaceWith(
                new helper.AtRule({
                  name: 'include',
                  params: 'nhsuk-font($size: 19)',
                }),
              )
            }
          })
        }
        // remove the warning and start button styles
        else if (
          rule.selector.match(/\.nhsuk-button(--warning|--start|__start-icon)/)
        ) {
          rule.remove()
        }
      })
    },
  }
}

plugin.postcss = true

export default plugin
