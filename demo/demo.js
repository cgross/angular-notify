
angular.module('app', ['cgNotify']);

angular.module('app').controller('DemoCtrl',function($scope,notify){

	$scope.msg1 = $scope.msg2 = "Sample Message";

	$scope.demo1 = function(){
		notify($scope.msg1);
	};

	$scope.demo2 = function(){
		notify({message:$scope.msg2,template:'gmail-template.html',position:'center'});
	};

});