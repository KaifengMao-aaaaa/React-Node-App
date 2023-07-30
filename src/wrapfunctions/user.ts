import { randomNumber, search, checkPassword, del, update, crypeNumber, generateToken, getUserFromEmail } from './helpers';
import { insert } from './helpers';
import dotenv from 'dotenv';
import { permissions } from '../setting';
import { emailVerfication, notificationEmail, permissionChangedEmail } from './verfication';
import { errorSender } from '../errors';
dotenv.config();
export async function userRegister(name: string, email: string, password:string, verficationCode: string) {
  const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const hashedPassword = await crypeNumber(password);
  const staffId = randomNumber(10000000, 99999999);
  if (!pattern.test(email)) {
    errorSender('userErrors', 'INVALID_EMAIL');
  }
  const existedEmail = await search('users', ['ID'], ['email'], [email]);
  if (existedEmail[0]) {
    errorSender('userErrors', 'EXISTED_EMAIL');
  }
  const result = await search('verficationcode', ['type'], ['code'], [verficationCode]);
  if (!result[0]) {
    errorSender('userErrors', 'INVALID_VERFICATIONCODE');
  } else if (result[0] && !(result[0].type === '注册')) {
    errorSender('userErrors', 'INVALID_VERFICATIONCODE');
  }
  await del('verficationCode', 'code = ?', [verficationCode]);
  await insert('users', ['name', 'email', 'password', 'ID', 'time', 'role'], [name, email, hashedPassword, staffId, new Date(), permissions.NEWUSER]);

  if (email === process.env.CREATOREMAIL) {
    await update('users', ['role'], [permissions.INIT], ['ID'], [staffId]);
  }
  await notificationEmail(staffId);
  return { staffId: staffId };
}

export async function login (email: string, password: string) {
  const result = await search('users', ['password', 'ID'], ['email'], [email]);
  if (result[0] === undefined) {
    errorSender('userErrors', 'UNSUCESSFUL_LOGIN');
  }
  if (!await checkPassword(result[0].password, password)) {
    errorSender('userErrors', 'UNSUCESSFUL_LOGIN');
  }
  const user = await getUserFromEmail(email);
  const token = await generateToken(user.ID);

  return { userId: result[0].ID, token: token };
}

export async function logout(token:string) {
  console.log(token);
  await del('tokens', 'token = ?', [token]);
  return {};
}
export async function userListAll() {
  const results = await search('users', ['name', 'ROW_NUMBER() OVER (ORDER BY ID) AS id', 'ID', 'role', 'email'], [], []);
  return { users: results };
}

export async function userSendCode(email: string, type: string) {
  const verficationCode = String(randomNumber(100000, 999999));
  await emailVerfication(email, verficationCode, type);
  return {};
}

export async function userPermissionModify(id: number, staffId: number, toPermission) {
  if (id === staffId) {
    errorSender('userErrors', 'MODIFY_OWN_PERMISSION');
  }
  const operator = await search('users', ['role', 'name'], ['ID'], [id]);
  const receiver = await search('users', ['role', 'name', 'email'], ['ID'], [staffId]);
  if (operator[0].role !== permissions.INIT && operator[0].role !== permissions.ADMIN) {
    errorSender('userErrors', 'DENY_PERMISSION');
  }
  await update('users', ['role'], [toPermission], ['ID'], [staffId]);
  await permissionChangedEmail(receiver[0].email, toPermission);
  return {};
}

export async function userEditPassword(staffId: number, newPassword: string, oldPassword: string) {
  const result = await search('users', ['password'], ['ID'], [staffId]);
  if (!await checkPassword(result[0].password, oldPassword)) {
    errorSender('userErrors', 'INCORRECT_OLD_PASSWORD');
  }
  await update('users', ['password'], [await crypeNumber(newPassword)], ['ID'], [staffId]);
  return {};
}

export async function userEditEmail(staffId: number, newEmail: string) {
  const result = search('users', ['email'], ['email'], [newEmail]);
  if (result[0]) {
    errorSender('userErrors', 'EXISTED_EMAIL');
  }
  await update('users', ['email'], [newEmail], ['ID'], [staffId]);
}

export async function userRetrievePassword(email:string, verficationCode: string, newPassword: string) {
  const result = await search('verficationcode', ['type'], ['code'], [verficationCode]);
  if (!result[0]) {
    errorSender('userErrors', 'INVALID_VERFICATIONCODE');
  } else if (result[0] && (result[0].type !== '找回密码')) {
    errorSender('userErrors', 'INVALID_VERFICATIONCODE');
  }
  await update('users', ['password'], [await crypeNumber(newPassword)], ['email'], [email]);
  return {};
}

export async function getEmailFromID(staffId: number) {
  const result = await search('users', ['email'], ['ID'], [staffId]);
  return { email: result[0].email };
}
export async function getIDFromEmail(email: string) {
  const result = await search('users', ['ID'], ['email'], [email]);
  return { staffId: result[0].ID };
}
