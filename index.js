// Uses JSON Server module


const faker = require('faker');
const fs = require('fs');

function generateContacts(){
    let users = [];
    for (let id =1; id <=50; id++){
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();
        let address = faker.address.city();
        let date_of_birth = faker.date.past();
        let city = faker.address.city();
        let post_code =faker.address.zipCode();
        let number = faker.phone.phoneNumber();

        users.push({
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "address": address,
            "date_of_birth": date_of_birth,
            "city": city,
            "post_code": post_code,
            "number": number
        });
    }
    return {"contacts": users}
}

let dataObj = generateContacts();
fs.writeFileSync('json/data.json', JSON.stringify(dataObj, null));