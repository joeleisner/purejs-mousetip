# Change Log

### [Version 2.0.1 - Bug Fixes & Optimizations](https://github.com/joeleisner/purejs-mousetip/releases/tag/v2.0.0)
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

## [Version 1.1.0 - New Selector Setting](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.1.0)
Added new MouseTip constructor setting **selector**
* Now you can namespace every MouseTip instance
* When a custom selector is passed into the settings, MouseTip will look for attributes with that new namespace (i.e. "awesomeName" instead of "mousetip", "awesomeName-css-zindex" instead of "mousetip-css-zindex")
* Check out the *How to Use* section in readme.md to see this new setting in action

## [Version 1.0.1 - First Release (Bug Fixes)](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.0.1)
Simple bug fixes:
* Updated the bindMouseMove function to utilize pageX/pageY instead of clientX/clientY
* Fixed missing-semicolon JSHint warnings in the mousetip script

## [Version 1.0.0 - First Release](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.0.0)
Version 1.0.0 is here, and it includes an entirely new way to use the PureJS MouseTip script!
* The script is now wrapped in a MouseTip constructor function instead of a self-executing function
* The script can now take global style/position overrides when an instance of the constructor is created
* The script will not find the MouseTip elements or bind mouse events until a constructor instance's .run() function is called

## [Version 0.0.1 - Early Alpha](https://github.com/joeleisner/purejs-mousetip/releases/tag/v0.0.1)
This javascript tool is still in its early stages, so give me some feedback, contribute, and help make it better!
