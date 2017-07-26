$(document).ready(function(){
	//$('#parent_email-label label').after('<span><a href="#"><br>Why do I need this?</a></span>');
	$('#verify-label label').after('<span><a href="/page/open/id/6" target="_resource"><br>Terms of Service</a></span>');
	$('.student').addClass('selected');
	$('.tutor').removeClass('selected');
	//$('.tutorform').fadeOut(0);
	
});

$(document).ready(function(){

	var from = 0, step = 5;
	
	function showNext(list)
	{
		var the_length = list.find('li').length;
		//console.log(the_length);
		
	  list
	    .find('li').hide().end()
	    .find('li:lt(' + (from + step) + '):not(li:lt(' + from + '))')
	      .show();
	
		from += step;
		if (from < the_length)
		{
			$('.view-older').show();
		}
		else
		{
			$('.view-older').hide();
		}
		
		if (from <= step)
		{
			$('.view-newer').hide();
		}
		else
		{
			$('.view-newer').show();
		}
		//console.log("from:" + from);
	}
	
	function showPrevious(list) {
	  from -= step;
	  list
	    .find('li').hide().end()
	    .find('li:lt(' + from + '):not(li:lt(' + (from - step) + '))')
	      .show();
		
		var the_length = list.find('li').length;
		//console.log("from:" + from);
		
		if (from < the_length)
		{
			$('.view-older').show();
		}
		else
		{
			$('.view-older').hide();
		}
		if (from <= step)
		{
			$('.view-newer').hide();
		}
		else
		{
			$('.view-newer').show();
		}
		
	
	//console.log("from:" + from);
	}
	
	// show initial set
	showNext($('.past-goals ul'));
	
	// clicking on the 'older' link:
	$('.view-older').click(function(e) {
	  e.preventDefault();
	  showNext($('.past-goals ul'));
	});

	// clicking on the 'newer' link:
	$('.view-newer').click(function(e) {
	  e.preventDefault();
	  showPrevious($('.past-goals ul'));
	});

	// Check username using ajax call
	$("#schooladmin_form #username, #reg_form #username").blur(function(){
		var form_el = $(this).closest("form");
		clearUsernameErrors();
		var that = this;
		$.getJSON('/user/checkusername?username='+$(this).val(),function(cb){
			if(!cb.success) {
				//$("#reg_form #submit").prop("disabled",true);
				$(form_el).find("#submit").prop("disabled",true);
				//var userlabel = $("#reg_form #username-label label");
				var userlabel = $(form_el).find("#username-label label");
				$(userlabel).css("color","red");
				var err_div = $("<div />",{
					id: "username_error",
					html: cb.message,
					color:'red',
					style: "float:right; font-size:10px;"
				});
				$(userlabel).append(err_div);
				$(that).focus();
			}
		});
	});

});

function clearUsernameErrors() {
	$("#reg_form #username-label label").css("color","#444");
	$("#username_error").remove();
	$("#reg_form #submit").prop("disabled",false);
}

function getStateList(parent_el) {
	$.getJSON('/dashboard/getstates/',function(callback){
		var state_select = $("<select/>",{
			id:'state',
			name:'state'
		});
		$(state_select).append("<option selected value='-1'>--SELECT A STATE--</option>");
		$(callback.data).each(function(){
			var the_option = $("<option/>",{value:this.id});
			$(the_option).html(this.name);
			$(state_select).append(the_option);
		});
		$(parent_el).append($(state_select));
	});
}

function getCityList(parent_el) {
	var state_id = $("#state").val();
	
	$.getJSON('/user/getcities/?stateid='+state_id,function(callback){
		
		var city_select = $("<select/>",{
			id:'city',
			name:'city'
		});
		$(city_select).append("<option selected value='-1'>--SELECT A CITY--</option>");
		
		$(callback.data).each(function(){
			var the_option = $("<option/>",{value:this.id});
			$(the_option).html(this.name);
			$(city_select).append(the_option);
		});
		$(parent_el).append($(city_select));
	});
}

function getSchoolList(parent_el) {
	var city_id = $("#city").val();

	$.getJSON("/user/getschools/?cityid="+city_id, function(callback){
		var school_select = $("<select/>",{
			id:"school",
			name:"school_id"
		});
		$(school_select).append("<option selected value='-1'>--SELECT A SCHOOL--</option>");
		$(callback.data).each(function(){
			var sc_option = $("<option/>", {value:this.id});
			$(sc_option).html(this.name);
			$(school_select).append($(sc_option));
		});
		$(parent_el).append($(school_select));
	});
}

function setupSchoolSelect(parent_el) {
	var setupDiv = $("<div/>",{id:'role_addon'});
	$(parent_el).append(setupDiv);
}