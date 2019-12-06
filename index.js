// Uses JSON Server module
const faker = require('faker');
const fs = require('fs');

    let genders = [ 'Male' , 'Female', 'Other' ];

function generateContacts(){
    let users = [];
    for (let id =1; id <=50; id++){
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let gender = faker.random.arrayElement(genders);
        let email = faker.internet.email();
        let address = faker.address.city();
        let city = faker.address.city();
        let post_code =faker.address.zipCode();
        let number = faker.phone.phoneNumber();

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
    return {"contacts": users}
}

let dataObj = generateContacts();
fs.writeFileSync('json/data.json', JSON.stringify(dataObj, null));