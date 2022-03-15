const express=require('express');
const router=express.Router();
//15.3.22
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");


const users= [
    {
        username: 'john Mann',
        password: '123456',
        email: 'johnmann@hotmail.com'
    },
    {
        username: 'johnson Mann',
        password: '654321',
        email: 'sonofjohn@hotmail.com'
    }
];

//POST : http://localhost:5090/api/accounts/sayHello
router.post('/sayHello',(request,response)=>{
    const fname=request.body.full_name;
    console.log(fname);

    return response.status(200).json({
        message: `Hello ${fname} from API route`
    });
});

router.post('/signup',async(request,response)=>{
    const newUser=request.body;
    let flag=true
    for(i=0;i<users.length;i++){
        if (users[i].email==newUser.email){
            return response.status(200).json({
                message: `User already exists.`
            });
        }
    }
    if (newUser.email=="" || newUser.username=="" || newUser.password=="" || newUser.email==null || newUser.username==null || newUser.password==null){
        return response.status(200).json({
            message: `data is missing.`
        });
    }
    if (flag){
        const hash_password= await bcryptjs.hash(newUser.password,10);
        newUser.password=hash_password;
        users.push(newUser);
        return response.status(200).json({
            message: `User created successfully.`
        });
    }
});

router.post('/login',async(request,response)=>{
    const logUser = request.body;
    if (logUser.email=="" || logUser.username=="" || logUser.password=="" || logUser.email==null || logUser.username==null || logUser.password==null){
        return response.status(200).json({
            message: `data is missing.`
        });
    }
    
    /* use this instead of for():
    * 
        const account = await users.find(x => x.email == logUser.email);
    *
    * returns the user with matching email to the logUser
    */

    for(i=0;i<users.length;i++)
    {
        if (users[i].email==logUser.email && await bcryptjs.compare(logUser.password,users[i].password))
        {
            const sessionToken = await jsonwebtoken.sign(logUser,"whorse");
            return response.status(200).json({
                message: `welcome ${logUser.username} from ${users[i].email}`,
                token: sessionToken
            });
        }
        else if(users[i].email==logUser.email)
        {
            return response.status(200).json({
                message: `Can not connect to ${logUser.username}`
            });
        }
    }
    return response.status(200).json({
        message: `No such user :<`
    });
});

module.exports=router;