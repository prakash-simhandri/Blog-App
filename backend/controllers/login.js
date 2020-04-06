module.exports = (sigIn, DB_model, jwt) => {

    sigIn.post('/verifytoken',(req,res)=>{
        let new_data =req.body
        jwt.verify(new_data.newToken,process.env.SECRETKEY,(err,authData)=>{
            if (!err) {
                res.send(authData)
            }else{
                res.sendStatus(403);
            }
        })
    })


    sigIn.post('/signin', (req, res) => {
        const { email, password } = req.body;
        DB_model.find({}, (err, data) => {
            if (!err) {
                const email_items = data.map(Dict_data => (Dict_data.email));
                const password_items = data.map(Dict_data => (Dict_data.password));
                if (email_items.includes(email) && password_items.includes(password)) {
                    DB_model.findOne({email:email}).select(['-password','-createdAt','-updatedAt','-__v'])
                        .then(Response => {
                            jwt.sign({Response}, process.env.SECRETKEY,{ expiresIn:'2 days' }, (err,token)=>{
                                if (!err) {
                                    res.send(token) 
                                }else{
                                    res.sendStatus(403)
                                }
                                
                            })

                        })
                        .catch(Reject => {
                            res.send(Reject.message)
                            // res.status(Reject.status || 500).json({ code: Reject.code || 'Error', message: Reject.toString() });
                        })
                    // res.send('willcome to home page..!')

                } else if (!email_items.includes(email)) {
                    res.send('Email is not carect..!');

                } else {

                    res.send('password is not carect..!');
                    
                }
            } else {
                res.send(err)
            }
        })
    })

    // sigIn.post('/verifytoken',verifyToken,(req,res)=>{
    //     jwt.verify(req.token,process.env.SECRETKEY,(err,authData)=>{
    //         if (!err) {
    //             res.send(authData)
    //         }else{
    //             res.sendStatus(403);
    //         }
    //     })
    // })

    // // Verify token
    // function verifyToken(req,res,next){
    //     // Get auth header value
    //     const bearerHeader = req.headers['authorization'];
    //     // Check if bearer is undefined

    //     if (typeof(bearerHeader)!== 'undefined') {
    //         const bearer = bearerHeader.split(' ')
    //         const bearerToken = bearer[1]
    //         req.token = bearerToken
    //         next()
                 
    //     }else{
    //         // Forbidden
    //         res.sendStatus(403)
    //     }
        
    // }

}