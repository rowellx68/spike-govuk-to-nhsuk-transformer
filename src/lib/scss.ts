import fs from 'node:fs'
import postcss from 'postcss'
import postcssScss from 'postcss-scss'

import button from './scss/button'
import colourPalette from './scss/colour-palette'
import fontFaces from './scss/font-faces'
import insetText from './scss/inset-text'
import breadcrumbs from './scss/breadcrumbs'

const processScss = async (input: string, destination: string) => {
  const result = await postcss([
    button,
    colourPalette,
    fontFaces,
    insetText,
    breadcrumbs,
  ]).process(input, {
    from: destination,
    syntax: postcssScss,
  })

  fs.writeFileSync(destination, result.css)
}

export default processScss
