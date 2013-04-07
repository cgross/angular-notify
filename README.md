angular-notify
==============

A minimalistic notification service for angular.


### Dependencies

* JQuery
* Angular (obviously)


### Using

* Copy `dist/angular-notify.js` or `dist/angular-notify.min.js` and `dist/angular-notify.css` into your project and add them to your html. 
* Add `notify` as a module dependency in your module creation call. 
* Then call it like this:

```js
function myController($scope,notify){  // <-- Inject notify

  $scope.myMethod = function(){
    
    notify('Your notification message'); // <-- Call notify with your message
    
  };

}
```

### Configuring

Call `notify.config' to change the default top location and vertical spacing ala:

```js
  notify.config({top:100,verticalSpacing:50});
```

Each message is given `notify-message` css class.  You may override the defaults on that 
class to change the display and format of the messages.