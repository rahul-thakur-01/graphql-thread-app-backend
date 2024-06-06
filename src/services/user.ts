import JWT from 'jsonwebtoken'
import { primsaClient } from "../lib/db"
import {createHmac, randomBytes} from 'node:crypto'

export interface CreateUserPayload{
    firstName: string
    lastName?: string
    email: string
    password: string
}

export interface GetUserTokenPayload{
    email: string
    password: string
}

export class UserService{
    public static createUser (payload : CreateUserPayload){
        const {firstName, lastName, email, password} = payload
        const salt = randomBytes(32).toString('hex');
        return primsaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: UserService.generateHash(salt, password)
            }
        })
    }

    private static getUserByEmail(email: string){
        return primsaClient.user.findUnique({where: {email}})
    }

    public static getUserById(id: string){
        return primsaClient.user.findUnique({where: {id}})
    }

    private static generateHash(salt: string , password: string){
        return createHmac('sha256', salt).update(password).digest('hex') 
    }

    public static async getUserToken(payload: GetUserTokenPayload){
        const {email, password} = payload;
        const user = await UserService.getUserByEmail(email);
        if(!user) throw new Error('Invalid email or password');

        const userSalt = user.salt;
        const userHashedPassword = UserService.generateHash(userSalt, password);
        if(userHashedPassword !== user.password) throw new Error('Invalid email or password');
        const token = JWT.sign({id: user.id,email: user.email}, process.env.SECRET_KEY as string , {expiresIn: '1d'})
        return token;
    } 

    public static async decodeJWTToken(token:string){
        return JWT.verify(token, process.env.SECRET_KEY as string);
    }
}