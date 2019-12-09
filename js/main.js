//---------ADDRESS FORM SCRIPT FILE--------//
//-----------------------------------------//


//------TOOL TIP------//
//--------------------//

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({html:true}); //tooltip function. Use data-toggle to refer to the HTML file
});


// $(document).ready(function(){
// 	$("#searchBtn").click(function GetJSONData(event){
// 		event.preventDefault();
// 		$.getJSON('json/data.json', function (data){
// 			$.each(data,function(i, data){
// 				if (data.first_name == $("#searchField").val()){
// 					$("#firstNameField").val(data.first_name);
// 					$("#lastNameField").val(data.last_name);
// 					$("#addressField").val(data.address);
// 					$("#DOBfield").val(data.date_of_birth);
// 					$("#cityField").val(data.city);
// 					$("#postcodeField").val(data.post_code);
// 					$("#mobileField").val(data.number);
// 					$("#emailField").val(data.email);
// 				} else {
// 					alert("error");
// 				}
// 			});
// 			if(("#searchField").val().length==0){
// 				alert("error");
// 			}
// 		});
// 	});
// });
//----------------------//

$(document).ready(function(){
	$.getJSON("json/data.json", function(data){  
		$.each(data.contacts, function(i, data){ 
		  $("#contactsTable").append('<tr id="' + data.id + '" class="tablerow"> <td>' + data.first_name + '</td> <td>' + data.last_name + '</td> <td> ' + data.city + '</td> </tr>');
		//   $("#contactsTable").append('<div class="dropdown"> <td>' + data.gender + '</td> <td>' + data.address + '</td> <td> ' + data.number + '</td> </div>');
	  });
	});  
});

function searchContacts() {
    var input, filter, tableBody, tr, a, i, txtValue;
    input = document.getElementById("searchField");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("contactsTable");
    tr = tableBody.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}