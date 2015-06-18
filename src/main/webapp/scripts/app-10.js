(function(){
	var app = angular.module('Airlines',['ngRoute']);
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
	
	
	
	
})();

