export default password = ()=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password, salt, (err,hash)=>{
            // console.log(hash)
            password = hash;
            // console.log(hashPassword)
        })
    })
}