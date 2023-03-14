import { Request, Response, Router } from "express";
import User from "../models/user";
import { checkUserExistence, createUser } from "../services/user.services";
const bcrypt = require('bcrypt');
export const userRouter = Router();

userRouter.post("/create", async (req: Request, res: Response) => {
   
    const user: User = {
        verified: false,
        email: req.body.email,
        fname: req.body.fname,
        mname: null,
        lname: req.body.lname,
        dob: null,
        gender: null,
        pan: null,
        adhar: null,
        password: await bcrypt.hash(req.body.password,8),
        address: {
            city: null,
            contact: null,
            pincode: null,
            residence: null,
            state: null
        },
        type: req.body.type,
    }


    // Check already exist
    var flag = await checkUserExistence(user.email);
    if (flag === undefined) {
        const userCreation = await createUser(user);
        !userCreation ?
            res.status(500).json({ message: "Error while creating user" }) :
            res.status(200).json({ message: "User account created Succesfully !" })
    }
    else {
        res.status(200).json({ message: "User alredy exist go back and login !"})
    }

})
