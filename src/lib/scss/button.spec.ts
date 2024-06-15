import { it, expect } from 'vitest'
import postcss from 'postcss'
import postcssScss from 'postcss-scss'
import button from './button'

const style = `////
/// @group components/button
////

/// Button component background colour
///
/// @type Colour
/// @access public

$nhsuk-button-background-colour: nhsuk-colour("green") !default;

/// Button component text colour
///
/// @type Colour
/// @access public

$nhsuk-button-text-colour: nhsuk-colour("white") !default;

/// Inverted button component background colour
///
/// @type Colour
/// @access public

$nhsuk-inverse-button-background-colour: nhsuk-colour("white") !default;

/// Inverted button component text colour
///
/// @type Colour
/// @access public

$nhsuk-inverse-button-text-colour: $nhsuk-brand-colour !default;

@include nhsuk-exports("nhsuk/component/button") {
  $nhsuk-button-colour: $nhsuk-button-background-colour;
  $nhsuk-button-text-colour: $nhsuk-button-text-colour;
  $nhsuk-button-hover-colour: nhsuk-shade($nhsuk-button-colour, 20%);
  $nhsuk-button-shadow-colour: nhsuk-shade($nhsuk-button-colour, 60%);

  // Secondary button variables
  $nhsuk-secondary-button-colour: nhsuk-colour("light-grey");
  $nhsuk-secondary-button-text-colour: nhsuk-colour("black");
  $nhsuk-secondary-button-hover-colour: nhsuk-shade($nhsuk-secondary-button-colour, 10%);
  $nhsuk-secondary-button-shadow-colour: nhsuk-shade($nhsuk-secondary-button-colour, 40%);

  // Warning button variables
  $nhsuk-warning-button-colour: nhsuk-colour("red");
  $nhsuk-warning-button-text-colour: nhsuk-colour("white");
  $nhsuk-warning-button-hover-colour: nhsuk-shade($nhsuk-warning-button-colour, 20%);
  $nhsuk-warning-button-shadow-colour: nhsuk-shade($nhsuk-warning-button-colour, 60%);

  // Inverse button variables
  $nhsuk-inverse-button-colour: $nhsuk-inverse-button-background-colour;
  $nhsuk-inverse-button-text-colour: $nhsuk-inverse-button-text-colour;
  $nhsuk-inverse-button-hover-colour: nhsuk-tint($nhsuk-inverse-button-text-colour, 90%);
  $nhsuk-inverse-button-shadow-colour: nhsuk-shade($nhsuk-inverse-button-text-colour, 30%);

  // Because the shadow (s0) is visually 'part of' the button, we need to reduce
  // the height of the button to compensate by adjusting its padding (s1) and
  // increase the bottom margin to include it (s2).
  $button-shadow-size: $nhsuk-border-width-form-element;

  .nhsuk-button {
    @include nhsuk-font($size: 19, $line-height: 19px);

    box-sizing: border-box;
    display: inline-block;
    position: relative;
    width: 100%;
    margin-top: 0;
    margin-right: 0;
    margin-left: 0;
    @include nhsuk-responsive-margin(6, "bottom", $adjustment: $button-shadow-size); // s2
    padding: (nhsuk-spacing(2) - $nhsuk-border-width-form-element) nhsuk-spacing(2)
      (nhsuk-spacing(2) - $nhsuk-border-width-form-element - ($button-shadow-size / 2)); // s1
    border: $nhsuk-border-width-form-element solid transparent;
    border-radius: 0;
    color: $nhsuk-button-text-colour;
    background-color: $nhsuk-button-colour;
    box-shadow: 0 $button-shadow-size 0 $nhsuk-button-shadow-colour; // s0
    text-align: center;
    vertical-align: top;
    cursor: pointer;
    -webkit-appearance: none;

    @include nhsuk-media-query($from: tablet) {
      width: auto;
    }

    // Ensure that any global link styles are overridden
    &:link,
    &:visited,
    &:active,
    &:hover {
      color: $nhsuk-button-text-colour;
      text-decoration: none;
    }

    // Fix unwanted button padding in Firefox
    &::-moz-focus-inner {
      padding: 0;
      border: 0;
    }

    &:hover {
      background-color: $nhsuk-button-hover-colour;
    }

    &:active {
      // Bump the button down so it looks like its being pressed in
      top: $button-shadow-size;
    }

    &:focus {
      border-color: $nhsuk-focus-colour;
      outline: $nhsuk-focus-width solid transparent;
      box-shadow: inset 0 0 0 1px $nhsuk-focus-colour;
    }

    &:focus:not(:active):not(:hover) {
      border-color: $nhsuk-focus-colour;
      color: $nhsuk-focus-text-colour;
      background-color: $nhsuk-focus-colour;
      box-shadow: 0 2px 0 $nhsuk-focus-text-colour;
    }

    // The following adjustments do not work for <input type="button"> as
    // non-container elements cannot include pseudo elements (i.e. ::before).

    // Use a pseudo element to expand the click target area to include the
    // button's shadow as well, in case users try to click it.
    &::before {
      content: "";
      display: block;

      position: absolute;

      top: -$nhsuk-border-width-form-element;
      right: -$nhsuk-border-width-form-element;
      bottom: -($nhsuk-border-width-form-element + $button-shadow-size);
      left: -$nhsuk-border-width-form-element;

      background: transparent;
    }

    // When the button is active it is shifted down by $button-shadow-size to
    // denote a 'pressed' state. If the user happened to click at the very top
    // of the button, their mouse is no longer over the button (because it has
    // 'moved beneath them') and so the click event is not fired.
    //
    // This corrects that by shifting the top of the pseudo element so that it
    // continues to cover the area that the user originally clicked, which means
    // the click event is still fired.
    //
    // 🎉
    &:active::before {
      top: -($nhsuk-border-width-form-element + $button-shadow-size);
    }
  }

  .nhsuk-button[disabled] {
    opacity: (0.5);

    &:hover {
      background-color: $nhsuk-button-colour;
      cursor: not-allowed;
    }

    &:active {
      top: 0;
      box-shadow: 0 $button-shadow-size 0 $nhsuk-button-shadow-colour; // s0
    }
  }

  .nhsuk-button--secondary {
    background-color: $nhsuk-secondary-button-colour;
    box-shadow: 0 $button-shadow-size 0 $nhsuk-secondary-button-shadow-colour;

    &,
    &:link,
    &:visited,
    &:active,
    &:hover {
      color: $nhsuk-secondary-button-text-colour;
    }

    &:hover {
      background-color: $nhsuk-secondary-button-hover-colour;

      &[disabled] {
        background-color: $nhsuk-secondary-button-colour;
      }
    }
  }

  .nhsuk-button--warning {
    background-color: $nhsuk-warning-button-colour;
    box-shadow: 0 $button-shadow-size 0 $nhsuk-warning-button-shadow-colour;

    &,
    &:link,
    &:visited,
    &:active,
    &:hover {
      color: $nhsuk-warning-button-text-colour;
    }

    &:hover {
      background-color: $nhsuk-warning-button-hover-colour;

      &[disabled] {
        background-color: $nhsuk-warning-button-colour;
      }
    }
  }

  .nhsuk-button--inverse {
    background-color: $nhsuk-inverse-button-colour;
    box-shadow: 0 $button-shadow-size 0 $nhsuk-inverse-button-shadow-colour;

    &,
    &:link,
    &:visited,
    &:active,
    &:hover {
      color: $nhsuk-inverse-button-text-colour;
    }

    &:hover {
      background-color: $nhsuk-inverse-button-hover-colour;

      &[disabled] {
        background-color: $nhsuk-inverse-button-colour;
      }
    }
  }

  .nhsuk-button--start {
    @include nhsuk-typography-weight-bold;
    @include nhsuk-font-size($size: 24, $line-height: 1);

    display: inline-flex;
    min-height: auto;

    justify-content: center;
  }

  .nhsuk-button__start-icon {
    margin-left: nhsuk-spacing(1);

    @include nhsuk-media-query($from: desktop) {
      margin-left: nhsuk-spacing(2);
    }
    vertical-align: middle;
    flex-shrink: 0;
    align-self: center;
    // Work around SVGs not inheriting color from parent in forced color mode
    // (https://github.com/w3c/csswg-drafts/issues/6310)
    forced-color-adjust: auto;
  }
}
`

it('rewrite button styles', async () => {
  const result = await postcss([button]).process(style, {
    from: 'nhsuk-frontend/packages/nhsuk-frontend/src/nhsuk/components/button/_index.scss',
    syntax: postcssScss,
  })

  expect(result.css).toMatchSnapshot()
})
