(function(){
	
	app = angular.module('Airlines');
	
	app.controller('TopController',function($http, $log, $scope){
		$scope.userCount=0;
		$scope.$on('countUpdate',function(event,count){
			$scope.userCount=count;
		});
	});
	
	app.controller('UserController',function($http, $log, $scope, $rootScope){
		var controller = this;
		$scope.users=[];
		$scope.loading = true;
		$log.debug("Getting users...");
		$http.get('rest/user').
		  success(function(data, status, headers, config) {
			  $scope.users = data;
			  $rootScope.$broadcast('countUpdate',data.length);
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
				$rootScope.$broadcast('countUpdate',$scope.users.length);
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
				$rootScope.$broadcast('countUpdate',$scope.users.length);
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

