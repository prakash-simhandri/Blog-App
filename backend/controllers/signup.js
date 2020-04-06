module.exports =(sigNp,DB_model)=>{    
    sigNp.post('/signup',(req,res)=>{
        const {username,useremail,password } = req.body;

        var user_data = new DB_model({name:username,email:useremail,password:password})

        user_data.save(function(err){
            if (!err) {
                res.send('Successfully saved...!')
            }else{
                // var info = err.message.slice(62,63);
                
                res.send(err.message.split(" "));
            }
        })
        
    })
}   