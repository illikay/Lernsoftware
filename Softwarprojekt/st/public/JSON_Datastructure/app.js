var app = angular.module('myApp', ['ngRoute','ngCookies'])
    app.config(config);
//get json object product
/*$http.get("/products")
.then(function (response) {
	 var arr = response.data.records;
		});*/

var arr =  {
	 	"result": [{
	 		"sku": "38083932z",
	 		"name": "Appfhhjle",
	 		"text": "Eat one every day to kjjjeep the doctor away!",
	 		"price": 12
	 	}, {
	 		"sku": "42247530z",
	 		"name": "Appfhhjle",
	 		"text": "Eat ccone every day to kjjjeep the doctor away!",
	 		"price": 12
	 	}, {
	 		"sku": "45074480z",
	 		"name": "Appfhhjffssle",
	 		"text": "Eat one ssevery day to kjjjeep the doctor away!",
	 		"price": 12
	 	}]

	 };
var prodata=[];
for(i in arr.result){
	prodata.push(new product(arr.result[i].sku,arr.result[i].name,arr.result[i].text,arr.result[i].price));
}

    	         
config.$inject = ['$routeProvider', '$locationProvider']; 
  function config($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        }).
        when('/Products', {
            templateUrl: 'WebContent/ShoppingCart/partials/store.htm',
            controller: 'storeController'
        }).
        when('/logout', {
            templateUrl: 'logout1.html',
            controller: 'LogoutController'
        }).
         when('/Admin', {
             templateUrl: 'admin.html',
             controller: 'AdminController'
         }).
         when('/Warenkorb', {
             templateUrl: 'warenkorb.html',
             controller: 'WarenkorbController'
         }).
         when('/Kasse', {
             templateUrl: 'kasse.html',
             controller: 'KasseController'
        })
       .when('/login', {
           controller: 'LoginController',
           templateUrl: 'WebContent/login/login.view.html',
           controllerAs: 'vm'
       })

       .when('/register', {
           controller: 'RegisterController',
           templateUrl: 'WebContent/register/register.view.html'
       }).
       when('/store', {
        templateUrl: 'WebContent/ShoppingCart/partials/store.htm',
        controller: 'storeController'
      }).
      when('/products/:productSku', {
        templateUrl: 'WebContent/ShoppingCart/partials/product.htm',
        controller: 'storeController'
      }).
      when('/cart', {
        templateUrl: 'WebContent/ShoppingCart/partials/shoppingCart.htm',
        controller: 'storeController'
      })
      
        .otherwise({
            redirectTo: '/home'
        });
  }
  
  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
  function run($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
	  
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to login page if not logged in and trying to access a restricted page
          var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
          var loggedIn = $rootScope.globals.currentUser;
          if (restrictedPage && !loggedIn) {
              $location.path('/login');
          }
      });
  }
  ;
//----------------------------------------------------------------
//shopping cart
//
function shoppingCart($scope,cartName) {
   this.cartName = cartName;
   this.clearCart = false;
   this.checkoutParameters = {};
   this.items = [];
   
  

   
   
   
   
   // load items from local storage when initializing
   this.loadItems();

   // save items to local storage when unloading
   var self = this;
   $(window).on("unload",function () {
       if (self.clearCart) {
           self.clearItems();
       }
       self.saveItems();
       self.clearCart = false;
   });
}

//load items from local storage
shoppingCart.prototype.loadItems = function () {
   var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
   if (items != null && JSON != null) {
       try {
           var items = JSON.parse(items);
           for (var i = 0; i < items.length; i++) {
               var item = items[i];
               if (item.sku != null && item.name != null && item.price != null && item.quantity != null) {
                   item = new cartItem(item.sku, item.name, item.price, item.quantity);
                   this.items.push(item);
               }
           }
       }
       catch (err) {
           // ignore errors while loading...
       }
   }
}

