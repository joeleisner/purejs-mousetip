# Pure JS MouseTip
A pure javascript solution for creating tooltips that follow your mouse. This project was heavily inspired from the [MouseTip jQuery extension by Nathan Rutzky](https://github.com/nathco/jQuery.mousetip).

## Installation
Simply include the `mousetip.js` or `mousetip.min.js` script at the bottom of your document. That's it!
```html
<script src="mousetip.min.js"></script>
```

## How to Use
Create an element and give it the `mousetip` attribute as well as a `mousetip-msg` attribute with the message you'd like the tooltip to display. Check out the live demo at [joeleisner.com/purejs-mousetip](http://joeleisner.com/purejs-mousetip)
```html
<div class="box" mousetip mousetip-msg="I'm a message!"></div>
<div class="box" mousetip mousetip-msg="I'm another message!"></div>
```
There are also other attributes you can use to tweak your tooltip:
Attribute | Description | Default | Example
--- | --- | --- | ---
`mousetip-pos` | Alters the vertical/horizontal alignment of the tooltip relative to the mouse cursor. The attribute takes a string that is space separated, the first value for vertical alignment, and the second value for horizontal alignment. The vertical alignment options are `bottom`, `center`, `top`, and the horizontal alignment options are `right`, `center`, `left` (Warning: the use of `center center` is not advised; causes flickering) | `bottom right` | `<div mousetip mousetip-msg="Message" mousetip-pos="top left"></div>`
`mousetip-css-zindex` | Alters the CSS z-index of the tooltip | `9999` | `<div mousetip mousetip-msg="Message" mousetip-css-zindex="1000"></div>`
`mousetip-css-position` | Alters the CSS position of the tooltip | `absolute` | `<div mousetip mousetip-msg="Message" mousetip-css-position="relative"></div>`
`mousetip-css-padding` | Alters the CSS padding of the tooltip | `15px` | `<div mousetip mousetip-msg="Message" mousetip-css-padding="30px"></div>`
`moutstip-css-borderradius` | Alters the CSS border-radius of the tooltip | `4px` | `<div mousetip mousetip-msg="Message" mousetip-css-borderradius="15px"></div>`
`mousetip-css-background` | Alters the CSS background color of the tooltip | `rgba(0,0,0,0.75)` | `<div mousetip mousetip-msg="Message" mousetip-css-background="white"></div>`
`mousetip-css-color` | Alters the CSS text color of the tooltip | `#fff` | `<div mousetip mousetip-msg="Message" mousetip-css-color="black"></div>`

## How to Build
If you're like me, and want to tweak the source files of the script yourself, you can easily get going by doing the following:
1. Clone or download the repo
2. Run `$ npm install` to download the build dependencies
Now, if you want to build while your working, simply run `$ gulp` or `$ gulp watch`, or if you want to build it out directly, run `$ gulp build`.

## Feedback
If you run into any problems when using this script, would like to suggest new features for this script, or need help in understanding out how to use this script, please contact me via email at [jeisner93@gmail.com](mailto:jeisner93@gmail.com) or via GitHub [@joeleisner](https://github.com/joeleisner)
