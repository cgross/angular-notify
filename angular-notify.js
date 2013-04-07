angular.module('notify',[]);

angular.module('notify').factory('notify',['$timeout',function($timeout){

	var startTop = 50;
	var verticalSpacing = 30;

	var counter = 0;
	var divs = [];

	var notify = function(msg){
		counter ++;
		var id = 'angular-notify-'+counter;
		$('body').append('<div id="'+id+'" class="notify-message">' + msg + '</div>');
		var div = $('#'+id);

		div.bind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd", function(e){
			if (e.originalEvent.propertyName === "opacity"){
				div.remove();
				divs.splice(divs.indexOf(div),1);
			}
		});		

		divs.push(div);

		$timeout(function(){

			var j = 0;
			for(var i = divs.length - 1; i >= 0; i --){
				var div = divs[i];

				var top = startTop + (j * verticalSpacing);
				div.css('top',top + 'px').css('opacity','0');

				j ++;
			}

		});
		
	};

	notify.config = function(args){
		startTop = args.top ? args.top : startTop;
		verticalSpacing = args.verticalSpacing ? args.verticalSpacing : verticalSpacing;
	};

	return notify;
}]);