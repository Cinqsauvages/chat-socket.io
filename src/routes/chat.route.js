import { Router } from "express";


export const chatRoute = Router();


chatRoute.get('/', (req,res) =>{
    res.render('chat');
})
