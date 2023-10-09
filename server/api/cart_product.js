const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", require('../auth/middleware'), async (req, res, next) => {
    const { product_id, quantity} = req.body;
    try {
        let openOrder = await prisma.Cart.findFirst({
            where: {
                user_id: req.user.id,
                is_cart: true,
            },
            include: {
                CartProduct: true,
            },
        });
        console.log(openOrder)
        if (!openOrder) {
            openOrder = await prisma.Cart.create({
                data: {
                    user_id: req.user.id,
                    is_cart: true
                }
            });
        }
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
                CartProduct: {
                    include: {
                        product: true
                    }
                }
            },
            });


            res.send({updatedCartProducts: openOrder.CartProduct})
        } else {
            console.log({cart_id: openOrder.id,
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
                CartProduct: {
                    include: {
                        product: true
                    }
                }
            },
            });
            res.send({updatedCartProducts: updatedOrder.CartProduct})
        }
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next)=>{
    try{
        const product = await prisma.CartProduct.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(product)
    }catch(error){
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try{
        const cartProduct = await prisma.CartProduct.update({
            where:{
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.send(cartProduct)
    }catch(error){
        next(error)
    }
})

module.exports = router;