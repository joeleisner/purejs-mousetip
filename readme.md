# Pure JS MouseTip
A pure javascript solution for creating tooltips that follow your mouse. This project was heavily inspired from the [MouseTip jQuery extension by Nathan Rutzky](https://github.com/nathco/jQuery.mousetip).

![A demonstration of Pure JS MouseTip in action](http://joeleisner.com/github/screenshots/purejs-mousetip/purejs-moustip-demo.gif)

## Latest Release

### [Version 2.0.1 - Bug Fixes & Optimizations](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.0.0)
This version is a minor update to fix/optimize a few things:
* Fixed a bug that would break mousetip positions set in element attributes when hovering over a child element of the target.
* Changed the constructor's mousetip state to store a DOM reference to the mousetip itself, removing two `document.getElementById(this.selector)` calls.

### [Version 2.0.0 - ES2015 Rebuild & New Features](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.0.0)
Version 2.0.0 was rebuilt from the ground up to add new features. Here's some of the changes:
* The main MouseTip constructor function is now an ES2015 class, making for easier code management and shifting towards more modern JS engines. While the default scripts (`mousetip.js` and `mousetip.min.js`) are still compatible with older browsers (using Babel.js), the ES2015 versions (`mousetip.es2015.js` and `mousetip.es2015.min.js`) will become the default in a later release.
* A bug was fixed where certain user-set CSS settings were not mapped properly to the constructor's settings.
* The `run()` method was renamed to `start()` to make more sense with the new method addition below
* A new `stop()` method was added to stop all mousetip functionality at any time
* A new `stylesheet` constructor setting was added (false by default). This allows you to specify not to include inline styles on the mousetip element, and instead expect the styling to be included in a stylesheet on the page. Element attributes will still work in this mode.
* The build system has been reworked, include upgraded/new dependencies and a change of structure. The most noticeable change is that the default scripts are now built with Babel.js; While this leads to larger file sizes, it allows for future-proofing our script and ensures more browser support with less testing.

Read about previous releases in the [changelog](changelog.md).

## Installation
```bash
$ npm install purejs-mousetip
```
Simply include the `mousetip.js` or `mousetip.min.js` script at the bottom of your document. Than initialize it by creating a new MouseTip instance, and call `.start()` on it. That's it!
```html
<script src="mousetip.min.js"></script>
<script>
    let mouseTip = new MouseTip();
    mouseTip.start();
</script>
```
You can also use the ES2015 variants if you're not concerned about supporting older browsers by using the `mousetip.es2015.js` or `mousetip.es2015.min.js` scripts instead.

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
`mousetip-enable-html` or `mousetip-disable-html` | Enables/disables the use of valid HTML within the tooltip message. | `true` | `<div mousetip mousetip-msg="<strong>Message</strong>" mousetip-enable-html></div>`

These inline/attribute adjustments will supersede default and user-set global settings.

In addition to the element attribute adjustments above, you can also set global adjustments on any instance of the MouseTip constructor:
```html
<script src="mousetip.min.js"></script>
<script>
    let mouseTip = new MouseTip({
        cssZIndex:       '1000',        // Default: '9999'
        cssPosition:     'relative',    // Default: 'absolute'
        cssPadding:      '30px',        // Default: '15px'
        cssBorderRadius: '15px',        // Default: '4px'
        cssBackground:   'white',       // Default: 'rgba(0,0,0,0.75)'
        cssColor:        'black',       // Default: '#fff'
        html:            false,         // Default: true
        position:        'top left',    // Default: 'bottom right'
        selector:        'awesomeName', // Default: 'mousetip'
        stylesheet:      true           // Default: false
    });
    mouseTip.start();
</script>
```
This will globally affect all MouseTips of that instance. Keep in mind that element attribute adjustments will supersede global adjustments.

The only global adjustments that do not have element attribute counterparts are the `selector` and `stylesheet` setting:
* `selector` changes the attribute prefix the constructor should look for on start. By default, this is set to `mousetip`.
* `stylesheet` tells the constructor not to include inline styling, and instead expects the mousetip styling to be included in some stylesheet on the page. By default, this is set to `false`, but can still be overwritten by element attributes when enabled.

## How to Build
If you're like me, and want to tweak the source files of the script yourself, you can easily get going by doing the following:

1. Clone or download the repo
2. Run `$ npm install` to download the build dependencies

Now, if you want to build while your working, simply run `$ gulp` or `$ gulp watch`, or if you want to build it out directly, run `$ gulp build`. If you'd like to build the legacy/es2015 versions independently, you can run `$ gulp build-legacy` or `$ gulp build-es2015` accordingly.

## Feedback
If you run into any problems when using this script, would like to suggest new features for this script, or need help understanding how to use this script, please put in an issue or make a pull request.
