import createHttpError from "http-errors";
import { del, search, update } from "./helpers";
export async function TokenCheckMiddleware(token: string){
    const result = await search('tokens', ['userId','expirationTime'], ['token'], [token])
    if (!result[0]) {
        throw createHttpError(403, '请重新登录')
    } else if (result[0].expirationTime < new Date()) {
        await del('tokens','token = ?', [token])
        throw createHttpError(400, '登录已经失效,请重新登录')
    }
    await update('tokens', ['expirationTime'], [new Date(new Date().getTime() + (60 * 60 * 1000))],['token'], [token])
    return {userId: result[0].userId}
}
