import { ApolloServer } from '@apollo/server';
import {mutations} from './user/mutations';
import {queries} from './user/queries';
import {resolvers} from './user/resolvers';


async function createApolloGraphQLServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                ${queries}
            }
            type Mutation {
                ${mutations}
            }
        `,
        resolvers
    });

    await gqlServer.start();
    return gqlServer;
}

export default createApolloGraphQLServer;
