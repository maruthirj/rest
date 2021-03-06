(function(){
	var app = angular.module('Airlines',['ngRoute','MyUtils']);
	app.config(['$routeProvider',
			       function($routeProvider) {
			           $routeProvider.
			               when('/users', {
			                   templateUrl: 'templates/users.html',
			                   controller: 'UserController'
			               }).
			               when('/products', {
			                   templateUrl: 'templates/products.html',
			                   controller: 'ProductController'
			               }).
			               otherwise({
			                   redirectTo: '/'
			               });
			       }]);
	
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
		
		$scope.editUser = function(user){
			console.log(user);
			$scope.user = user;
			$scope.showEditForm=true;
			$scope.showAddForm=false;
		}
		
		
		$scope.deleteUser = function(user){
			$log.debug(user.id);
			$http.delete('rest/user/'+user.id)
			.success(function(data){
				$log.debug(data);
				$log.info("Deleted record");
				var i = $scope.users.indexOf(user);
				$log.info("Element location: "+i);
				if(i != -1) {
					$scope.users.splice(i, 1);
				}
			}); 
		}
	});
	
	app.controller('ProductController',function($http, $log, $scope){
		var controller = this;
		$scope.products=[];
		$scope.loadingProducts = true;
		$log.debug("Getting products...");
		$http.get('rest/products').
		  success(function(data, status, headers, config) {
			  $scope.products = data;
			  $scope.loadingProducts = false;
		  }).
		  error(function(data, status, headers, config) {
			  $scope.loadingProducts = false;
			  $scope.errorProducts = status;
		  });
	});
	
	
})();

