const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const schema = require('./src/schema');
const cors = require('cors');

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,   
    graphiql: true
}));    

const Port = 4000;

app.listen(Port, ()=>{
    console.log(`Listening on port ${Port}`);
});