const mongoose=require('mongoose');
const mongoURI="mongodb+srv://zoro:zoro7867!@cluster0.jtd1tm9.mongodb.net/";

const connecttomongo=()=>{
    mongoose.connect(mongoURI).then(()=>{console.log("connected to database")}).catch(()=>{console.log("not connected")})
    
}
module.exports=connecttomongo;
