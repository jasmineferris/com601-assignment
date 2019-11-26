//------TOOL TIP------//
//--------------------//
$(document).ready(function() {
	xOffset = 20; //Position of tooltip on cursor
	yOffset = 10;

function tooltip(){ //from jQuery examples
	$("input.tooltip").hover(function(e){
		$("body").append("<p id='myTooltip'>Enter your 3 digit quote number here. <br> You will find this quote in your emails from us.</p>"); //Appends p tag when hovering over the input field
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
//---------------------------------//