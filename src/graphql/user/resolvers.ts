import { CreateUserPayload, UserService } from "../../services/user";

const queryResolvers = {
    getUserToken: async (_: any, payload: {email: string, password: string}) => {
        const token = await UserService.getUserToken({
            email: payload.email,
            password: payload.password
        });
        return token;
    },
    getCurrentLoggedInUser: async (_:any, parameter: any, context: any) => {
        if(context && context.user){
            const id = context.user.id;
            const user = await UserService.getUserById(id);
            return user;
        }
        throw new Error('User not logged in');
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