import fs from 'node:fs'
import postcss from 'postcss'
import postcssScss from 'postcss-scss'

import button from './scss/button'
import colourPalette from './scss/colour-palette'

const processScss = async (input: string, destination: string) => {
  const result = await postcss([button, colourPalette]).process(input, {
    from: destination,
    syntax: postcssScss,
  })

  fs.writeFileSync(destination, result.css)
}

export default processScss