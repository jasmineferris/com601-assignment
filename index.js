// http://zetcode.com/javascript/fakerjs/

// Pulls in Node.JS modules and makes them required.
// Pulling in the Faker module and the file system module.
const faker = require('faker');
const fs = require('fs');

// Pulling in the Express module.
// Express allows us to use it's methods to post data to/from the client and server.
var express = require('express');
var app = express();
app.use('/js', express.static('js'))
app.use('/css', express.static('css'))

// Pulling in the Body Parser module.
// Lets us use the 'splice' method when deleting contacts.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

// Faker doesn't have a predefined gender or sex methods, so this piece of code allows us to generate a random gender. 
// Also uses the 'random' function in Faker to specify that the random city has to be chosen from the 6 specified here.
let genders = [ 'Male' , 'Female', 'Other' ];
let cities = [ 'Belfast' , 'Derry', 'Ballymena', 'Newry ', 'Antrim', 'Armagh' ];

// Function where the fake contact data is generated.
function generateContacts(){
    // Declaring an array called 'users'.
    let users = [];
    // For loop that generates fake contact details and pushes it into variables.
    for (let id =1; id <=30; id++){
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let gender = faker.random.arrayElement(genders);
        let email = faker.internet.email();
        let address = faker.address.city();
        let city = faker.random.arrayElement(cities);
        let post_code =faker.address.zipCode();
        let number = faker.phone.phoneNumber();

        // Pushes the generated data in the variables into the 'users' array.
        users.push({
            "id": id,
            "first_name": firstName,
            "last_name": lastName,
            "gender" : gender,
            "email": email,
            "address": address,
            "city": city,
            "post_code": post_code,
            "number": number
        });
    }
    // Returns the 'users' array within 'contacts'.
    return {"contacts": users}
}

// Declaring a variable called 'dataObj'. The 'generateContacts()' function is called and it's return data is placed into 'dataObj'.
let dataObj = generateContacts();
// Writes to the JSON file by placing the contents of 'dataObj' into it. 
fs.writeFileSync('json/data.json', JSON.stringify(dataObj, null));

// Sends the contents of dataObj when called in main.js.
app.get('/getContacts', function(req, res){
    res.send(JSON.stringify(dataObj, null));
});

// Gets the specified user from main.js and deletes it from the array.
app.post('/deleteContact', function(req, res){
    var deleteID = req.body.id;
    if(dataObj.contacts.length <= deleteID){
        // Error handling in case an incorrect ID is sent.
        res.statusCode =404;
        return res.send('Error 404: No contact found.');
    }
    // Using the splice method from Body Parser to delete the contact.
    // 'deleteID' specifies what Array key to delete, '1' specifies we only want to delete that one.
    dataObj.contacts.splice(deleteID,1);
    res.json(true);
    res.end("yes");
});

// Using the post method to get the new user data from main.js and inputs it into the dataObj array.
app.post('/newContact', function(req, res){
    var newContact = {};
    newContact = req.body.id;
    dataObj.push(newContact);
});

// Using Express to point to index.html when using the local host feature to host the website locally.
app.get('/', function(req, res){
    fs.readFile('./index.html', function(err, data) {                                                            
    res.write(data);   
    res.end();                                                           
    });                                                                     
});
app.listen(1337);