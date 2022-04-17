const faker = require('faker');
const fs = require("fs");

faker.locale = 'vi';

//random data
// console.log(faker.commerce.department());
const randomCategoryList = (n) => {
    if (n <= 0) return [];
    const categotyList = []

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAr: Date.now(),

        };

        categotyList.push(category)
    });

    return categotyList;
};

const randomProductList = (categotyList, numberOfProduct) => {
    if (numberOfProduct <= 0) return [];
    const productList = [];

    //random data

    for (const category of categotyList) {
        Array.from(new Array(numberOfProduct)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price(10000, 45000)),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnail: faker.image.imageUrl(400, 400),
            }
            productList.push(product);
        })
    }

    return productList;
}

(() => {
    //random data
    const categotyList = randomCategoryList(5);
    const productList = randomProductList(categotyList, 100);
    const db = {
        categories: categotyList,
        products: productList,
        profile: {
            name: 'xuannd',
        }
    }
    //ghi vao file db
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('json sussess');
    });
})();