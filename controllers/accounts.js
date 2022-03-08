const express=require('express');
const router=express.Router();

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

router.post('/login',(request,response)=>{
    //const username=request.body.username;
    //const password=request.body.password;

    const {username,password} = request.body;
    for(i=0;i<users.length;i++)
    {
        if (users[i].username==username && users[i].password==password)
        {
            return response.status(200).json({
                message: `Hello ${username} from ${users[i].email}`
            });
        }
        else if(users[i].username==username)
        {
            return response.status(200).json({
                message: `Can't connect to ${username}, wrong password :<`
            });
        }
    }

    return response.status(200).json({
        message: `No such user :<`
    });
});

module.exports=router;