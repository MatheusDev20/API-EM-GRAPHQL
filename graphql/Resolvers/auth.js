const cript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../Models/User')

module.exports = {
    createUser: async args => {
        try{
            const existUser = await User.findOne({email:args.userInput.email})
                if(existUser){
                throw new Error('Usuário já Cadastrado')
        }
        const hashPassword = await cript.hash(args.userInput.password,  12)
        const user = new User({
            email: args.userInput.email,
            password: hashPassword,
            name: args.userInput.name,
            cpf: args.userInput.cpf
        })
        const result = await user.save()
        return{...result._doc, password: null, _id: result.id }
    } catch(err) {
        throw err;
    }
},
login: async ({email,password}) => {
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error ('Usuario Não existe')
    }
    const isEqual = await cript.compare(password, user.password)
       if(!isEqual){
           throw new Error('Senha incorreta')
       }
    const token = await jwt.sign({userId:user.id, email: user.email}, 'secretkey',{
        expiresIn: '1h'
    })
    return {
        userId:user.id,
        token: token,
        tokenExpiration: 1
    }
 }
}
