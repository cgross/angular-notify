angular.module('cgNotify', []).factory('notify',['$timeout','$http','$compile','$templateCache','$rootScope',
    function($timeout,$http,$compile,$templateCache,$rootScope){

        var startTop = 10;
        var verticalSpacing = 15;
        var duration = 10000;
        var defaultTemplateUrl = 'angular-notify.html';
        var position = 'center';
        var container = document.body;

        var messageElements = [];

        var notify = function(args){

            if (typeof args !== 'object'){
                args = {message:args};
            }

            args.templateUrl = args.templateUrl ? args.templateUrl : defaultTemplateUrl;
            args.position = args.position ? args.position : position;
            args.container = args.container ? args.container : container;
            args.classes = args.classes ? args.classes : '';
            args.duration = args.duration ? args.duration : duration;

            var scope = args.scope ? args.scope.$new() : $rootScope.$new();
            scope.$message = args.message;
            scope.$classes = args.classes;
            scope.$messageTemplate = args.messageTemplate;

            $http.get(args.templateUrl,{cache: $templateCache}).success(function(template){

                var templateElement = $compile(template)(scope);
                templateElement.bind('webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd', function(e){
                    if (e.propertyName === 'opacity' ||
                        (e.originalEvent && e.originalEvent.propertyName === 'opacity')){

                        templateElement.remove();
                        messageElements.splice(messageElements.indexOf(templateElement),1);
                        layoutMessages();
                    }
                });

                if (args.messageTemplate){
                    var messageTemplateElement;
                    for (var i = 0; i < templateElement.children().length; i ++){
                        if (angular.element(templateElement.children()[i]).hasClass('cg-notify-message-template')){
                            messageTemplateElement = angular.element(templateElement.children()[i]);
                            break;
                        }
                    }
                    if (messageTemplateElement){
                        messageTemplateElement.append($compile(args.messageTemplate)(scope));
                    } else {
                        throw new Error('cgNotify could not find the .cg-notify-message-template element in '+args.templateUrl+'.');
                    }
                }

                angular.element(args.container).append(templateElement);
                messageElements.push(templateElement);

                switch (args.position){
                    case 'center':  templateElement.addClass('cg-notify-message-center');
                                    templateElement.css('margin-left','-' + (templateElement[0].offsetWidth /2) + 'px');
                                    break;
                    case 'left':    templateElement.addClass('cg-notify-message-left');
                                    break;
                    case 'right':   templateElement.addClass('cg-notify-message-right');
                                    break;
                }

                scope.$close = function(){
                    templateElement.css('opacity',0).attr('data-closing','true');
                    layoutMessages();
                };

                var layoutMessages = function(){
                    var currentY = startTop;
                    for(var i = messageElements.length - 1; i >= 0; i --){
                        var shadowHeight = 10;
                        var element = messageElements[i];
                        var height = element[0].offsetHeight;
                        var top = currentY + height + shadowHeight;
                        if (element.attr('data-closing')){
                            top += 20;
                        } else {
                            currentY += height + verticalSpacing;
                        }
                        element.css('top',top + 'px').css('margin-top','-' + (height+shadowHeight) + 'px').css('visibility','visible');
                    }
                };

                $timeout(function(){
                    layoutMessages();
                });

                if (args.duration > 0){
                    $timeout(function(){
                        scope.$close();
                    },args.duration);
                }

            }).error(function(data){
                    throw new Error('Template specified for cgNotify ('+args.templateUrl+') could not be loaded. ' + data);
            });

            var retVal = {};
            
            retVal.close = function(){
                if (scope.$close){
                    scope.$close();
                }
            };

            Object.defineProperty(retVal,'message',{
                get: function(){
                    return scope.$message;
                },
                set: function(val){
                    scope.$message = val;
                }
            });

            return retVal;

        };

        notify.config = function(args){
            startTop = angular.isDefined(args.startTop) ? args.startTop : startTop;
            verticalSpacing = angular.isDefined(args.verticalSpacing) ? args.verticalSpacing : verticalSpacing;
            duration = angular.isDefined(args.duration) ? args.duration : duration;
            defaultTemplateUrl = args.templateUrl ? args.templateUrl : defaultTemplateUrl;
            position = angular.isDefined(args.position) ? args.position : position;
            container = args.container ? args.container : container;
        };

        notify.closeAll = function(){
            for(var i = messageElements.length - 1; i >= 0; i --){
                var element = messageElements[i];
                element.css('opacity',0);
            }
        };

        return notify;
    }
]);
