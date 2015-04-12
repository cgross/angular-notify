angular.module('app', ['cgNotify']);

angular.module('app').controller('DemoCtrl',function($scope,notify){

    $scope.msg = 'Hello! This is a sample message!';
    $scope.template = '';

    $scope.positions = ['center', 'left', 'right'];
    $scope.position = $scope.positions[0];

    $scope.duration = 10000;

    $scope.demo = function(){
        notify({
            message: $scope.msg,
            classes: $scope.classes,
            templateUrl: $scope.template,
            position: $scope.position,
            duration: $scope.duration
        });
    };

    $scope.closeAll = function(){
        notify.closeAll();
    };

    $scope.demoMessageTemplate = function(){

        var messageTemplate = '<span>This is an example using a dynamically rendered Angular template for the message text. '+
        'I can have <a href="" ng-click="clickedLink()">hyperlinks</a> with ng-click or any valid Angular enhanced html.</span>';

        notify({
            messageTemplate: messageTemplate,
            classes: $scope.classes,
            scope:$scope,
            templateUrl: $scope.template,
            position: $scope.position,
        });       

    };

    $scope.clickedLink = function(){
        notify('You clicked a link!');
    };

});