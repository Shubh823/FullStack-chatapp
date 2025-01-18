import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import {getReceiverSocketId,io} from "../lib/socket.js";

export const getUsersForSidebar=async (req,res)=>{
    try{
       const loggedIdUserId=req.user._id;
       const filteredUser=await User.find({_id:{$ne:loggedIdUserId}}).select("-password");
       res.status(200).json(filteredUser);
    }catch(error){
       console.error(`Error in getuserforsidebar: ${error.message}`);
       res.status(500).json({message:"Server error"});
    }
}

export const getMessages=async (req,res)=>{
    try {
        const {id:UserToChatId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({$or:[
            {senderId:myId,receiverId:UserToChatId},
            {senderId:UserToChatId,receiverId:myId}
        ]})

        res.status(200).json(messages);
    } catch (error) {
        console.log(`Error in getMessages: ${error.message}`);
        res.status(500).json({message:"Server error"});
    }
}

export const sendMessage=async (req,res)=>{
  try {
    
    const {text,image}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;
    

    let imageUrl="";
    if(image){
       const uploadedResponse=await cloudinary.uploader.upload(image);
       imageUrl=uploadedResponse.secure_url;   
    }
    
    const newMessage=new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl,
    });

    await newMessage.save();
   
    //todo realtime functionality
    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
     console.log(`Error in sendMessage: ${error.message}`);
     res.status(500).json({message:"Server error"});
    }

}
