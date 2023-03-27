const express=require("express")
const postRouter=express.Router()
const{PostModel}=require("../model/post.model")
const jwt=require("jsonwebtoken")

postRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    try {
        if(decoded){
            const post =await PostModel.find({"userID":decoded.userID})
        res.status(200).send(notes)
        }else{
            res.status(400).send({"msg":"No post has been created by the user"})
        }
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }

})

postRouter.post("/add",async(req,res)=>{
    try {
        const post=new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"A new Post has been added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }


})

postRouter.patch("/update/:postID",async(req,res)=>{
    const payload=req.body
    const postID=req.params.postID
    try {
        await PostModel.findByIdAndUpdate({_id:postID},payload)
        res.status(200).send({"msg":"Post has been updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }

})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    const req_id=decoded.userID//The person who is making the delete request
    const post=PostModel.findOne({_id:postID})
    const user_ID_in_post=post.userID
    
    const postID=req.params.postID
    try {
        if(req_id==user_ID_in_post){
            await PostModel.findByIdAndDelete({_id:postID})
            res.status(200).send({"msg":"Post has been deleted"})
        }else{
            res.status(400).send({"msg":"Not Authorized"})
        }
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})



module.exports={
    postRouter
}