//save items to local storage
shoppingCart.prototype.saveItems = function () {
   if (localStorage != null && JSON != null) {
       localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
   }
}

//adds an item to the cart
shoppingCart.prototype.addItem = function (sku, name, price, quantity) {
   quantity = this.toNumber(quantity);
   if (quantity != 0) {

       // update quantity for existing item
       var found = false;
       for (var i = 0; i < this.items.length && !found; i++) {
           var item = this.items[i];
           if (item.sku == sku) {
               found = true;
               item.quantity = this.toNumber(item.quantity + quantity);
               if (item.quantity <= 0) {
                   this.items.splice(i, 1);
               }
           }
       }

       // new item, add now
       if (!found) {
           var item = new cartItem(sku, name, price, quantity);
           this.items.push(item);
       }

       // save changes
       this.saveItems();
   }
}

//get the total price for all items currently in the cart
shoppingCart.prototype.getTotalPrice = function (sku) {
   var total = 0;
   for (var i = 0; i < this.items.length; i++) {
       var item = this.items[i];
       if (sku == null || item.sku == sku) {
           total += this.toNumber(item.quantity * item.price);
       }
   }
   return total;
}

//get the total price for all items currently in the cart
shoppingCart.prototype.getTotalCount = function (sku) {
   var count = 0;
   for (var i = 0; i < this.items.length; i++) {
       var item = this.items[i];
       if (sku == null || item.sku == sku) {
           count += this.toNumber(item.quantity);
       }
   }
   return count;
}

//clear the cart
shoppingCart.prototype.clearItems = function () {
   this.items = [];
   this.saveItems();
}

//check out

shoppingCart.prototype.checkout = function () {
	
	//$scope.order  = {};
   // global data
	
  var data_products = {};
  //var order_s = $scope.order.email;
   // item data
   for (var i = 0; i < this.items.length; i++) {
       var item = this.items[i];
       var ctr = i + 1;
       data_products["item_number_" + ctr] = item.sku;
       data_products["item_name_" + ctr] = item.name;
       data_products["quantity_" + ctr] = item.quantity;
       data_products["amount_" + ctr] = item.price.toFixed(2);
   };
   return data_products;
   //console.log();
   /*$http({
       method: 'post',
       url: 'https://jsonplaceholder.typicode.com/posts/1',//order url
       data: data_products,
       headers: {'Content-Type': 'application/json'}
     })
     .then(function(response) 
     {
    	 $location.path('/order');
     }, 
     function(response) 
     { 
         // failed
    	 console.log(data_products);
    	 
     });*/
   // submit form
   //this.clearCart = clearCart == null || clearCart;
   /*form.submit();
   form.remove();*/
}


shoppingCart.prototype.toNumber = function (value) {
   value = value * 1;
   return isNaN(value) ? 0 : value;
}

