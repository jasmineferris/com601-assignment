var fs = require('fs');
var express = require('express')
var app= express()

app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/img', express.static('img'))

app.get('/', function(req, res){
    fs.readFile('index.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200);
        red.write(data);
        res.end();
    });
})

.listen(1337);

var faker = require('faker');
var fs = require('fs');

var dataArray = [];

for (var i = 0; 1 <50; i++){
    var data = {};
    data.first_name = faker.name.firstName();
    data.last_name = faker.name.lastName();
    data.email = faker.internet.email();
    data.address = faker.address.streetAddress();
    data.date_of_birth = faker.date.past();
    data.city = faker.address.city();
    data.post_code = faker.address.zipCode();
    data.number = faker.phone.phoneNumber();
    dataArray.push(data);
}

fs.writeFile('json/data.json', JSON.stringify(dataArray), (err) => {
    if (err) throw err;
    console.log('new file created');
});