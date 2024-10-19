import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login=async(req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username});
        if(user){
            const isPasswordCorrect =await bcrypt.compare(req.body.password,user.password);
            if(isPasswordCorrect===true){
                generateTokenAndSetCookie(user._id,res);

                console.log("User logged in successfully");
                return res.status(200).json({
                    _id:user.id,
                    fullName:user.fullName,
                    username:user.username,
                    profilePic:user.profilePic,
                })
            }else{
                return res.status(500).json({error:"Invalid credentials"});
            }
        }else{
            return res.status(404).json({error:"User not found"});
        }
    } catch (error) {
        console.log("Error in login controller:",error.message)
        return res.status(500).json({error});
    }
}

export const signup=async(req,res)=>{
    try{
        const {username,fullName,password,confirmPassword,gender}=req.body;
    
        if(password!==confirmPassword)return res.status(400).json({error:"Password don't match"})
    
        const user=await User.findOne({username:username});
        if(user){
            return res.status(400).status({error:"Username already exists"})
        }
    
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser=new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender==="male" ? boyProfilePic : girlProfilePic,
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();

            return res.status(201).json({
                _id:newUser.id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic,
            })
        }else{
            return res.status(400).json({error:"Invalid user data"})
        }

        
    } catch (error) {
        console.log("Error in signup controller:",error.message)
        return res.status(500).json({error:"Internal server error."})
    }
}

export const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller:",error.message)
        return res.status(500).json({error:"Internal server error."})
    }
}
