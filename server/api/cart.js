const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
// get cart by cart id
router.get('/:id', async (req, res, next)=>{
    try{
        const cartId = await prisma.cart.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })
        res.send(cartId)
    }catch(error){
        next(error)
    }
})
// update cart by cart id
router.put('/:id', async (req, res, next)=>{
    try{
        const cart = await prisma.cart.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        })
        res.send(cart)
    }catch(error){
        next(error)
    }
})
// delete cart by cart id
router.delete('/:id', async (req, res, next)=>{
    try{
        const cart = await prisma.cart.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(cart)
    }catch(error){
        next(error)
    }
})
// Gets all carts by userId
router.get('/user/:userId', async (req, res, next)=>{
    try{
        const userCarts = await prisma.cart.findMany({
            where:{
                user_id: {
                   equals: Number(req.params.userId)
                }
            }, include: {
                CartProduct: true
            }
        })
        res.send(userCarts)
    }catch(error){
        next(error)
    }
}) 

module.exports = router;