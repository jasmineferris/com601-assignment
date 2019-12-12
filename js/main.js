$(document).ready(function(){
	// Tooltip function. Uses the pre-coded Bootstrap capability (data-toggle).
	// https://getbootstrap.com/docs/4.1/components/tooltips/
	$('[data-toggle="tooltip"]').tooltip({html:true});
	
	// Hides the contact info form upon page load.
	$('#contactForm').hide();

	// Declaring Arrays to store contact data in.
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


	// Loads in the JSON data from index.js and displays it in a table.
	// We link to the '/getContacts' function in index.js and take the Faker.js data from it.
	$.getJSON("/getContacts", function(data){
		// Loops through each of the objects in the JSON file.
		$.each(data.contacts, function(i, data){
			// Gets the data from each key in the JSON objects and pushes them to an array.
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

		// Loops through the arrays (for however many there is), and adds a table row containing the contact data onto the table.
		for (i = 0; i < contactID.length; i++) {
			$("#contactsTable").append('<tr id="' + contactID[i] + '" class="tablerow"><td>' + firstName[i] + '</td> <td>' + lastName[i] + '</td> <td> ' + city[i] + '</td> </tr>');
		}

		
		// When a contact in the table is clicked on, this function fires.
		// It places the relevent user data into the contact details form.
		$(document).on("click", "#contactsTable tr", function(){
			// Hides the search bar and contact table
			$("#tableID").hide();
			$("#search").hide();
			// Gets the ID of the row that was clicked on.
			console.log(this.id);
			contactIndex = this.id;
			// Shows the contact form and pulls the relevent contact information from the arrays.
			// Use 'contactIndex - 1' because Arrays start at '0'.
			$("#contactForm").show();
			$("#firstNameField").val(firstName[contactIndex - 1]);
			$("#lastNameField").val(lastName[contactIndex -1]);
			$("#genderField").val(gender[contactIndex -1 ]);
			$("#addressField").val(address[contactIndex -1 ]);
			$("#cityField").val(city[contactIndex -1 ]);
			$("#postcodeField").val(postCode[contactIndex -1 ]);
			$("#mobileField").val(mobile[contactIndex -1 ]);
			$("#emailField").val(email[contactIndex -1 ]);

			// Shows related contacts to the one being displayed.
			// Loops through all the contacts and check if they're located in the same city as the contact being displayed.
			// Nested loop ensures the same selected contact isn't dislpayed again in the related contacts table.
			// The related contacts are then displayed in a table.
			for (i = 0; i < contactID.length; ++i) {
				if (city[i] == $("#cityField").val() && contactID[i] != contactIndex){
					$("#relatedContactsTable").append('<tr id="' + contactID[i] + '" class="tablerow"><td>' + firstName[i] + '</td> <td>' + lastName[i] + '</td> <td> ' + city[i] + '</td> </tr>');
				}
			}

			// When the update button is clicked, the entered data is placed into the arrays.
			// The contact information form and related contacts table is hidden and the search bar and contact table is shown again.
			// The contact related contacts form is also emptied to avoid duplication when another contact is viewed.
			$("#updateBtn").on("click", function(){
				firstName[contactIndex -1] = $('#firstNameField').val;
				lastName[contactIndex -1] = $('#lastNameField').val;
				gender[contactIndex-1] = $('#genderField').val;
				address[contactIndex-1] = $('#addressField').val;
				city[contactIndex-1] = $('#cityField').val;
				postCode[contactIndex-1] = $('#postcodeField').val;
				mobile[contactIndex-1] = $('#mobileField').val;
				email[contactIndex-1] = $('#emailField').val;

				$("#tableID").show();
				$("#search").show();
				$("#contactForm").hide();
				$("#relatedContactsTable").empty();
			});

			// When the delete button is clicked, the selected contact is deleted from the contact Arrays/JSON file.
			// We post to the index.js file using express so we can change it on the serverside.
			// The contact information form is hidden and the search bar and contact table is shown again.
			// The contact related contacts form is also emptied to avoid duplication when another contact is viewed.
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

	// When a user hovers over a contact in the table a info box appears, showing more information about the user.
	// The box follows the mouse, and disappears when the user moves the mouse off the table.
	$(document).on("mouseenter", "table .tablerow", function(){
		// The box is hidden by default in the css file. This shows it.
		$("#infoBox").show();
		// Takes the id of the table row currently moused over.
		var userIndexString = this.id;
		var floatingTip = document.getElementById("infoBox");
        var x, y;
    	window.addEventListener('mousemove', function(event){
			// X and Y variables set the location of the box to the mouse.
        	x = event.clientX;
			y = event.clientY;            
			// Sets how far away from the courser the box will display.        
        	if ( typeof x !== 'undefined' ){
            	floatingTip.style.left = (x+20) + "px";
            	floatingTip.style.top = y + "px";
        	}
		}, false);

		// Inputs the email of the contact that has been moused over.
		$("#infoBoxEmail").text(email[userIndexString -1 ]);
	});

	// When the user moves the mouse off a contact the info box disappears.
	$(document).on("mouseleave", "table .tablerow", function(){
		$("#infoBox").hide();
	});

	// Hides the info box on load, as it's only needed on a mouseover of the table rows.
	$('#infoBox').hide();
});

// Function that searches through the table when a key is entered into the search bar.
// It's fired when a user enters a key into the search bar. it searchs by first name.
// https://www.w3schools.com/howto/howto_js_filter_lists.asp
function searchContacts() {
    var filter, tableBody, tr, a, i, txtValue;
    filter = document.getElementById("searchField").value.toUpperCase();
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
	
	// Displays number of contacts showen on the table.
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

// When the user exits out of a contact.
// Hides and shows the relevent information.
// Clears the related contacts table.
function goBack(){
	$("#tableID").show();
	$("#search").show();
	$("#contactForm").hide();
	$("#relatedContactsTable").empty();
}