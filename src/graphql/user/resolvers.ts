import { CreateUserPayload, UserService } from "../../services/user";

const queryResolvers = {
    getUserToken: async (_: any, payload: {email: string, password: string}) => {
        const token = await UserService.getUserToken({
            email: payload.email,
            password: payload.password
        });
        return token;
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