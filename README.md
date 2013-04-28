angular-notify
==============

A minimalistic notification service for angular.

[Live Demo](http://cgross.github.io/angular-notify/demo/)

## Dependencies

* JQuery
* Angular (obviously)

## Using

* Copy `dist/angular-notify.js` and `dist/angular-notify.css` (or the min versions) into your project and add them to your index.html. 
* Add `cgNotify` as a module dependency in your module creation call. 
* Then call it like this:

```js
function myController($scope,notify){  // <-- Inject notify

  $scope.myMethod = function(){
    
    notify('Your notification message'); // <-- Call notify with your message

    notify({message:'My message',template:'my_template.html',scope:{ extraStuff: 'abc' } )
    
  };

}
```

## Options 

The `notify` service can either be passed a string or an object.  When passing an object, the object parameters can be:

* `message` - Required.  The message to show.
* `template` - Optional.  A custom template for the UI of the message.
* `scope` - Optional.  An object containing values that will be placed on the scope of the message template.  Useful when providing custom templates.

## Providing Custom Templates

You can define custom templates per message(as shown above) or change the global default template.  To change the global default template just provide a new 
`$injector` value for `cgNotifyTemplateName`.  Ex:

 ```js
angular.module('yourapp').value('cgNotifyTemplateName','your_custom_template_here.html');
```

Templates are full, normal Angular partials and are placed on a new scope descending from `$rootScope`.  You may provide other data for the scope by using the `scope` parameter mentioned above.

## Configuring

Call `notify.config' to change the default top location and vertical spacing ala:

```js
  notify.config({top:100,verticalSpacing:50});
```

The animated transitions implemented using CSS3 transitions (no IE<10 support).  The duration of the message visibility is controlled by the delay of the opacity transition.  You may therefore alter this delay to keep messages visible for longer.

## Release History

 * v0.2.0 - Adding custom templates ability, fixed FF bug.
 * v0.1.0 - Initial release.
