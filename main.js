//------TOOL TIP------//
//--------------------//
/*$(document).ready(function() {
	xOffset = 20; //Position of tooltip on cursor
	yOffset = 10;

function tooltip(){ //from jQuery examples
	$("input.tooltip").hover(function(e){
		$("body").append("<p id='myTooltip'>Enter any details here that you want to search for <br> in your address book</p>"); //Appends p tag when hovering over the input field
		},
		function(){
        	$("#myTooltip").remove(); //Tooltip not shown when not being hovered over
		});
		
		$("input.tooltip").mousemove(function(e){
			$("#myTooltip")
            .css("top",(e.pageY - xOffset) + "px")
            .css("left",(e.pageX + yOffset) + "px");
		});
	}
        
//TOOL TIP FUNCTION//
$(document).ready(function(){ //Calls tooltip function
    tooltip();
	});
});
//---------------------------------//*/

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({html:true});
});


$(document).ready(function(){
	$("#searchBtn").click(function GetJSONData(event){

		$.getJSON('json/data.json', function (data){
			$.each(data,function(i, data){
				if (data.first_name ==$("#searchField").val()){
					$("#firstNameField").val(data.first_name);
					$("#lastNameField").val(data.last_name);
					$("#addressField").val(data.address);
					$("#genderField").val(data.gender);
					$("#DOBfield").val(data.date_of_birth);
					$("#cityField").val(data.Magarao);
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