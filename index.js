// Uses JSON Server module
// https://github.com/typicode/json-server
// http://zetcode.com/javascript/fakerjs/

// Pulls in Node.JS modules and makes them required.
const faker = require('faker');
const fs = require('fs');

var express = require('express');
var app = express();
app.use('/js', express.static('js'))
app.use('/css', express.static('css'))

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

// Faker doesn't have a predefined gender or sex methods, so this piece of code allows us to generate a random gender. 
let genders = [ 'Male' , 'Female', 'Other' ];

// Function where the fake contact data is generated.
function generateContacts(){
    // Declaring an array called 'users'.
    let users = [];
    // For loops that generates 50 fake contact details and pushes it into variables.
    for (let id =1; id <=50; id++){
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let gender = faker.random.arrayElement(genders);
        let email = faker.internet.email();
        let address = faker.address.city();
        let city = faker.address.city();
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

fs.readFile('json/data.json', function(err, data){
    if (err){
        throw err;
    }
    var parseData = JSON.parse(data);
});

app.get('/getContacts', function(req, res){
    res.send(dataObj);
});
app.post('/deleteContact', function(req, res){
    var id = req.body.id;
    if(dataObj.length <= id){
        res.statusCode =404;
        return res.send('Error 404: No contact found.');
    }
    dataObj.splice(id,1);
    res.json(true);
    res.end("yes");
});

app.post('/newContact', function(req, res){
    var newContact = {};
    contactsArray.push(newContact);
});

app.get('/', function(req, res){
    fs.readFile('./index.html', function(err, data) {                                                            
    res.write(data);   
    res.end();                                                           
    });                                                                     
})

app.listen(1337);