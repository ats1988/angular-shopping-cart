app.controller("appCtrl", ['$scope','clientId','$window','$localStorage','factoryCheckLogin','serviceLogOut',function($scope,clientId,$window,$localStorage,factoryCheckLogin,serviceLogOut){

	$scope.spani_name = $("#spani_name"); $scope.logout = $("#logout");
	$scope.checking = factoryCheckLogin.checkLogin();

	$scope.spani_name.html($scope.checking);

	$scope.logout.bind('click',function(event){
		event.preventDefault();

		serviceLogOut.BindLogOut();
	});

	
	$localStorage.message = "Hello World";
        	

	$scope.dotta = $localStorage.message;

	//$scope.deleteX = delete $scope.dotta;
	$scope.clientId = clientId;

}]);

function UsersListCtrl($scope) {
  $scope.users = [
  {name:"Lorenzo",age:"22",price:"130.0",qty:"1"}, 
  {name:"sami",age:"58",price:"57.0",qty:"2"}, 
  {name:"ruti",age:"18.5",price:"32",qty:"3"},
  {name:"kobe",age:"36",price:"1.0",qty:"4"},
  {name:"timy",age:"78",price:"2.0",qty:"5"},
  {name:"fff",age:"776",price:"3.0",qty:"6"},
  {name:"swsw",age:"665",price:"4.0",qty:"7"},
  {name:"ewww",age:"1213",price:"55.0",qty:"8"},
  {name:"poo",age:"2244",price:"90.0",qty:"9"},
  {name:"hrrr",age:"8787",price:"5.0",qty:"10"},
  {name:"eerrr",age:"67656",price:"7.0",qty:"11"},
  {name:"pllc",age:"45454",price:"6.0",qty:"12"},
    ];
}

function UsersDetailCtrl($scope, $routeParams,$http) {
  $scope.username = $routeParams.id;
  $scope.age = $routeParams.ag;
  
}

function HomePageCtrl($scope) {
  $scope.title = "Hello AngularJS!"
  $scope.news = "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.";
}

function registerCtrl($scope,showMessageBox){
	$scope.registerString = 'registartion form';
	var element = $("a[href='#/register']");
		
	$scope.fadeintoNGView = function(){
		
		$('#h22').hide();
		$('#h22').fadeIn(3000);
	}
	$scope.fadeintoNGView();

	$("#signup").submit(function(event){
	event.preventDefault();

	var name = $("#signup-name").val();
	var pass = $("#signup-password").val();

	var user = new Parse.User();
	user.set("username",name);
	user.set("password",pass);

	user.signUp(null, {
		success:function(user){
			// alert("Welcome !-!-!");
      showMessageBox.msgFuncGetText("Welcome !-!-!");
			$("#signup-name").val(null);
			$("#signup-password").val(null);
		},error:function(user,error){
			console.log("signup error: " + error.message);
			// alert("signup error: "+error.message);
			// $("#spanError").html("signup error: "+error.message);
		  showMessageBox.msgFuncGetText("signup error: " + error.message);
    }
	});
});
}

app.controller('TestingCtrl', ['$timeout','$animate', function ($timeout, $animate) {
    var _this = this;
    _this.title = 'AngularJS Loading Indicator';
    _this.loading = true;
   

}]);




function chartListCtrl($scope,getAllUsers) {
  $scope.username = 'sabba';
  $scope.getAllUsers = getAllUsers.PullNamesOfAllUsers();
}

app.controller('forNotes',['$scope',function($scope){


}]);



function AddUserCtrl($scope,showMessageBox) {


$scope.submitMyForm = function(){showMessageBox.msgFuncGetText("Form submitted");};
$scope.uname = function(){return $("#post-username").val();};
$scope.pswd = function(){return $("#post-password").val();};
$scope.eml = function(){return $("#post-email").val();};

// $("form[name='form11'] input").css('border','3px solid orange');
$scope.save = function() {
$scope.$broadcast('show-errors-check-validity');

if($scope.form11.$valid){


var newPost = new Post();

newPost.set("username",$scope.uname());
newPost.set("password",$scope.pswd());
newPost.set("email",$scope.eml());

  newPost.save({
    success:function(){
    
    $scope.submitMyForm();
    // $scope.reset();
    
    },error: function(error){
    console.log("Error:"+error.message);
    showMessageBox.msgFuncGetText("something went wrong.." + error.message);
    }
    });

    }
  };

  $scope.reset = function() {
    $scope.$broadcast('show-errors-reset');
    $scope.user = { urname: '', emailF: '',password1: ''};
    showMessageBox.msgFuncGetText("clean Form");
          // $("#post-username").css('border','3px solid orange');
         // $("div.errors").remove();
  };

  // $("#post-form").submit(function(event){
  // event.preventDefault();

  // });



}

function checkOutCtrl($scope,$http) {

  
}

app.controller('cartEvents',['$scope','$http','ngCart',function($scope,$http,ngCart){
      ngCart.setTaxRate(7.5);
      ngCart.setShipping(2.99);
      console.log(ngCart);

      $scope.checkout = function(){
        $scope.summary = ngCart.toObject();
      }
}]);

function ctrlValidate1($scope,showMessageBox){

  $scope.save = function() {
    $scope.$broadcast('show-errors-check-validity');

    if($scope.userForm.$valid){
      showMessageBox.msgFuncGetText('User saved');
      $scope.reset();
    }
  };

  $scope.reset = function() {
    $scope.$broadcast('show-errors-reset');
    $scope.user = { name: '', email: ''};
  };

}