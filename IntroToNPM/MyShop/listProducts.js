var faker = require("faker");

randomProduct(10);



function randomProduct(num){
    for(var i = 0; i < num; i++){
        console.log(faker.commerce.productName() + ":      $" + faker.commerce.price());
    }
}