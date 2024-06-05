import express from 'express';
import createAppoloGraphQLServer from './graphql/index';
import {expressMiddleware} from '@apollo/server/express4'


async function init(){
    const app = express();
    const port = process.env.PORT || 3000;
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use('/graphql', expressMiddleware(await createAppoloGraphQLServer()));

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}

init();





// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import {expressMiddleware} from '@apollo/server/express4'
// import { primsaClient } from './lib/db';

// async function init(){
//     const app = express();
//     const port = process.env.PORT || 3000;
//     app.use(express.json());

//     // create graphql server
//     const gqlServer = new ApolloServer({
//         typeDefs: `
//             type Query {
//                 hello: String
//                 say(name: String): String
//             }
//             type Mutation{
//                 createUser(firstName: String!, lastName: String! , email : String!, password: String!): Boolean
//             }
//         `,
//         resolvers: {
//             Query: {
//                 hello: () => 'Hello there i am a graphql server!',
//                 say: (_,{name}: {name:String}) => `Hello ${name} i am a graphql server!`
//             },
//             Mutation: {
//                 createUser:async (_,
//                     {firstName, lastName, email, password}: {firstName: string, lastName: string, email: string, password: string}) => {
//                         await primsaClient.user.create({
//                             data: {
//                                 firstName,
//                                 lastName,
//                                 email,
//                                 password,
//                                 salt: 'random_salt'
//                             }
//                         });
//                     console.log(firstName, lastName, email, password);
//                     return true;
//                 }
//             }
//         }
//     });

//     //start the gql server
//     await gqlServer.start();

//     app.get('/', (req, res) => {
//         res.send('Hello World!');
//     });

//     app.use('/graphql', expressMiddleware(gqlServer));

//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     });

// }

// init();