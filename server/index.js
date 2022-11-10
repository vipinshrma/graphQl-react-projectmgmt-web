const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema/schema')
const colors = require('colors')
const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()

const port = process.env.PORT || 5000;

const app = express()

connectDB()
app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:process.env.NODE_ENV ='development' 
}))

app.listen(port,()=>console.log(`port listening on ${port}`))