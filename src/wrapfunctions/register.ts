import bcrypt from 'bcrypt';
import { randomNumber } from './helpers';
import createHttpError from 'http-errors';
import{insert} from './helpers'
export async function userRegister(name: string, email: string, password:string) {
    const plainPassword = password; // Replace with the user's input
    const saltRounds = 10; // Number of salt rounds (controls the computational cost)
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const userId = randomNumber(10000000, 99999999) 
    try {
        await insert('users', ['name', 'email', 'password', 'ID', 'time'],[name, email, hashedPassword, userId, new Date()])
    } catch(e) {
        throw createHttpError(403, 'insertFailed')
    }
    return {userId}

}
