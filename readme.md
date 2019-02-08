# Pure JS MouseTip
A pure javascript solution for creating tooltips that follow your mouse. This project was heavily inspired from the [MouseTip jQuery extension by Nathan Rutzky](https://github.com/nathco/jQuery.mousetip).

![A demonstration of Pure JS MouseTip in action](http://joeleisner.com/github/screenshots/purejs-mousetip/purejs-moustip-demo.gif)

## Latest Release

### [Version 2.1.3 - Security Vulnerability Fixes](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.1.3)
This patch update includes updated dependencies due to isses with Lodash < 4.17.11. Here's the details:
* Updated gulp-babel, gulp-header, gulp-inject-string, gulp-rename, gulp-uglify, and gulp-uglifyes to their latest versions
* Swapped babel-core and babel-preset-env with @babel/core @babel/preset-env, which required updating the Babel RC file

### [Version 2.1.2 - Gulp Watch Fix](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.1.2)
Another minor update in the same day? Yeah, I made a mistake; Here's what I fixed:
* The build-system's `gulp watch` task is now working

### [Version 2.1.1 - Security Vulnerability Fixes](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.1.1)
This minor update includes some fixes related to security vulnerabilities! Here's the details:
* Gulp was updated to 4.0 to fix security vulnerabilities
* The build-system was restructured to work with the new version of Gulp

### [Version 2.1.0 - CommonJS & ES2015 Modules](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.1.0)
This version now includes CommonJS & ES2015 modules to more easily include Pure JS MouseTip into your projects! Here's the details:
* Modules can be found in the `dist/modules` directory
* The CommonJS module exports the class as: `module.exports = MouseTip;`
* The ES2015 module exports the class as: `export default MouseTip;`

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

Now, if you want to build while your working, simply run `$ gulp` or `$ gulp watch`, or if you want to build it out directly, run `$ gulp build`. If you'd like to build the legacy/es2015 versions independently, you can run `$ gulp build-legacy` or `$ gulp build-es2015` accordingly. All modules can be built by using `$ gulp build-modules`, or individually by using `$ gulp build-commonjs-module` or `$ gulp build-es2015-module`.

## Feedback
If you run into any problems when using this script, would like to suggest new features for this script, or need help understanding how to use this script, please put in an issue or make a pull request.