//----------------------------------------------------------------
//items in the cart
//
function cartItem(sku, name, price, quantity) {
   this.sku = sku;
   this.name = name;
   this.price = price * 1;
   this.quantity = quantity * 1;
}
  function product(sku, name, description, price) {
	  this.sku = sku; // product code (SKU = stock keeping unit)
	  this.name = name;
	  this.description = description;
	  this.price = price;
	  
	  
	};

	          
  function store() {
	  
	     	          //this.products = arr;
	  this.products = prodata;
	 
	  /*this.products = [
	         new product("38083932z", "Apple", "Eat one every day to keep the doctor away!", 12, 90, 0, 2, 0, 1, 2),
	         new product("AVC", "Avocado", "Guacamole anyone?", 16, 90, 0, 1, 1, 1, 2),
	         new product("BAN", "Banana", "These are rich in Potassium and easy to peel.", 4, 120, 0, 2, 1, 2, 2),
	         new product("CTP", "Cantaloupe", "Delicious and refreshing.", 3, 50, 4, 4, 1, 2, 0),
	         new product("FIG", "Fig", "OK, not that nutritious, but sooo good!", 10, 100, 0, 0, 0, 1, 2),
	         new product("GRF", "Grapefruit", "Pink or red, always healthy and delicious.", 11, 50, 4, 4, 1, 1, 1),
	         new product("GRP", "Grape", "Wine is great, but grapes are even better.", 8, 100, 0, 3, 0, 1, 1),
	         new product("GUA", "Guava", "Exotic, fragrant, tasty!", 8, 50, 4, 4, 0, 1, 2),
	         new product("KIW", "Kiwi", "These come from New Zealand.", 14, 90, 1, 4, 0, 2, 2),
	         new product("LYC", "Lychee", "Unusual and highly addictive!", 18, 125, 1, 4, 0, 2, 2),
	         new product("MAN", "Mango", "Messy to eat, but well worth it.", 8, 70, 3, 4, 0, 1, 1),
	         new product("ORG", "Orange", "Vitamin C anyone? Go ahead, make some juice.", 9, 70, 1, 4, 2, 1, 2),
	         new product("PAP", "Papaya", "Super-popular for breakfast.", 5, 60, 3, 4, 2, 2, 2),
	         new product("PCH", "Peach", "Add some cream and enjoy.", 19, 70, 1, 2, 0, 1, 2),
	         new product("PER", "Pear", "Delicious fresh, or cooked in red wine, or distilled.", 8, 100, 0, 2, 0, 1, 2),
	         new product("PMG", "Pomegranate", "Delicious, healthy, beautiful, and sophisticated!", 19, 110, 0, 2, 0, 2, 0),
	         new product("PNP", "Pineapple", "Enjoy it (but don't forget to peel first).", 4, 60, 0, 3, 0, 0, 1),
	         new product("PSM", "Persimmon", "Believe it or not, they are berries!", 6, 120, 4, 3, 0, 1, 3),
	         new product("STR", "Strawberry", "Beautiful, healthy, and delicious.", 7, 40, 0, 4, 1, 1, 2),
	         new product("TNG", "Tangerine", "Easier to peel than oranges!", 8, 50, 3, 4, 1, 1, 2),
	         new product("WML", "Watermelon", "Nothing comes close on those hot summer days.", 4, 90, 4, 4, 0, 1, 1)
	     ];*/
	    
	 }
	 store.prototype.getProduct = function (sku) {
	     for (var i = 0; i < this.products.length; i++) {
	         if (this.products[i].sku == sku)
	             return this.products[i];
	     }
	     return null;
	 };
  app.factory("DataService", function () {

	    // create store
	    var myStore = new store();

	    // create shopping cart
	    var myCart = new shoppingCart("myApp");

	    // enable PayPal checkout
	    // note: the second parameter identifies the merchant; in order to use the 
	    // shopping cart with PayPal, you have to create a merchant account with 
	    // PayPal. You can do that here:
	    // https://www.paypal.com/webapps/mpp/merchant
	   
	    // enable Stripe checkout
	    // note: the second parameter identifies your publishable key; in order to use the 
	    // shopping cart with Stripe, you have to create a merchant account with 
	    // Stripe. You can do that here:
	    // https://manage.stripe.com/register
	    

	    // return data object with store and cart
	    return {
	        store: myStore,
	        cart: myCart
	    };
	});


app.controller('HomeController', function ($scope) {
	 

});
app.controller('RegistrationController', function ($scope) {
	 

});
app.controller('LoginController', function ($scope) {
	 
});
app.controller('KasseController', function ($scope) {
	 

});
app.controller('ProductController', function ($scope) {

	
});
app.controller('LogoutController',function($location,$rootScope, $window){
	$rootScope.isVisibleLogin = false;    
	$window.localStorage.clear();
	
	    $rootScope.isVisibleUser= false;
	    $rootScope.isVisibleLogout = false;
	   
	    $location.path('/logout');
	
});


