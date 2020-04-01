const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql');
const grqlSchema = require('./graphql/Schema/index')
const grqlResolvers = require('./graphql/Resolvers/index')
const isAuth = require('./middleware/is-auth')
const cors = require('cors')
require('./config/mongodb')
const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next();
})
app.use(isAuth);
app.mongo = mongoose
app.use('/graphql', graphqlHttp({
    schema: grqlSchema,
    rootValue: grqlResolvers,
    graphiql: true
}))

app.listen(8000)






