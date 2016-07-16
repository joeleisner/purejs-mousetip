# Pure JS MouseTip
A pure javascript solution for creating tooltips that follow your mouse. This project was heavily inspired from the [MouseTip jQuery extension by Nathan Rutzky](https://github.com/nathco/jQuery.mousetip).

![A demonstration of the javascript in action](http://joeleisner.com/github/screenshots/purejs-mousetip/purejs-moustip-demo.gif)

## Change Log
### Version 1.1.0
Added new MouseTip constructor setting **selector**
- Now you can namespace every MouseTip instance
- When a custom selector is passed into the settings, MouseTip will look for attributes with that new namespace (i.e. "awesomeName" instead of "mousetip", "awesomeName-css-zindex" instead of "mousetip-css-zindex")
- See the *How to Use* section to see this new setting in action

### Version 1.0.1
Simple bug fixes:
- Updated the bindMouseMove function to utilize pageX/pageY instead of clientX/clientY
- Fixed missing-semicolon JSHint warnings in the mousetip script

### Version 1.0.0
Version 1.0.0 is here, and it includes an entirely new way to use the PureJS MouseTip script!
- The script is now wrapped in a MouseTip constructor function instead of a self-executing function
- The script can now take global style/position overrides when an instance of the constructor is created
- The script will not find the MouseTip elements or bind mouse events until a constructor instance's .run() function is called

## Installation
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
Now, if you want to build while your working, simply run `$ gulp` or `$ gulp watch`, or if you want to build it out directly, run `$ gulp build`.

## Feedback
If you run into any problems when using this script, would like to suggest new features for this script, or need help in understanding out how to use this script, please contact me via email at [jeisner93@gmail.com](mailto:jeisner93@gmail.com) or via GitHub [@joeleisner](https://github.com/joeleisner)
