import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import  {generateToken} from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
   const {email,fullName : fulName,password}=req.body;
  try{
     if(!email || !fulName || !password){
        return res.status(400).json({message:"Please fill all the fields"});
     }

   if(password.length<6){
      return res.status(400).json({message:"Password should be atleast 6 characters long"});
   }

   const user=await User.findOne({email});
    if(user){
        return res.status(400).json({message:"User already exists"});
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=await User.create({
        email,
        fulName:fulName,
        password:hashedPassword,
    });

    if(newUser){
       generateToken(newUser._id,res);
       await newUser.save();
       
       res.status(201).json({
        _id:newUser._id,
        fulName:newUser.fulName,
        email:newUser.email,
        profilePic:newUser.profilePic,
       });

    }else{
        return res.status(400).json({message:"Failed to create user"});
    }
        
  }catch(error){
      console.error(`Error: ${error.message}`);
      res.status(500).json({message:"Server error"});
  }
  };


  export const login =async (req, res) => {
    const {email,password}=req.body;
  
      try{
          const user=await User.findOne({email});

          if(!user){
              return res.status(400).json({message:"Invalid credentials"});
          }
             
          const isPasswordCorrect=await bcrypt.compare(password,user.password);
          if(!isPasswordCorrect){
              return res.status(400).json({message:"Invalid credentials"});
          }

          generateToken(user._id,res);
          res.status(200).json({
            _id:user._id,
            fulName:user.fulName,
            email:user.email,
            profilePic:user.profilePic,
          });
              

      }catch(error){

        console.log(`Error: ${error.message}`);
        res.status(500).json({message:`${error.message}`});
      }
          
  };


  export const logout = (req, res) => {
     try{
       res.cookie("jwt","",{maxAge:0});
       res.status(200).json({message:"Logged out successfully"});
     }catch(error){
         console.error(`Error: ${error.message}`);
         res.status(500).json({message:"Server error"});
     }
  };

  export const updateProfile=async (req,res)=>{
    try{
      const {profilePic}=req.body;
      const userId= req.user._id;

      if(!profilePic){
        return res.status(400).json({message:"Please provide a profile picture"});
      }

      const uploadResponse=await cloudinary.uploader.upload(profilePic);

      const updatedUser=await User.findByIdAndUpdate(userId,{
        profilePic:uploadResponse.secure_url,
      },{new:true});

      res.status(200).json(updatedUser);
        
    }catch(error){
       console.error(`Error: ${error.message}`);
        res.status(500).json({message:"Server error"});
    }
     
  }

  export const checkAuth=(req,res)=>{
    try{
      res.status(200).json(req.user);
      console.log("checking auth");
    }catch{
      console.error(`Error in check auth controller: ${error.message}`);
      res.status(500).json({message:"Server error"});
    }
  }
