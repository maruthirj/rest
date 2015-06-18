(function(){
	var app = angular.module('Airlines',[]);
	app.filter('colorCodeAge', function() {
		return function(user) {
			if(user!==undefined && user.age!==undefined)
				if(user.age<18){
					return '#E6E6E6';
				}else{
					return '#CCD6F5';				
				}
			return input;
		};
	});
	
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
			$http.post("rest/user",$.param(user,true),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
			.success(function(data){
				$log.debug(data);
				$scope.users.push(user);
				$scope.showAddForm=false;
			});
		}
		
		$scope.updateUser = function(user){
			$log.debug(user);
			$.ajax({url: 'rest/user', 
				type: 'PUT',
				data: user,
				success: function(data){
					console.log(data);
				}
		});
		}
	});
})();

