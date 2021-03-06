(function(){
	var app = angular.module('Airlines',[]);
	app.controller('UserController',function($http, $log, $scope){
		var controller = this;
		$scope.users=[];
		$scope.loading = true;
		$log.debug("Getting users...");
		$http.get('rest/user').
		  success(function(data, status, headers, config) {
			  $scope.users = data;
			  $scope.loading = false;
		  }).
		  error(function(data, status, headers, config) {
			  $scope.loading = false;
			  $scope.error = status;
		  });
		
		$scope.addUser = function(user){
			$log.debug(user);
//			$.post("rest/user",user,function(data){
//				$log.debug(data);
//				$scope.users.push(user);
//				$scope.$digest();
//			});
			
			$http.post("rest/user",user)
			.success(function(data){
				$log.debug(data);
				$scope.users.push(user);
			});
		}
	});
})();

