(function(){
	var app = angular.module('Airlines',['ngResource']);
	
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
	app.filter('userNameFilter', function($log) {
		return function(users, searchName) {
			if(users!==undefined && searchName!==undefined && searchName!==""){
				var tempUsers = [];
				for(index in users){
					if(users[index]!=-undefined && users[index].name.indexOf(searchName)!=-1){
						tempUsers.push(users[index]);
					}	
				}
				return tempUsers;
			}
			return users;
		};
	});
	
	app.directive('product', function() {
	    var directive = {};
	    directive.restrict = 'E'; /* restrict this directive to elements */
	    directive.templateUrl = "templates/product.html";
	    directive.scope = {
	            p : "=product"
	    }
	    return directive;
	});
	
	app.directive('shoppingCart', function() {
	    var directive = {};
	    directive.restrict = 'E'; 
	    directive.templateUrl = "templates/cart.html";
	    directive.transclude = true;
	    directive.scope = {
	            prods : "=products"
	    }
	    return directive;
	});
	
	app.controller('UserController',function($http, $log, $scope, $resource){
		
		var userResource = $resource('rest/user/:id', { id: '@_id' }, {
			    update: {
			      method: 'PUT' // this method issues a PUT request
			    }
			  });
		//var userResource = $resource('rest/user/:id');
		
		var controller = this;
		$scope.users=[];
		$scope.loading = true;
		$log.debug("Getting users...");
		userResource.query(function(data) {
			  $scope.users = data;
			  $scope.loading = false;
		}); 
		
		
		$scope.addUser = function(user){
			$log.debug(user);
			userResource.save(user, function(data){
				$log.debug(data);
				$scope.users.push(user);
				$scope.showAddForm=false;
			});
		}
		
		$scope.updateUser = function(user){
			$log.debug(user);
			userResource.update(user,function(data){
				console.log(data);
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

