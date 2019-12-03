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


