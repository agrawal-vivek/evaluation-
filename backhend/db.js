const mongoose=require("mongoose")
require("dotenv").config()

const connection =mongoose.connect("mongodb+srv://vivekagrawal:vivekagrawal@cluster0.laskgh0.mongodb.net/?retryWrites=true&w=majority")

module.exports={
    connection
}