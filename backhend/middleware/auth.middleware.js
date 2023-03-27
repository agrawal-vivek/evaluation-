const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
       const decoded= jwt.verify(token,"masai")
       if(decoded){
        req.body.userID=decoded.userID
        next()
       }else{
        res.send(400).send({"msg":"Plz login first"})
       }
    }else{
        res.send(400).send({"msg":"Plz login first"})
    }
}

module.exports={
    auth
}