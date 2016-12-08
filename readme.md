# Pure JS MouseTip
A pure javascript solution for creating tooltips that follow your mouse. This project was heavily inspired from the [MouseTip jQuery extension by Nathan Rutzky](https://github.com/nathco/jQuery.mousetip).

![A demonstration of the javascript in action](http://joeleisner.com/github/screenshots/purejs-mousetip/purejs-moustip-demo.gif)

## Changelog

### [Version 1.2.1 - Bug Fixes & Optimizations](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.2.1)
Minor updates have been made. Here's what's changed:
* MouseTip can now be installed by NPM! (Check out the Installation section)
* By default, MouseTip now runs with HTML capabilities turned on
* Elements are not selected until `this.run()` is called
* Linting warnings squashed
* Build system optimized

### [Version 1.2.0 - HTML Messages](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.2.0)
Added HTML capabilities within MouseTip messages!
* By default, MouseTip runs with HTML capabilities turned off
* HTML capabilities can be enabled globally via `html: true` in the global settings object
* HTML capabilities can be enabled/disabled individually via the `mousetip-enable-html` or `mousetip-disable-html` attribute

Read about previous version changes in the [changelog](changelog.md)

## Installation
```bash
$ npm install purejs-mousetip
```
Simply include the `mousetip.js` or `mousetip.min.js` script at the bottom of your document. Than initialize it by creating a new MouseTip instance, and calling .run() on it. That's it!
```html
<script src="mousetip.min.js"></script>
<script>
    var mouseTip = new MouseTip();
    mouseTip.run();
</script>
```

## How to Use
Create an element and give it the `mousetip` attribute as well as a `mousetip-msg` attribute with the message you'd like the tooltip to display. Check out the live demo at [joeleisner.com/purejs-mousetip](http://joeleisner.com/purejs-mousetip)
```html
<div class="box" mousetip mousetip-msg="I'm a message!"></div>
<div class="box" mousetip mousetip-msg="I'm another message!"></div>
```
There are also other attributes you can use on your MouseTip elements to tweak your tooltips:

Attribute | Description | Default | Example
--- | --- | --- | ---
`mousetip-pos` | Alters the vertical/horizontal alignment of the tooltip relative to the mouse cursor. The attribute takes a string that is space separated, the first value for vertical alignment, and the second value for horizontal alignment. The vertical alignment options are `bottom`, `center`, `top`, and the horizontal alignment options are `right`, `center`, `left` (Warning: the use of `center center` is not advised; causes flickering) | `bottom right` | `<div mousetip mousetip-msg="Message" mousetip-pos="top left"></div>`
`mousetip-css-zindex` | Alters the CSS z-index of the tooltip | `9999` | `<div mousetip mousetip-msg="Message" mousetip-css-zindex="1000"></div>`
`mousetip-css-position` | Alters the CSS position of the tooltip | `absolute` | `<div mousetip mousetip-msg="Message" mousetip-css-position="relative"></div>`
`mousetip-css-padding` | Alters the CSS padding of the tooltip | `15px` | `<div mousetip mousetip-msg="Message" mousetip-css-padding="30px"></div>`
`moutstip-css-borderradius` | Alters the CSS border-radius of the tooltip | `4px` | `<div mousetip mousetip-msg="Message" mousetip-css-borderradius="15px"></div>`
`mousetip-css-background` | Alters the CSS background color of the tooltip | `rgba(0,0,0,0.75)` | `<div mousetip mousetip-msg="Message" mousetip-css-background="white"></div>`
`mousetip-css-color` | Alters the CSS text color of the tooltip | `#fff` | `<div mousetip mousetip-msg="Message" mousetip-css-color="black"></div>`
`mousetip-enable-html` or `mousetip-disable-html` | Enables/disables the use of valid HTML within the tooltip message. | `false` | `<div mousetip mousetip-msg="<strong>Message</strong>" mousetip-enable-html></div>`

These inline/attribute adjustments will supersede default and user-set global settings.

In addition to the per-element adjustments above, you can also set global adjustments on any instance of the MouseTip constructor:
```html
<script src="mousetip.min.js"></script>
<script>
    var mouseTip = new MouseTip({
        cssZIndex: '1000', // Default: '9999'
        cssPosition: 'relative', // Default: 'absolute'
        cssPadding: '30px', // Default: '15px'
        cssBorderRadius: '15px', // Default: '4px'
        cssBackground: 'white', // Default: 'rgba(0,0,0,0.75)'
        cssColor: 'black', // Default: '#fff'
        html: true, // Default: false
        position: 'top left', // Default: 'bottom right'
        selector: 'awesomeName' // Default: 'mousetip'
    });
    mouseTip.run();
</script>
```
This will globally affect all MouseTips of that instance. Keep in mind that inline/attribute adjustments will supersede global adjustments.

## How to Build
If you're like me, and want to tweak the source files of the script yourself, you can easily get going by doing the following:

1. Clone or download the repo
2. Run `$ npm install` to download the build dependencies

Now, if you want to build while your working, simply run `$ gulp` or `$ gulp watch`, or if you want to build it out directly, run `$ gulp compile`.

## Feedback
If you run into any problems when using this script, would like to suggest new features for this script, or need help understanding how to use this script, please contact me via email at [jeisner93@gmail.com](mailto:jeisner93@gmail.com) or via GitHub [@joeleisner](https://github.com/joeleisner)
