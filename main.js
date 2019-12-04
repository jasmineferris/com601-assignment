//---------ADDRESS FORM SCRIPT FILE--------//
//-----------------------------------------//


//------TOOL TIP------//
//--------------------//

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({html:true}); //tooltip function. Use data-toggle to refer to the HTML file
});


$(document).ready(function(){
	$("#searchBtn").click(function GetJSONData(event){
		event.preventDefault();
		$.getJSON('json/data.json', function (data){
			$.each(data,function(i, data){
				if (data.first_name ==$("#searchField").val()){
					$("#firstNameField").val(data.first_name);
					$("#lastNameField").val(data.last_name);
					$("#addressField").val(data.address);
					$("#genderField").val(data.gender);
					$("#DOBfield").val(data.date_of_birth);
					$("#cityField").val(data.city);
					$("#postcodeField").val(data.post_code);
					$("#mobileField").val(data.number);
					$("#emailField").val(data.email);
				} else {
					alert("error");
				}
			});
			if(("#searchField").val().length==0){
				alert("error");
			}
		});
	});
});
//----------------------//

$(document).ready(function(){
	$.getJSON("json/data.json", function(data){  
		$.each(data, function(i, data){ 
		  $("#contactsTable").append(data.firstName + "<br>" + data.lastName);
	  });
	  });  
});