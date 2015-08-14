var app = angular.module('myApp', []);

app.controller('ChatController', function ChatController($scope){
	$scope.logs = [{'username': 'User', 'message': 'Example message'}];

	$scope.addNewLog = function(){
		$scope.date = new Date();
		var newLog = {
			'username': $scope.username,
			'message': $scope.message,
			'date': $scope.date
		};
		$scope.logs.push(newLog);
		$scope.message = '';
	}
});