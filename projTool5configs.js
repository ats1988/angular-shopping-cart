app.config(['$routeProvider', 

  function( $routeProvider) {

  // Define routes 
  $routeProvider.
    when('/homepage', 
        { templateUrl: 'partial/homepage.html',
          controller: HomePageCtrl}).
     when('/register', 
        { templateUrl: 'partial/register.html',
          controller: registerCtrl}).

    when('/users', 
        { templateUrl: 'partial/users.html',
          controller: UsersListCtrl}).

    when('/chart', 
        { templateUrl: 'partial/chart.html',
          controller: chartListCtrl}).

    when('/addUser', 
        { templateUrl: 'partial/addUser.html',
          controller: AddUserCtrl}).
    when('/checkOut', 
        { templateUrl: 'partial/checkOut.html',
          controller: checkOutCtrl}).

     when('/users/:id/:ag',
     { templateUrl: 'partial/user.html',
        controller: UsersDetailCtrl}).otherwise({redirectTo: 'homepage'});


  }]);