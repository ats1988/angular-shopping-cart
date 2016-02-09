app.service('serviceTool',function($animate,factoryCheckLogin,$timeout,showMessageBox){
	this.BindKit1 = function(){
		name = $("#login-name").val();
		pass = $("#login-password").val();

		Parse.User.logIn(name,pass,{
		success:function(user){
			// alert("login successfuly");
			showMessageBox.msgFuncGetText("login successfuly");
			console.log("Login success");
			$("#login-name").val(null);
			$("#login-password").val(null);
			//factoryCheckLogin.checkLogin();
			$('#logoutblock').show();
			 var timmer = $timeout(function(){
			
			$('#signinId').slideUp(function(){
				$('#spani').css('background-color','#6b2369');
				$('#spani').html(factoryCheckLogin.checkLogin());
			});

			
			},500);

			 //$timeout.cancel(timmer);
		},error:function(user,error){
			// alert("login Faild");
			
			showMessageBox.msgFuncGetText('login Faild');
			console.log("Login Error:"+error);
		}
		});
	}
});

app.service('serviceLogOut',function(){

		this.BindRefresh = function(){
			window.location.reload();
		}
		this.BindLogOut = function(){
		Parse.User.logOut();
		this.BindRefresh();
		

		setTimeout(function(){
		$('#logoutblock').fadeOut(0,'swing');
		$('#signinId').fadeIn();
			
			},1000);


		}

});

app.service('getAllUsers',function(showMessageBox,$timeout){

		this.QueryUsing = function(){
			return new Parse.Query(Post);
		}

		
		this.PullNamesOfAllUsers = function(){
			var query  = this.QueryUsing();

			query.find({
		success:function(results){
			var output = "";
			for (var i in results) {
				var username = results[i].get("username");
				var password = results[i].get("password");
				var email = results[i].get("email");
				var objId = results[i].id;
				//console.log("username "+username);
			output += "<tr class='li-down'><td class='x8'>";
			output += "<h3>"+username+"</h3>";
			output += "<h4>"+password+"</h4>";
			output += "<p>"+username+"</p>";
			output += "<span style='float:right;'>";
			output += "<button id='del'  type='button' class='btn btn-primary' data-btn='"+ objId +"'>"+"Delete"+"</button></span></td></tr>";


			

			
			}
			$("#list-posts").html(output);



			$("button").each(function (index,vall){

			$(this).click(function(){
			
			var delObject = $(this).attr("data-btn");
			
			var yourClass = Parse.Object.extend("Post");
			
			var query = new Parse.Query(yourClass);
			query.get(delObject, {
  			success: function(yourObj) {

    		yourObj.destroy({});
    		// alert('deleted successfully');
    		showMessageBox.msgFuncGetText('deleted successfully');

    			// $("tr").each(function (index2,vall2){
            	delTR = $("tr.li-down:nth-child("+index+")").val(vall);
            	// delTR = $(vall);
    			delTR.fadeOut(1200);
    			delTR.css({"background-color":"yellow",'border-left':'8px solid black'});

            	// });


        	

    		$timeout(function(){
    		
    		location.reload();
  			
  			},2000);
  			

  			},
  			error: function(object, error) {
   
   			showMessageBox.msgFuncGetText("Error: " + error.code + " " + error.message);
    		// alert("Error: " + error.code + " " + error.message);
  			}
			}); 



			});

			});




		},error:function(error){
			console.log("Query Error:"+error.message);
		}
	});

		}

});


app.factory('factoryCheckLogin',function(){

		return {
			checkLogin: function()
			{

		if(Parse.User.current())
		{
			var firstName=Parse.User.current().get("username");
		
			console.log("logged in! " + firstName);
			$("#spani_name").html("<input value='" +
			firstName.toUpperCase() +"' disabled/>");
			$('#signinId').hide();
			$('#spani').css('background-color','#6b2369');

		}

			}
			   }

});


app.factory('showMessageBox',function(){

		return {
			msgFunc: function()
			{
				var kat = function(){$('#soSo').fadeIn(200).delay(2000).fadeOut(1100);
				$("#soSo").append("&nbsp;<span id='one_of' class='glyphicon glyphicon-remove-sign' style='float:right;color:#cece31;'></span>");
				if($("#soSo").text().indexOf('deleted') != -1)
				{
					$("#one_of").hide();
				}else{
				$("#one_of").click(function(){
					
					$("#soSo").hide();
				});
				}

				}
				kat();
			},
			msgFuncGetText: function(_text){
				$('#soSo').text(_text);
				this.msgFunc();
			}
			   }

});


