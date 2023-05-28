import bcrypt from 'bcrypt';
import { randomNumber,search,checkPassword } from './helpers';
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
    console.log(userId)
    return {userId}

}
export async function login (email: string, password: string) {
    const result = await search('users', ['password', 'ID'],['email'], [email])
    if (result[0] === undefined) {
        throw createHttpError(403, 'not existed the user')

    }

    if (!await checkPassword(result[0].password, password)) {
        throw createHttpError(400, 'wrong password')
    }
    return {userId: result[0].ID}
}
export async function userListAll() {
    const results = await search('users', ['name','ROW_NUMBER() OVER (ORDER BY ID) AS id'],[],[])
    console.log(results)
    return {users: results}
}