app.controller('storeController',function($scope, $routeParams, DataService){
	
	  // get store and cart from service
    $scope.store = DataService.store;
    $scope.cart = DataService.cart;
     $scope.o = {};
     //$scope.ordername = $scope.user;
    


    // use routing to pick the selected product
    if ($routeParams.productSku != null) {
        $scope.product = $scope.store.getProduct($routeParams.productSku);
        
    }
    $scope.order = function(){
    	var info1 = $scope.o;
    	var info2 = $scope.cart.checkout();
    	var result = $.extend(info1,info2);
    	console.log(result);
    	/*$http({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts/1',//order url
        data: result,
        headers: {'Content-Type': 'application/json'}
      })
      .then(function(response) 
      {
     	 $location.path('/order');
      }, 
      function(response) 
      { 
          // failed
     	 console.log(data_products);
     	 
      });*/
    }

   
});
app.controller('AdminController', function ($scope,$http) {
	//$scope.userinfo={};
	$scope.PostDataResponse={};
	$scope.GetDataResponse ={};
	$scope.userlist = [];
	$scope.hinzufuegen = function(){
		
		//$scope.userinfo=$scope.user;
		//$scope.userlist.push(angular.extend({}, $scope.user));
		var data = $scope.user;
		   $http({
	           method: 'post',
	           url: 'http://localhost:3000/benutzer',
	           data: data,
	           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	         })
	         .then(function(response) 
	         {
	        	 $http.get("http://www.w3schools.com/angular/customers_mysql.php")
	        	 .then(function (response) {
	        		 $scope.userlist = response.data.records;
	        	 		})
	         }, 
	         function(response) 
	         { 
	             // failed
	        	 $scope.PostDataResponse.test = "not ok";
	         });
		   $scope.loeschen = function() {
			    
		    	//$scope.PostDataResponse.test =$scope.user;
			   var data = $scope.user;
			   $http({
		           method: 'delete',  //method :"post"
		           url: 'http://localhost:3000/benutzer/', //richtitger Url ???
		           data: data,
		           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		         })
		         .then(function(response) 
		         {
		                 // success
		        	 $scope.GetDataResponse.test = "ok";
		         }, 
		         function(response) 
		         { 
		             // failed
		        	 $scope.GetDataResponse.test = "not ok";
		         });
	   }
	}
	

	      

	//$scope.PostDataResponse.test ="ok";
	
	$scope.hinzufuegen = function() {
   		$scope.userinfo = $scope.user;
		$scope.userlist.push(angular.extend({}, $scope.user));
	//$scope.PostDataResponse.test =$scope.user;
   var data = $scope.user;
   $http({
       method: 'post',           
       url: 'http://127.0.0.1:3000/benutzer', //method: 'put' gleiche url!
       data: data,
       headers: {'Content-Type': 'application/json'}
     })
     .then(function(response) 
     {
    	   $http.get('http://127.0.0.1:3000/benutzer')
           .then(function (response) {
            $scope.userlist = response.data;
             })
    	/* $http({
             method: 'get',           
             url: 'http://127.0.0.1:3000/benutzer',
             data: data,
             headers: {'Content-Type': 'application/json'}
           })
            .then(function(response)
            		{
             // success
            	 $scope.PostDataResponse.test = response.data;
    	
            		});*/
     }, 
     function(response) 
     { 
         // failed
    	 
     });

   $scope.loeschen = function() {
	    
    	//$scope.PostDataResponse.test =$scope.user;
	   var data = $scope.user;
	   $http({
           method: 'delete',  //method :"post"
           url: 'http://127.0.0.1:3000/benutzer', //richtige Url ???
           data: data,
           headers: {'Content-Type': 'application/json'}
         })
         .then(function(response) 
                 {

        	   $http.get('http://127.0.0.1:3000/benutzer')
               .then(function (response) {
                $scope.userlist = response.data;
                 })
                 }, 
                 function(response) 
                 { 
                     // failed
                	 
                 });
}}
	 

	
});

 