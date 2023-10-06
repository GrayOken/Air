const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/', async (req, res, next)=>{
    try{
        const user = await prisma.cart.create({
            data:req.body
        })
        res.send(user)
    }catch(error){
        next(error)
    }
})

router.get('/', async (req, res, next)=>{
    try{
        const allUsers = await prisma.user.findMany();
        res.send(allUsers)
    }catch(error){
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    try {
        const singleUser = await prisma.user.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })
    }catch(error){
        next(error)
    }
})

router.put('/:id', async (req, res, next)=>{
    try{
        const user = await prisma.user.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        })
        res.send(user)
    }catch(error){
        next(error)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try{
        const user = await prisma.user.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(user)
    }catch(error){
        next(error)
    }
})

module.exports = router;