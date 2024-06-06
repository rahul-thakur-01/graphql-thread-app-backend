import { ApolloServer } from '@apollo/server';
import {User} from './user/index';


async function createApolloGraphQLServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                ${User.queries},
            }
            type Mutation {
                ${User.mutations},
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.Query,
            }, 
            Mutation: {
                ...User.resolvers.Mutation
            }
        }
    });

    await gqlServer.start();
    return gqlServer;
}

export default createApolloGraphQLServer;
