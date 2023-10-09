const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
// get cart by cart id
// router.get('/:id', async (req, res, next)=>{
//     try{
//         const cartId = await prisma.cart.findUnique({
//             where:{
//                 id: Number(req.params.id)
//             }
//         })
//         res.send(cartId)
//     }catch(error){
//         next(error)
//     }
// })
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
                userId: Number(req.params.userId)
            }, include: {
                CartProduct: true
            }
        })
        res.send(userCarts)
    }catch(error){
        next(error)
    }
}) 

router.get('/orders/:id', async (req, res, next) => {
     try {
         const orders = await prisma.user.findUnique({
             where:{
                 id: Number(req.params.id)
             },
             include: {
                 Cart: {
                     include: {
                         CartProduct: true
                     }
                 }
             }
     });
         res.send(orders.Cart.filter((i)=> i.is_cart === false));
     }catch (error) {
         next(error)
     }
 })

router.post("/submit", async (req, res, next) => {

    try {
        async function findOpenOrder() {
            const openOrder = await prisma.Cart.findFirst({
                where: {
                    user_id: req.user.id,
                    is_cart: true,
                },
            });
            console.log(openOrder)
            return openOrder.id;
        }
        async function closeOrder() {
            const ClosedOrder = await prisma.Cart.update({
                where: {
                    id: await findOpenOrder(),
                },
                data: {
                    is_cart: false,
                },
            });
        }

        closeOrder();

        const NewOrder = await prisma.Cart.create({
            data: {
                user_id: req.user.id,
                is_cart: true,
            },
        });

        res.send({ NewOrder});
    } catch (err) {
        next(err);
    }
});

router.get('/active_cart', async (req,res,next)=>{
    try{
        const cart = await prisma.cart.findFirst({
            where: {
                user:{
                    id: req.user.id
                },
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
        res.send(cart)
    }catch(error){
        next(error)
    }
})

module.exports = router;