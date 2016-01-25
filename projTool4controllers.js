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
  {name:"Lorenzo",age:"22"}, 
  {name:"sami",age:"58"}, 
  {name:"ruti",age:"18.5"},
  {name:"kobe",age:"36"},
  {name:"timy",age:"78"},
  {name:"fff",age:"776"},
  {name:"swsw",age:"665"},
  {name:"ewww",age:"1213"},
  {name:"poo",age:"2244"},
  {name:"hrrr",age:"8787"},
  {name:"eerrr",age:"67656"},
  {name:"pllc",age:"45454"}
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



function AddProductCtrl($scope,showMessageBox) {


      $("#post-form").submit(function(event){
  event.preventDefault();

  var uname = $("#post-username").val();
  var pswd = $("#post-password").val();
  var eml = $("#post-email").val();

  


var newPost = new Post();

newPost.set("username",uname);
newPost.set("password",pswd);
newPost.set("email",eml);

newPost.save({
  success:function(){
    // alert('registration okay :)');
    showMessageBox.msgFuncGetText('registration okay :)');

    getPosts();
    uname.reset();pswd.reset();eml.reset();
    $("#post-username").reset();
  },error: function(error){
      console.log("Error:"+error.message);
    alert('something went wrong..');
  }
});
  

});

}