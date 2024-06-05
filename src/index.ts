import express from 'express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'

async function init(){
    const app = express();
    const port = process.env.PORT || 3000;
    app.use(express.json());

    // create graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello there i am a graphql server!',
                say: (_,{name}: {name:String}) => `Hello ${name} i am a graphql server!`
            }
        }
    });

    //start the gql server
    await gqlServer.start();

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use('/graphql', expressMiddleware(gqlServer));

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}

init();