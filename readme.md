<p align="center"><img alt="Pure JS Mousetip icon" src="images/icon.png?raw=true" width="60" /></p>
<h1 align="center">Pure JS Mousetip</h1>

A vanilla javascript solution for creating tooltips that follow your mouse. Check out the comprehensive guide at https://mousetip.joeleisner.com.

<p><img alt="A cursor moves over an element creating a tooltip that follows the cursor's movement" src="images/demo.gif" width="100%" /></p>

## Changelog

### [Version 3.0.0](https://github.com/joeleisner/purejs-mousetip/releases/tag/v3.0.0)

Pure JS Mousetip has been overhauled from the ground up to support some killer new features. Here's what you can look forward to:

- Styling improvements galore!
    - The default styles have been tweaked to use more modern rules, such as `rem` instead of `px` for `padding`/`border-radius`, the use of `background-color` instead of `background`, and more.
    - Animations are here! They are enabled by default, but they can be turned off or changed as you see fit.
    - Global styles are now stored within a `<style>` tag within the head of the page, created on `start()` and removed on `stop()`.
- Global adjustments have been simplified, cleaned up, and extended.
    - The `position` adjustment has been renamed `direction` to distinguish it from CSS position.
    - All style adjustments can be made under the `style` adjustment object, alleviating the need to prefix them with `css`.
    - A new `animations` adjustment is available! This can be set to a boolean to enable/disable mousetip animations, or it can be set to an object to adjust animation settings such as duration, from/to transform/opacity, timing, and more.
- Local attributes have been simplified and extended as well!
    - Style attributes no longer need the `css-` prefix, and have been renamed to more closely resemble they're CSS rules.
    - A new `mousetip:style` attribute to alleviate the need for multiple style attributes or to style the mousetip locally beyond what's included.
    - Shorthand variants are now a thing! Hate typing out `mousetip:background-color="..."`? Try `mt:bc="..."` instead.
- Optimizations have been made to make things faster and less resource intensive.
    - Elements can be passed into the `.start()` method to override the default behavior of searching the document for mousetip targets, allowing Pure JS Mousetip to be more easily integrated into other JS libraries, such as React.
    - For each target element using Pure JS Mousetip, there's 2 event listeners instead of 3.
    - `window.requestAnimationFrame` is used for each update to a mousetip's position.

Plus more! There's a lot to in this update to get excited about.

Checkout the [changelog](changelog.md) for previous release information.

## Installation
```shell
# NPM Package
npm i purejs-mousetip

# Repo
git clone git@github.com:joeleisner/joeleisner/purejs-mousetip.git
cd purejs-mousetip
npm i
```

## Development
```shell
# Build all production assets
npm run build

# Build all development assets and spin up a local server
npm run develop
npm run dev
npm run start
```

## Author
**Joel Eisner**
* [Twitter (@joeleisner)](https://twitter.com/joeleisner)
* [GitHub (@joeleisner)](https://github.com/joeleisner)

## Credits

A special thanks to [Nathan Rutzky](https://github.com/nathco) for creating the [MouseTip jQuery extension](https://github.com/nathco/jQuery.mousetip) that heavily inspired this project.