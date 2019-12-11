$(document).ready(function(){
	// Tooltip function. Uses the pre-coded Bootstrap capability (data-toggle).
	// https://getbootstrap.com/docs/4.1/components/tooltips/
	$('[data-toggle="tooltip"]').tooltip({html:true});
	
	// Hides the contact info form upon page load.
	$('#contactForm').hide();

	var contactIndex;
	var contactID =[];
	var firstName = [];
	var lastName = [];
	var gender = [];
	var address = [];
	var city = [];
	var postCode = [];
	var mobile = [];
	var email = [];

	

	// Loads in the JSON data and displays it in a table.
	// The event handlers for functions relating to the JSON data (add and delete) are nested here because they're using the JSON data.
	$.getJSON("/getContacts", function(data){
		// Loops through each of the objects in the JSON file.
		$.each(data.contacts, function(i, data){
			// Appends a new table row for each contact and displays a contact's data within it. It also assigns an ID to the row that corresponds to the JSON object being placed in it. 
			contactID.push(data.id);
			firstName.push(data.first_name);
			lastName.push(data.last_name);
			gender.push(data.gender);
			address.push(data.address);
			city.push(data.city);
			postCode.push(data.post_code);
			mobile.push(data.number);
			email.push(data.email);
		});

		for (i = 0; i < contactID.length; i++) {
			$("#contactsTable").append('<tr id="' + contactID[i] + '" class="tablerow"><td>' + firstName[i] + '</td> <td>' + lastName[i] + '</td> <td> ' + city[i] + '</td> </tr>');
		  }

		
		// When a contact in the table is clicked on, this function fires. It places the relevent user data into the contact details form.
		$(document).on("click", "#contactsTable tr", function(){
			// Hides the search bar and contact table
			$("#tableID").hide();
			$("#search").hide();
			// Gets the ID of the row that was clicked on.
			console.log(this.id);
			contactIndex = this.id;
			// Shows the contact form and pulls the relevent contact information from the JSON file.
			$("#contactForm").show();
			$("#firstNameField").val(firstName[contactIndex - 1]);
			$("#lastNameField").val(lastName[contactIndex -1]);
			$("#genderField").val(gender[contactIndex -1 ]);
			$("#addressField").val(address[contactIndex -1 ]);
			$("#cityField").val(city[contactIndex -1 ]);
			$("#postcodeField").val(postCode[contactIndex -1 ]);
			$("#mobileField").val(mobile[contactIndex -1 ]);
			$("#emailField").val(email[contactIndex -1 ]);

			for (i = 0; i < contactID.length; ++i) {
				if (city[i] == $("#cityField").val()){
					$("#relatedContactsTable").append('<tr id="' + contactID[i] + '" class="tablerow"><td>' + firstName[i] + '</td> <td>' + lastName[i] + '</td> <td> ' + city[i] + '</td> </tr>');
				}
			}

			// When the update button is clicked, the entered data is placed into the JSON file.
			// The contact information form is hidden and the search bar and contact table is shown again.
			$("#updateBtn").on("click", function(){
				firstName[contactIndex -1] = $('#firstNameField').val;
				lastName[contactIndex -1] = $('#lastNameField').val;
				gender[contactIndex-1] = $('#genderField').val;
				address[contactIndex-1] = $('#addressField').val;
				city[contactIndex-1] = $('#cityField').val;
				postCode[contactIndex-1] = $('#postcodeField').val;
				mobile[contactIndex-1] = $('#mobileField').val;
				var emailVar = $('#emailField').val;
				email[contactIndex-1] = emailVar;

				$("#tableID").show();
				$("#search").show();
				$("#contactForm").hide();
				$("#relatedContactsTable").empty();
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
				$("#relatedContactsTable").empty();
			});
		});
	});

	$(document).on("mouseenter", "table .tablerow", function(){
		$("#infoBox").show();
		const userIndexString = this.id;
		var floatingTip = document.getElementById("infoBox");
        var x, y;
    	// On mousemove use event.clientX and event.clientY to set the location of the div to the location of the cursor:
    	window.addEventListener('mousemove', function(event){
        	x = event.clientX;
        	y = event.clientY;                    
        	if ( typeof x !== 'undefined' ){
            	floatingTip.style.left = (x+20) + "px";
            	floatingTip.style.top = y + "px";
        	}
		}, false);

		$("#infoBoxEmail").text(email[userIndexString -1 ]);
	});

	$(document).on("mouseleave", "table .tablerow", function(){
		$("#infoBox").hide();
	});

	$('#infoBox').hide();
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
	$("#relatedContactsTable").empty();
}