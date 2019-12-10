// Uses JSON Server module
// https://github.com/typicode/json-server
// http://zetcode.com/javascript/fakerjs/

// Pulls in Node.JS modules and makes them required.
const faker = require('faker');
const fs = require('fs');

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