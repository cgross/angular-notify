angular.module('cgNotify',[]);

angular.module('cgNotify').value('cgNotifyTemplateName','angular-notify.html');

angular.module('cgNotify').factory('notify',['$timeout','cgNotifyTemplateName','$http','$compile','$templateCache','$rootScope',
	function($timeout,cgNotifyTemplateName,$http,$compile,$templateCache,$rootScope){

		var startTop = 10;
		var verticalSpacing = 30;

		var messageElements = [];

		var notify = function(args){

			if (typeof args !== 'object'){
				args = {message:args};
			}

			args.template = args.template ? args.template : cgNotifyTemplateName;

			$http.get(args.template,{cache: $templateCache}).success(function(template){

				var scope = $rootScope.$new();
				scope.message = args.message;

				if (typeof args.scope === 'object'){
					for (var key in args.scope){
						scope[key] = args.scope[key];
					}
				}

				var templateElement = $compile(template)(scope);
				templateElement.bind('webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd', function(e){
					if (e.originalEvent.propertyName === 'opacity'){
						templateElement.remove();
						templateElement.splice(messageElements.indexOf(templateElement),1);
					}
				});	

				$('body').append(templateElement);	
				messageElements.push(templateElement);

				if (args.position === 'center'){
					$timeout(function(){
						templateElement.css('margin-left','-' + (templateElement.outerWidth() /2) + 'px');
					});
				}					

				$timeout(function(){
					var j = 0;
					for(var i = messageElements.length - 1; i >= 0; i --){
						var element = messageElements[i];
						var top = startTop + (j * verticalSpacing);
						element.css('top',top + 'px');
						if (element.css('opacity') === '1'){
							element.css('opacity',0);
						}
						j ++;
					}
				});						

			}).error(function(data){
					throw new Error('Template specified for cgNotify ('+args.template+') could not be loaded. ' + data);
			});
			
		};

		notify.config = function(args){
			startTop = args.top ? args.top : startTop;
			verticalSpacing = args.verticalSpacing ? args.verticalSpacing : verticalSpacing;
		};

		return notify;
	}
]);

angular.module("cgNotify").run(["$templateCache", function($templateCache) {

  $templateCache.put("angular-notify.html",
    "<div class=\"cg-notify-message\">" +
    "	{{message}}" +
    "</div>"
  );

}]);
