import express from 'express'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup= async (req,res)=>{
    console.log("Received body:", req.body); //Added this line  to request body
    const {fullName,email,password}=req.body;
    try {
        //hashing the password
        if(!fullName || !password || !email){
            return res.status(400).json({message:"Please enter all credentials"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least character long"})
        }

        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        });
        
        if(newUser){
            //create jwt token here
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({_id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            });
        }
        else{
            res.status(400).json({message:"Invalid user Data"});
        }
    } catch (error) {
        console.error("Error in signUp controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const login=async(req,res)=>{
    const {email,password}=await req.body;
    try {
        if( !email||!password||password.length<6){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const user=await User.findOne({email});
        if(!user){
            console.error("User doesn't exist");
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            console.error("Incorrect Password")
            return res.status(400).json({message:"Invalid credentials"});
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })
    } catch (error) {
        console.error("Error in login controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

}

export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.error("Error in logout controller",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateProfilePic=async (req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;

        if(!profilePic){
            res.status(400).json({message:"Profile pic is required"});
        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in profilePic controller",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.error("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}