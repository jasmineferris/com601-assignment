$(document).ready(function(){
	// Tooltip function. Uses the pre-coded Bootstrap capability (data-toggle).
	// https://getbootstrap.com/docs/4.1/components/tooltips/
	$('[data-toggle="tooltip"]').tooltip({html:true});
	
	// Hides the contact info form upon page load.
	$('#contactForm').hide();

	// Loads in the JSON data and displays it in a table.
	// The event handlers for functions relating to the JSON data (add and delete) are nested here because they're using the JSON data.
	$.getJSON("/getContacts", function(data){
		// Loops through each of the objects in the JSON file.
		$.each(data.contacts, function(i, data){
			// Appends a new table row for each contact and displays a contact's data within it. It also assigns an ID to the row that corresponds to the JSON object being placed in it. 
			$("#contactsTable").append('<tr id="' + data.id + '" class="tablerow"><td>' + data.first_name + '</td> <td>' + data.last_name + '</td> <td> ' + data.city + '</td> </tr>');
		});

		
		// When a contact in the table is clicked on, this function fires. It places the relevent user data into the contact details form.
		$(document).on("click", "tbody tr", function(){
			// Hides the search bar and contact table
			$("#tableID").hide();
			$("#search").hide();
			// Gets the ID of the row that was clicked on.
			console.log(this.id);
			var tablerowID = this.id;
			console.log(tablerowID);
			// Shows the contact form and pulls the relevent contact information from the JSON file.
			$("#contactForm").show();
			$("#firstNameField").val(data.contacts[tablerowID -1 ].first_name);
			$("#lastNameField").val(data.contacts[tablerowID -1 ].last_name);
			$("#genderField").val(data.contacts[tablerowID -1 ].gender);
			$("#addressField").val(data.contacts[tablerowID -1 ].address);
			$("#cityField").val(data.contacts[tablerowID -1 ].city);
			$("#postcodeField").val(data.contacts[tablerowID -1 ].post_code);
			$("#mobileField").val(data.contacts[tablerowID -1 ].number);
			$("#emailField").val(data.contacts[tablerowID -1 ].email);

			// When the update button is clicked, the entered data is placed into the JSON file.
			// The contact information form is hidden and the search bar and contact table is shown again.
			$("#updateBtn").on("click", function(){
				data.contacts[tablerowID].first_name = $('#firstNameField').val;
				data.contacts[tablerowID].last_name = $('#lastNameField').val;
				data.contacts[tablerowID].gender = $('#genderField').val;
				data.contacts[tablerowID].address = $('#addressField').val;
				data.contacts[tablerowID].city = $('#cityField').val;
				data.contacts[tablerowID].post_code = $('#postcodeField').val;
				data.contacts[tablerowID].phone = $('#mobileField').val;
				data.contacts[tablerowID].email = $('#emailField').val;
				$("#tableID").show();
				$("#search").show();
				$("#contactForm").hide();
			});

			// When the delete button is clicked, the selected contact is deleted from the JSON file.
			// The contact information form is hidden and the search bar and contact table is shown again.
			$("#deleteBtn").on("click", function(){
				$("#tableID").show();
				$("#search").show();
				$("#contactForm").hide();

				$.post('/deleteContact', {id:tablerowID}, function(data){
					console.log('data gone');
				});
			});
		});
	});
});

// Function that searches through the table when a key is entered into the search bar.
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
	
	var numOfRows = $("table tr:visible").length;
	$("#numOfResults").text((numOfRows -1) + " results found.")
}

// Function that sorts the table alphabetically by first name when a button is clicked.
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table
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
	// Changes text content of box to reflect the sort state.
  	document.getElementById("sortBtn").style.backgroundColor = "#F0136A";
	$("#sortBtn").text("Sorted A to Z");
}

function goBack(){
	$("#tableID").show();
	$("#search").show();
	$("#contactForm").hide();
}