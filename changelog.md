# Changelog

## Current releases

### [Version 3.0.0](https://github.com/joeleisner/purejs-mousetip/releases/tag/v3.0.0)

Pure JS Mousetip has been overhauled from the ground up to support some killer new features. Here's what you can look forward to:

- Styling improvements galore!
    - The default styles have been tweaked to use more modern rules, such as `rem` instead of `px` for `padding`/`border-radius`, the use of `background-color` instead of `background`, and more.
    - Animations are here! They are enabled by default, but they can be turned off or changed as you see fit.
    - Global styles are now stored within a `<style>` tag within the head of the page, created on `start()` and removed on `stop()`.
- Global adjustments have been simplified, cleaned up, and extended.
    - The `position` adjustment has been renamed `direction` to distinguish it from CSS position.
    - All style adjustments can be made under the `style` adjustment object, alleviating the need to prefix them with `css`.
    - A new `animations` adjustment is available! This can be set to a boolean to enable/disable mousetip animations, or it can be set to an object to adjust animation settings such as duration, from/to, timing, and more.
- Local attributes have been simplified and extended as well!
    - Style attributes no longer need the `css-` prefix, and have been renamed to more closely resemble they're CSS rules.
    - A new `mousetip-style` attribute to alleviate the need for multiple style attributes or to style the mousetip locally beyond what's included.
    - Shorthand variants are now a thing! Hate typing out `mousetip:background-color="..."`? Try `mt:bc="..."` instead.
- Optimizations have been made to make things faster and less resource intensive.
    - For each element using Pure JS Mousetip, there's 2 event listeners instead of 3.
    - `window.requestAnimationFrame` is used for each update to a mousetip's position.

Plus more! There's a lot to in this update to get excited about.

## Previous releases

### [Version 2.1.5 - Security Vulnerability Fixes](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.1.5)
This patch includes updates dependencies due to security vulnerabilities:
* Updated `@babel/core` and `@babel/preset-env` to their latest versions
* Updated `gulp-header` to its latest version

### [Version 2.1.4 - Minor upgrades](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.1.4)
This patch update includes updated dependencies and a new setting for MouseTip:
* Added npm scripts to alleviate the need for Gulp CLI to be installed globally
* Updated Babel core/preset-env and Gulp to their latest versions
* Replaced gulp-uglifyes with gulp-terser
* Added the ability to set a default message within MouseTip's constructor function

### [Version 2.1.3 - Security Vulnerability Fixes](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.1.3)
This patch update includes updated dependencies due to issues with Lodash < 4.17.11. Here's the details:
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

### [Version 2.0.1 - Bug Fixes & Optimizations](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.0.1)
This version is a minor update to fix/optimize a few things:
* Fixed a bug that would break mousetip positions set in element attributes when hovering over a child element of the target.
* Changed the constructor's mousetip state to store a DOM reference to the mousetip itself, removing two `document.getElementById(this.selector)` calls.

### [Version 2.0.0 - ES2015 Rebuild & New Features](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.0.0)
Version 2.0.0 was rebuilt from the ground up to add new features. Here's some of the changes:
* The main MouseTip constructor function is now an ES2015 class, making for easier code management and shifting towards more modern JS engines. While the default scripts (`mousetip.js` and `mousetip.min.js`) are still compatible with older browsers (transpiled using Babel.js), the ES2015 versions (`mousetip.es2015.js` and `mousetip.es2015.min.js`) will become the default in a later release.
* A bug was fixed where certain user-set CSS settings were not mapped properly to the constructor's settings.
* The `run()` method was renamed to `start()` to make more sense with the new method addition below
* A new `stop()` method was added to stop all mousetip functionality at any time
* A new `stylesheet` constructor setting was added (false by default). This allows you to specify not to include inline styles on the mousetip element, and instead expect the styling to be included in a stylesheet on the page. Element attributes will still work in this mode.
* The build system has been reworked, include upgraded/new dependencies and a change of structure. The most noticeable change is that the default scripts are now built with Babel.js; While this leads to larger file sizes, it allows for future-proofing our script and ensures more browser support with less testing.

### [Version 1.2.3 - NPM Publish Issues](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.2.3)
This release is exactly the same as 1.2.2, except with the version number incremented up by one. Unfortunately, I had mistakenly published a version 1.2.2 a while back and cannot overwrite this unpublished version. Instead of letting release versions get out of sync between the repo and the NPM package, I'm pushing this change to set things straight again.

### [Version 1.2.2 - Build System Improvements](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.2.2)
This update includes some build-system improvements:
* All build-system javascript now utilizes ES2015 (ES6) syntax
* Removed the `clean` task from Gulp

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

### [Version 1.1.0 - New Selector Setting](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.1.0)
Added new MouseTip constructor setting **selector**
* Now you can namespace every MouseTip instance
* When a custom selector is passed into the settings, MouseTip will look for attributes with that new namespace (i.e. "awesomeName" instead of "mousetip", "awesomeName-css-zindex" instead of "mousetip-css-zindex")
* Check out the *How to Use* section in readme.md to see this new setting in action

### [Version 1.0.1 - First Release (Bug Fixes)](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.0.1)
Simple bug fixes:
* Updated the bindMouseMove function to utilize pageX/pageY instead of clientX/clientY
* Fixed missing-semicolon JSHint warnings in the mousetip script

### [Version 1.0.0 - First Release](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.0.0)
Version 1.0.0 is here, and it includes an entirely new way to use the PureJS MouseTip script!
* The script is now wrapped in a MouseTip constructor function instead of a self-executing function
* The script can now take global style/position overrides when an instance of the constructor is created
* The script will not find the MouseTip elements or bind mouse events until a constructor instance's .run() function is called

### [Version 0.0.1 - Early Alpha](https://github.com/joeleisner/purejs-mousetip/releases/tag/v0.0.1)
This javascript tool is still in its early stages, so give me some feedback, contribute, and help make it better!