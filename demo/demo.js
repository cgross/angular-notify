
angular.module('app', ['cgNotify']);

angular.module('app').controller('DemoCtrl',function($scope,notify){

	$scope.msg1 = $scope.msg2 = $scope.msg3 = "Sample Message";

	$scope.demo1 = function(){
		notify($scope.msg1);
	};

	$scope.demo2 = function(){
		notify({
			message:$scope.msg2,
			template:'gmail-template.html',
			position:'center'
		});
	};

	$scope.demo3 = function(){
		$scope.buttons = [
			{ name:'Hello', callback: function(){ alert('Hello'); }},
			{ name:'Bonjour', callback: function(){ alert('Bonjour'); }},
			{ name:'Hola', callback: function(){ alert('Hola'); }}
		];
		notify({
			message:$scope.msg3,
			template:'another-template.html',
			position:'center',
			scope:$scope
		});
	};

	$scope.closeAll = function(){
		notify.closeAll();
	};

});