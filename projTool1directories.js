app.directive('signIn', function($compile) {
    return {
        restrict: 'AE',
        template: "<span></span>",
        terminal: true,
      	priority: 1000,
      	replace: true,
      	// scope:{
      	// 	blockId: '@'
      	// },
        // controller: 'appCtrl',
        link: function(scope, element, attrs) {
            var content = "<span><table class='table'><tr><td><span><a href=''>Login</a></span>&nbsp;&nbsp;<span style='float:right;'><a 3d-baby href='#/register'  lazy-load-background>register here</a></span></td></tr><form id='login'><tr><td><input id='login-name' type='text'  placeholder='username'/></td></tr><tr><td><input id='login-password' type='password' placeholder='password'/></td></tr><tr><td><input id='login-submit' value='LOG IN' sign-in-button type='submit' style='width:100%;'/></td><td></tr></tr></form></table></span>";
            element.html(content);
            $compile(element)(scope);
        }

    };
});
//on-click
app.directive('signInButton', function(factoryCheckLogin,serviceTool,$animate,clientId) {
    return {
    	restrict: 'AE',
        link: function($scope, element, attrs, name, pass,clientId) {
            
            element.bind('click',function(event){
            	event.preventDefault();
            	serviceTool.BindKit1();
            });
        }

    };
});

app.directive('lazyLoadBackground',[function($scope,$timeout){

    return {
        restrict: 'AE',
        scope:true,
        link: function($scope, element, attrs) {
    var intro = $("#intro");
    var modal = $('.modal');

    $(document).ajaxStart(function () {
    intro.addClass("loading");
    modal.fadeIn(1000);
    });
    $(document).ajaxStop(function () {
    intro.removeClass("loading");
    modal.fadeOut(500);
    });

// Initiates an AJAX request on click
    $(element).on("click", function () {
    $.post("/mockjax");
    });

// http://code.appendto.com/plugins/jquery-mockjax
$.mockjax({
    url: '/mockjax',
    responseTime: 2000
});    
    
        }

    };

}]);


app.directive('3dBaby',[function($scope,$timeout){

    return {
        restrict: 'AE',
        scope:true,
        link: function($scope, element, attrs) {
            
    var supports3DTransforms =  document.body.style['webkitPerspective'] !== undefined || 
                            document.body.style['MozPerspective'] !== undefined;
element = 'a';
    // function linkify( selector ) {
    if( supports3DTransforms ) {
        
        var nodes = document.querySelectorAll( element );

        for( var i = 0, len = nodes.length; i < len; i++ ) {
            var node = nodes[i];

            if( !node.className || !node.className.match( /roll/g ) ) {
                node.className += ' roll';
                node.innerHTML = '<span data-title="'+ node.text +'">' + node.innerHTML + '</span>';
            }
        };
    }
// }

// linkify( 'a' );
    
        }

    };

}]);