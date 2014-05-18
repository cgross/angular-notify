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

  notify({ message:'My message', template:'my_template.html'} );

}
```

## Options


### notify(String|Object)

The `notify` function can either be passed a string or an object.  When passing an object, the object parameters can be:

* `message` - Required.  The message to show.
* `template` - Optional.  A custom template for the UI of the message.
* `scope` - Optional.  A valid Angular scope object.  The scope of the template will be created by calling `$new()` on this scope.
* `position` - Optional.  Currently `center` is the only acceptable value.  This will calculate and apply the correct negative `margin-left` offset needed to center a fixed positioned div.
* `container` - Optional.  Element that contains each notification.  Defaults to `document.body`.

This function will return an object with a `close()` method and a `message` property.

### notify.config(Object)

Call `config` to set the default configuration options for angular-notify.  The following options may be specified in the given object:

* `duration` - The default duration (in milliseconds) of each message.
* `startTop` - The Y pixel value where messages will be shown.
* `verticalSpacing` - The number of pixels that should be reserved between messages vertically.
* `template` - The default message template.
* `position` - The default position of each message.  Currently only `center` and `right` are the supported values.
* `container` - The default element that contains each notification.  Defaults to `document.body`.

### notify.closeAll()

Closes all currently open notifications.

## Providing Custom Templates

Angular-notify comes with a very simplistic default notification template.  You are encouraged to create your own template and style it appropriate to your application.  Templates can also contain more advanced features like buttons or links.  The message templates are full Angular partials that have a scope (and a controller if you use `ng-controller="YourCtrl"`).

The scope for the partial will either be descended from `$rootScope` or the scope specified in your `notify({...})` options.  Regardless, the template scope will be augmented with a special `$close()` function that you may use to close the notification.


## Release History
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
