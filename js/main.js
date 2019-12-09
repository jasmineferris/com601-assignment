$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip({html:true}); //tooltip function. Use data-toggle to refer to the HTML file
	$('#contactForm').hide();

	$.getJSON("json/data.json", function(data){  
		$.each(data.contacts, function(i, data){
		  $("#contactsTable").append('<tr id="' + data.id + '" class="tablerow"> <td>' + data.first_name + '</td> <td>' + data.last_name + '</td> <td> ' + data.city + '</td> </tr>');
	  	});
		
		$(document).on("click", "tbody tr", function(){
			$("#tableID").hide();
			$("#search").hide();
			console.log(this.id);
			var tablerowID = this.id;
			console.log(tablerowID);
			$("#contactForm").show();
			$("#firstNameField").val(data.contacts[tablerowID -1 ].first_name);
			$("#lastNameField").val(data.contacts[tablerowID -1 ].last_name);
			$("#genderField").val(data.contacts[tablerowID -1 ].gender);
			$("#addressField").val(data.contacts[tablerowID -1 ].address);
			$("#cityField").val(data.contacts[tablerowID -1 ].city);
			$("#postcodeField").val(data.contacts[tablerowID -1 ].post_code);
			$("#mobileField").val(data.contacts[tablerowID -1 ].number);
			$("#emailField").val(data.contacts[tablerowID -1 ].email);

		});
	});

	$("#updateBtn").on("click", function(){
		$("#tableID").show();
		$("#search").show();
		$("#contactForm").hide();
	});
	
	$("#deleteBtn").on("click", function(){
		$("#tableID").show();
		$("#search").show();
		$("#contactForm").hide();
	});
});

// https://www.w3schools.com/howto/howto_js_filter_lists.asp
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

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table
function sortTable(){
	var table, rows, switching, i, x, y, shouldSwitch;
  	table = document.getElementById("contactsTable");
	switching = true;
	  
	while (switching) {
	  switching = false;
	  rows = table.rows;
	  for (i = 0; i < (rows.length - 1); i++) {
		  shouldSwitch = false;
			x = rows[i].getElementsByTagName("td")[0];
		  	y = rows[i + 1].getElementsByTagName("td")[0];
		  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			shouldSwitch = true;
			break;
		  }
	  }
	  if (shouldSwitch) {
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
	  }
  }
  	document.getElementById("sortBtn").style.backgroundColor = "#F0136A";
	  $("#sortBtn").text("Sorted A to Z");
}