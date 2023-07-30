import { del, search, update } from './helpers';
import { errorSender } from '../errors';
export async function TokenCheckMiddleware(token: string) {
  const result = await search('tokens', ['userId', 'expirationTime'], ['token'], [token]);
  if (!result[0]) {
    errorSender('userErrors', 'UNAVAILABLE_TOKEN');
  } else if (result[0].expirationTime < new Date()) {
    await del('tokens', 'token = ?', [token]);
    errorSender('userErrors', 'LOGIN_EXPIRED');
  }
  await update('tokens', ['expirationTime'], [new Date(new Date().getTime() + (60 * 60 * 1000))], ['token'], [token]);
  return { userId: result[0].userId };
}
