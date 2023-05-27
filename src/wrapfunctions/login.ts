import createHttpError from "http-errors";
import {search} from './helpers'
import { checkPassword } from "./helpers";
export default async function(email: string, password: string) {
    const result = await search('users', ['password'],['email'], [email])
    if (result[0] === undefined) {
        throw createHttpError(403, 'not existed the user')

    }

    if (!await checkPassword(result[0].password, password)) {
        throw createHttpError(400, 'wrong password')
    }
    return {}
}