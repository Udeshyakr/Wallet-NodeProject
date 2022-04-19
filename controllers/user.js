import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import User from '../models/user.js';
import asyncWrapper from '../middleware/async.js';
import sendEmail from "../utils/email.js";
import sendToken from '../utils/webToken.js';


var balance = 1500;

export const getAllUsers = asyncWrapper( async(req, res) =>{
    const allUsers = await User.find({})
        res.status(201).json({allUsers})
})

export const createUser = asyncWrapper( async(req, res) =>{
    const {username, email, password} = req.body
    const newUser = new User({
        username,
        email,
        password,
        balance
    })
    const userExists = await User.findOne({email})
    if(userExists){
        res.json({
            status: false,
            message: `User with this email: ${userExists} already exists`
        })
    }else
    {
        newUser.save(async(_, user) =>{
            res.status(200).json(user);
            console.log(user.email)
            if(user){
                console.log('The amount is: ',balance);
                sendEmail({
                    email: user.email,
                    subject:"Verification Link" ,
                    message:"This is your verification link after signup'<a href='https://blocknaut.com/password-reset-link'>Please click to view your token.</a>" +"The amount credited to Your wallet is:-" + balance
                })
            }
        })
    }
})

export const logIn = asyncWrapper( async (req, res) =>{
    const {email} = req.body;
    const user = await User.findOne({email})
    if(user)
    {
        sendToken(user, res) 
    }
    else 
    {
        res.status(404).json({
            success: false,
            message: `user not found!`
        })
    }
})

export const transferAmount = asyncWrapper(async (req, res) =>{

    const {email, amount}  = req.body
    const user = await User.findOne({email, amount})
    
    if(user)
    {
        var Balance = user.balance + amount;
        if(Balance > 0){
            
            res.status(200).json({
                success: true,
                message: "Transaction successful"
            })
            console.log(user.email)
            console.log("Balance of User:", user.balance)

            sendEmail({
                email: user.email,
                subject: "Transaction Successful!!",
                message: "Your Transaction has been sent to:" + user.email + ". The amount has been credited to the user" + " " + Balance
            })
        }
        else
        {
            res.status(404).json({
                status: false,
                message: "Insufficient fund..."
            })
        }

        
    }
    else{
        res.status(500).json({
            success: false,
            message: "Invalid User, Please try again...."
        })
    }
})

export const deleteUser = asyncWrapper(async (req, res) =>{  
    const {email: emailID} = req.body
    const user = await User.findOneAndDelete({email:emailID})
    if(!user){
        //always return.
        return res.status(404).json({
            success: false,
            message: `USer with ${emailID} is not found`
        })
    }
    res.status(200).json({user});
})

