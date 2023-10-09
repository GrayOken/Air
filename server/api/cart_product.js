const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", require('../auth/middleware'), async (req, res, next) => {
    const { product_id, quantity} = req.body;
    try {
        const openOrder = await prisma.Cart.findFirst({
            where: {
                user_id: req.user.id,
                is_cart: true,
            },
            include: {
                CartProduct: true,
            },
        });
        console.log(openOrder)
        const existingProduct = openOrder.CartProduct.find(
            (i) => i.product_id === product_id
        );

        if (existingProduct) {
            const updatedCartProduct = await prisma.CartProduct.update({
                where: { id: existingProduct.id },
                data: {
                    quantity: existingProduct.quantity + quantity,
                },
            });

            const openOrder = await prisma.Cart.findFirst({
                where: {
                    user_id: req.user.id,
                    is_cart: true,

                },
                include: {
                    CartProduct: true,
                    },
            });


            res.send({addedToCart: openOrder.CartProduct})
        } else {
            console.log({cartId: openOrder.id,
                product_id,
                quantity})
            const createdCartProduct = await prisma.CartProduct.create({
                data: {
                    cart_id: openOrder.id,
                    product_id,
                    quantity
                },
            });
            const updatedOrder = await prisma.Cart.findFirst({
                where: {
                    user_id: req.user.id,
                    is_cart: true
                },
                include: {
                    CartProduct: true,
                },
            });
            res.send({addedToCart: updatedOrder.CartProduct})
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;