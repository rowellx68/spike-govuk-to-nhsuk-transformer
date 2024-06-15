import { it, expect } from 'vitest'
import postcss from 'postcss'
import postcssScss from 'postcss-scss'
import colourPalette from './colour-palette'

const style = `////
/// @group settings/colours
////

/// Colour palette
///
/// @type Map
///
/// @prop $colour - Representation for the given $colour, where $colour is the
///   friendly name for the colour (e.g. "red": #ff0000);
///
/// @access public

$nhsuk-colours: (
  "red": #d4351c,
  "yellow": #ffdd00,
  "green": #00703c,
  "blue": #1d70b8,
  "dark-blue": #003078,
  "light-blue": #5694ca,
  "purple": #4c2c92,
  "black": #0b0c0c,
  "dark-grey": #505a5f,
  "mid-grey": #b1b4b6,
  "light-grey": #f3f2f1,
  "white": #ffffff,
  "light-purple": #6f72af,
  "bright-purple": #912b88,
  "pink": #d53880,
  "light-pink": #f499be,
  "orange": #f47738,
  "brown": #b58840,
  "light-green": #85994b,
  "turquoise": #28a197
) !default;
`

it('converts the colour palette', async () => {
  const result = await postcss([colourPalette]).process(style, {
    from: 'nhsuk-frontend/packages/nhsuk-frontend/src/nhsuk/settings/_colours-palette.scss',
    syntax: postcssScss,
  })

  expect(result.css).toMatchSnapshot()
})