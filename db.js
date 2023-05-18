const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/";

const connecttomongo=()=>{
    mongoose.connect(mongoURI).then(()=>{console.log("connected to database")}).catch(()=>{console.log("not connected")})
    
}
module.exports=connecttomongo;