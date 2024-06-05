const queryResolvers = {
    hello: async () => {
        return "Hello World";
    }
};

const mutationResolvers = {
    createUser: async (_: any, { firstName, lastName, email, password } : any) => {
        return `User created: ${firstName} ${lastName}`;
    }
}

export const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers
};