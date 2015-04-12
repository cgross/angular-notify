#angular-notify

>A minimalistic (and extensible) notification service for Angular.

[Live Demo](http://cgross.github.io/angular-notify/demo/)

Supports IE 10, and recent versions of FF and Chrome.

## Getting Started

Install with Bower or download the the files directly from the dist folder in the repo.

```bash
bower install angular-notify --save
```

Add `dist/angular-notify.js` and `dist/angular-notify.css` to your index.html.

Add `cgNotify` as a module dependency for your module.

```js
angular.module('your_app', ['cgNotify']);
```

Then inject and use the `notify` service.

```js
function myController($scope,notify){  // <-- Inject notify

  notify('Your notification message'); // <-- Call notify with your message

  notify({ message:'My message', templateUrl:'my_template.html'} );

}
```

## Options


### notify(String|Object)

The `notify` function can either be passed a string or an object.  When passing an object, the object parameters can be:

* `message` - Required.  The message to show.
* `duration` - Optional.  The duration (in milliseconds) of message.  A duration of 0 will prevent messages from closing automatically.
* `templateUrl` - Optional.  A custom template for the UI of the message.
* `classes` - Optional. A list of custom CSS classes to apply to the message element.
* `messageTemplate` - Optional. A string containing any valid Angular HTML which will be shown instead of the regular `message` text. The string must contain one root element like all valid Angular HTML templates (so wrap everything in a `<span>`).
* `scope` - Optional.  A valid Angular scope object.  The scope of the template will be created by calling `$new()` on this scope.
* `position` - Optional.  `center`, `left` and `right` are the only acceptable values.
* `container` - Optional.  Element that contains each notification.  Defaults to `document.body`.

This function will return an object with a `close()` method and a `message` property.

### notify.config(Object)

Call `config` to set the default configuration options for angular-notify.  The following options may be specified in the given object:

* `duration` - The default duration (in milliseconds) of each message.  A duration of 0 will prevent messages from closing automatically.
* `startTop` - The Y pixel value where messages will be shown.
* `verticalSpacing` - The number of pixels that should be reserved between messages vertically.
* `templateUrl` - The default message template.
* `position` - The default position of each message.  `center`, `left` and `right` are the supported values.
* `container` - The default element that contains each notification.  Defaults to `document.body`.
* `maximumOpen` - The maximum number of total notifications that can be visible at one time.  Older notifications will be closed when the maximum is reached.

### notify.closeAll()

Closes all currently open notifications.

## Providing Custom Templates

Angular-notify comes with a very simplistic default notification template.  You are encouraged to create your own template and style it appropriate to your application.  Templates can also contain more advanced features like buttons or links.  The message templates are full Angular partials that have a scope (and a controller if you use `ng-controller="YourCtrl"`).

The scope for the partial will either be descended from `$rootScope` or the scope specified in the `notify({...})` options.  The template scope will be augmented with a `$message` property, a `$classes` property, and a special `$close()` function that you may use to close the notification.

The `messageTemplate` property is also included on the scope as `$messageTemplate`.  To ensure your custom template works with the `messageTemplate` option, your template should hide the normal text if `$messageTemplate` contains a value, and should have an element with the `cg-notify-message-template` class.  The element with the `cg-notify-message-template` class will have the compiled template appended to it automatically.


## Release History
 * v2.5.0 - 04/12/2015
   * New `duration` property per notification.
   * New `position` property per notification.
   * Fix for DOM elements not being removed.
   * New `maximumOpen` config option.
   * Bump Angular dependency to 1.3.
 * v2.0.2 - 09/06/2014
   * Default template redesigned with a Bootstrap look and feel.  Default template now also includes a close button.
   * Default message location is now the top center.
   * Default message duration is now 10 seconds.
   * Default verticalSpacing is now 15px.
   * The `template` option was renamed to `templateUrl`.
   * New `messageTemplate` option added.
   * New `classes` option added.
   * Fixed an issue causing a message with multiple lines of text to be placed into the visible area too soon.
   * Fixed #4 (config() not correctly setting startTop)
 * v1.1.0 - 5/18/2014 - Added return value allowing for closing and updating of message.
 * v1.0.0 - 4/16/2014 - Significant refactoring.  
  * JQuery is no longer a required dependency.
  * [Breaking Change] Configure the default template using `config()` now instead of the `cgNotifyTemplate` value.
  * [Breaking Change] The `verticalSpacing` parameter should no longer include the height of the notification element.
  * [Breaking Change] The `scope` options must now be a valid Angular scope.
  * [Breaking Change] The duration of the notifications is now based on a `duration` config property and does not rely on the delay attribute of the CSS transition.
  * Messages can now word wrap if you use a `max-width` css value.
  * The scope for templates now includes a `$close()` function.
  * New `notify.closeAll()` method.
 * v0.2.0 - Adding custom templates ability, fixed FF bug.
 * v0.1.0 - Initial release.
