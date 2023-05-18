const jwt = require('jsonwebtoken');
const jwt_secret='hello';
const fetchuser=(req,res,next)=>{
    const tokken=req.header("authtok");
    if(!tokken){
        res.status(401).send({error:"tokken not found"})
    }
    try {
        const data=jwt.verify(tokken,jwt_secret)
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"some error has occur in server"})
    }
    
}




module.exports = fetchuser;