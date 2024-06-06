import { CreateUserPayload, UserService } from "../../services/user";

const queryResolvers = {
    hello: async () => {
        return "Hello World";
    }
};

const mutationResolvers = {
    createUser: async (_: any, payload : CreateUserPayload) => {
        const response = await UserService.createUser(payload);
        return response.id;
    }
}

export const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers
};