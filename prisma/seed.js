const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");
const products = require("./data.js");


async function seed() {
    console.log("Clearing the previous database")
    console.log(products)
    //delete order important here
    await prisma.product.deleteMany()
    await prisma.cartProduct.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.user.deleteMany()
    
    console.log("Seeding the database")
    
    for (let i = 0; i < 10; i++) {
        const salt_rounds = 5;
        
        const hashedPassword = await bcrypt.hash("password123", salt_rounds)
        await prisma.user.create({
            data: {
                username: faker.internet.userName(),
                password: hashedPassword,
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                role: "user"//user or Admin
            }
        })
    }
    // for (let product of products) {
    //     await prisma.product.create({
    //         data: product
    //     })
    // }
    
    console.log("Database seeded")
}

seed().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})

