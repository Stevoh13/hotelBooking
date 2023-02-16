       //APP entry point
       const express = require('express');                                 //import express
       const app = express();                                              //initializing express              
       const bodyparser = require('body-parser');   
       const db  = require('./dataBase/db');

       const userRouter = require('./routes/users');                         //connecting/importing to the cars route
       const hotelRouter = require('./routes/hotels');                     //connecting to the owners route

       const users =  require('./models/users')

       const bcrypt = require('bcrypt');                                   //importing bcrypt

       app.use(express.static('public'));
       app.use(express.json());
       app.use(bodyparser.json());

       const port = process.env.PORT;                                      //define your port
       db.connectToMongoDB();                                              //connect to MongoDB
       

      
       app.get("/homepage", (req,res) => {                               //Homepage in JSON format
           res.status(200).json({message: "Hi there! Welcome to my Hotel Site"});
           });

       app.use('/users',authentication, userRouter);                                        //using users router
       app.use('/hotels', hotelRouter);                                    //using hotels router
                              
//Hashing password
   /*OwnersSchema.pre('save', function(next) {
       if(this.password) {
           const salt = bcrypt.genSaltSync(10)
           this.password = bcrypt.hashSync(this.password, salt)
           }
           next()
       })*/
//SIGN-IN..............................................................................
        app.post('/login', async (req,res) =>{
        const {username, password} = req.body;

        const user = await users.findOne({username})
        if (!user){
        return res.status(401).json({message:"Not a user"});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (isPasswordMatch){

        return res.status(200).json({message:"Auth successful"});
        }
        const token = Buffer.from(`${username}:${password}`).toString('base64');

        return res.status(401).json({message:"Auth failed"});
})

//MIDDLEWARE............................................................................
        async function authentication(req, res, next) {
        if (req.headers.authorization) {
        const authHeader = req.headers.authorization.split(' ');

        const authType = authHeader[0]; 
        const authValue = authHeader[1];
               
       if (authType === 'Basic') {        
        const [username, password] = Buffer.from(authValue, 'base64').toString().split(':');
        const user = await users.findOne({username});
        if (!user) {
            return res.status(401).json({
                message: 'Authentication failed'
        });
    }
   //compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (isPasswordMatch) {     
            req.user = user.username;              
            next();                                 
        } else { 
        return res.status(401).json({     
            message: 'Username or Password is incorrect'
        });
    }
       } else {
        return res.status(401).json({
            message: 'Auth failed'
    });
       }
        } else {
        return res.status(401).json({
           message: 'Auth header not present'
       });
   }
}


app.listen(port, () => {
   console.log(`bookStore is running on http://localhost:${port}`)
});
