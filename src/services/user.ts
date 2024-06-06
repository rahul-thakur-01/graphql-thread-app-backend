import { primsaClient } from "../lib/db"
import {createHmac, randomBytes} from 'node:crypto'

export interface CreateUserPayload{
    firstName: string
    lastName?: string
    email: string
    password: string
}

export class UserService{
    public static createUser (payload : CreateUserPayload){
        const {firstName, lastName, email, password} = payload
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
        return primsaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword
            }
        })
    }
}