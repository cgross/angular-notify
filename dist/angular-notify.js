(function() {
  'use strict';

  angular.module('cgNotify', [])
    .provider('notify', notifyProvider);

  var defaultOptions;
  function notifyProvider() {

    defaultOptions = {
      startTop: 10,
      verticalSpacing: 15,
      duration: 10000,
      templateUrl: 'angular-notify.html',
      position: 'center',
      container: document.body,
      maximumOpen: 0
    };

    return {
      setDefaults: setDefaults,
      $get: notifyService
    };

    function setDefaults(options) {
      angular.extend(defaultOptions, options);
    }
  }

  notifyService.$inject = [
    '$timeout',
    '$http',
    '$compile',
    '$templateCache',
    '$rootScope'
  ];


  function notifyService($timeout, $http, $compile, $templateCache, $rootScope) {

    var messageElements = [];
    var openNotificationsScope = [];

    var notify = function notify(args) {

      args = setupArgs(args);

      var scope = args.scope ? args.scope.$new() : $rootScope.$new();
      scope.$position = args.position;
      scope.$message = args.message;
      scope.$classes = args.classes;
      scope.$messageTemplate = args.messageTemplate;

      if (args.maximumOpen > 0) {
        var numToClose = (openNotificationsScope.length + 1) - args.maximumOpen;
        for (var i = 0; i < numToClose; i++) {
          openNotificationsScope[i].$close();
        }
      }

      $http.get(args.templateUrl, {
        cache: $templateCache
      }).success(function(template) {

        var templateElement = $compile(template)(scope);
        templateElement.bind('webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd', function(e) {
          if (e.propertyName === 'opacity' || e.currentTarget.style.opacity === 0 ||
            (e.originalEvent && e.originalEvent.propertyName === 'opacity')) {

            templateElement.remove();
            messageElements.splice(messageElements.indexOf(templateElement), 1);
            openNotificationsScope.splice(openNotificationsScope.indexOf(scope), 1);
            layoutMessages();
          }
        });

        if (args.messageTemplate) {
          var messageTemplateElement;
          for (var i = 0; i < templateElement.children().length; i++) {
            if (angular.element(templateElement.children()[i]).hasClass('cg-notify-message-template')) {
              messageTemplateElement = angular.element(templateElement.children()[i]);
              break;
            }
          }
          if (messageTemplateElement) {
            messageTemplateElement.append($compile(args.messageTemplate)(scope));
          } else {
            throw new Error('cgNotify could not find the .cg-notify-message-template element in ' + args.templateUrl + '.');
          }
        }

        angular.element(args.container).append(templateElement);
        messageElements.push(templateElement);

        if (scope.$position === 'center') {
          $timeout(function() {
            scope.$centerMargin = '-' + (templateElement[0].offsetWidth / 2) + 'px';
          });
        }

        scope.$close = function() {
          templateElement.css('opacity', 0).attr('data-closing', 'true');
          layoutMessages();
        };

        var layoutMessages = function() {
          var j = 0;
          var currentY = args.startTop;
          for (var i = messageElements.length - 1; i >= 0; i--) {
            var shadowHeight = 10;
            var element = messageElements[i];
            var height = element[0].offsetHeight;
            var top = currentY + height + shadowHeight;
            if (element.attr('data-closing')) {
              top += 20;
            } else {
              currentY += height + args.verticalSpacing;
            }
            element.css('top', top + 'px').css('margin-top', '-' + (height + shadowHeight) + 'px').css('visibility', 'visible');
            j++;
          }
        };

        $timeout(function() {
          layoutMessages();
        });

        if (args.duration > 0) {
          $timeout(function() {
            scope.$close();
          }, args.duration);
        }

      }).error(function(data) {
        throw new Error('Template specified for cgNotify (' + args.templateUrl + ') could not be loaded. ' + data);
      });

      var retVal = {};

      retVal.close = function() {
        if (scope.$close) {
          scope.$close();
        }
      };

      Object.defineProperty(retVal, 'message', {
        get: function() {
          return scope.$message;
        },
        set: function(val) {
          scope.$message = val;
        }
      });

      openNotificationsScope.push(scope);

      return retVal;

    };

    notify._defaultOptions = defaultOptions;
    notify._setupArgs = setupArgs;

    notify.closeAll = function() {
      for (var i = messageElements.length - 1; i >= 0; i--) {
        var element = messageElements[i];
        element.css('opacity', 0);
      }
    };

    return notify;
  }

  function setupArgs(args) {
    if (typeof args !== 'object') {
      args = {
        message: args
      };
    }

    args.startTop = args.startTop || defaultOptions.startTop;
    args.verticalSpacing = args.verticalSpacing || defaultOptions.verticalSpacing;
    args.duration = args.duration || defaultOptions.duration;
    args.position = args.position || defaultOptions.position;
    args.templateUrl = args.templateUrl ||  defaultOptions.templateUrl;
    args.container = args.container || defaultOptions.container;
    args.classes = args.classes || '';
    args.maximumOpen = args.maximumOpen || defaultOptions.maximumOpen;

    return args;
  }
})();

angular.module('cgNotify').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-notify.html',
    "<div class=\"cg-notify-message\" ng-class=\"[$classes,\n" +
    "    $position === 'center' ? 'cg-notify-message-center' : '',\n" +
    "    $position === 'left' ? 'cg-notify-message-left' : '',\n" +
    "    $position === 'right' ? 'cg-notify-message-right' : '']\"\n" +
    "    ng-style=\"{'margin-left': $centerMargin}\">\n" +
    "\n" +
    "    <div ng-show=\"!$messageTemplate\">\n" +
    "        {{$message}}\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"$messageTemplate\" class=\"cg-notify-message-template\">\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"cg-notify-close\" ng-click=\"$close()\">\n" +
    "        <span aria-hidden=\"true\">&times;</span>\n" +
    "        <span class=\"cg-notify-sr-only\">Close</span>\n" +
    "    </button>\n" +
    "\n" +
    "</div>\n"
  );

}]);
