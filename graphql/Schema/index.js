const {buildSchema} = require('graphql') 

module.exports = buildSchema(
`
type User {
    _id: ID!
    email: String!
    password: String
    name: String!
    cpf: String!
}
 input UserInput{
    email: String!
    password: String!
    name: String!
    cpf: String!
}

type Auth {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}


type RootQuery {
    users: [User!]!
    login(email:String!, password: String): Auth
}
 type RootMutation{
    createUser(userInput: UserInput): User
}
schema{
    query: RootQuery
    mutation: RootMutation
}

`
);