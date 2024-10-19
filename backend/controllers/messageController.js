import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getMessage=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;

        const conversation=await Conversation.findOne({
            participants:{$all: [senderId,userToChatId]}
        }).populate("message")//Not reference but actual messages

        if(!conversation)return res.status(200).json([])

        const messages=conversation.message;// arrays of messages=>{senderId,receiverId,message}

        return res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller:", error.message)
        return res.status(500).json({error:"Internal server error."})
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const message=req.body.message;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
    
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })
    
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }
    
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            createdTime:new Date()
        })
    
        console.log(newMessage)
        if(newMessage){
            conversation.message.push(newMessage._id)
        }

        // await conversation.save();
        // await newMessage.save();
        
        Promise.all([conversation.save(),newMessage.save()]) // this will run in parallel
        
        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // io.to(<socket_id>).emit() used to send event to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        return res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage controller:",error.message)
        return res.status(500).json({error:"Internal server error."})
    }
}

