const User = require('../../Models/User')
const {transformUsers} = require('../Resolvers/merge')
module.exports = {
    users: async () => {
        try{
            const users = await User.find()
            return users.map(user => {
                return transformUsers(user)
        })
    }
        catch(err){
            throw err
        }
    }
}