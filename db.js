const mongoose=require('mongoose');
const mongoURI="mongodb+srv://amaankp7867:amaan07%40@cluster0.xx8rf7j.mongodb.net/";

const connecttomongo=()=>{
    mongoose.connect(mongoURI).then(()=>{console.log("connected to database")}).catch(()=>{console.log("not connected")})
    
}
module.exports=connecttomongo;
