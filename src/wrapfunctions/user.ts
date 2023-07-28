import { randomNumber, search, checkPassword, del, update, crypeNumber, generateToken, getUserFromEmail } from './helpers';
import createHttpError from 'http-errors';
import { insert } from './helpers';
import dotenv from 'dotenv';
import { permissions } from '../setting';
import { emailVerfication, notificationEmail, permissionChangedEmail } from './verfication';
dotenv.config();
export async function userRegister(name: string, email: string, password:string, verficationCode: string) {
  const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const hashedPassword = await crypeNumber(password);
  const staffId = randomNumber(10000000, 99999999);
  if (!pattern.test(email)) {
    throw createHttpError(403, '无效邮箱');
  }
  const existedEmail = await search('users', ['ID'], ['email'], [email]);
  if (existedEmail[0]) {
    throw createHttpError(400, '邮箱已经存在');
  }
  const result = await search('verficationcode', ['type'], ['code'], [verficationCode]);
  if (!result[0]) {
    throw createHttpError(400, '验证码错误');
  } else if (result[0] && !(result[0].type === '注册')) {
    throw createHttpError(400, '无效验证码');
  }
  await del('verficationcode', 'code = ?', [verficationCode]);
  try {
    await insert('users', ['name', 'email', 'password', 'ID', 'time', 'role'], [name, email, hashedPassword, staffId, new Date(), permissions.NEWUSER]);
  } catch (e) {
    throw createHttpError(403, '插入数据库失败');
  }
  if (email === process.env.CREATOREMAIL) {
    await update('users', ['role'], [permissions.INIT], ['ID'], [staffId]);
  }
  await notificationEmail(staffId);

  return { staffId: staffId };
}

export async function login (email: string, password: string) {
  const result = await search('users', ['password', 'ID'], ['email'], [email]);
  if (result[0] === undefined) {
    throw createHttpError(403, '用户不存在');
  }
  if (!await checkPassword(result[0].password, password)) {
    throw createHttpError(400, '密码错误');
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
    throw createHttpError(403, '不可以编辑自己的权限');
  }
  const operator = await search('users', ['role', 'name'], ['ID'], [id]);
  const receiver = await search('users', ['role', 'name', 'email'], ['ID'], [staffId]);
  if (operator[0].role !== permissions.INIT && operator[0].role !== permissions.ADMIN) {
    throw createHttpError(400, '编辑人权限不足');
  }
  await update('users', ['role'], [toPermission], ['ID'], [staffId]);
  await permissionChangedEmail(receiver[0].email, toPermission);
  return {};
}

export async function userEditPassword(staffId: number, newPassword: string, oldPassword: string) {
  const result = await search('users', ['password'], ['ID'], [staffId]);
  if (!await checkPassword(result[0].password, oldPassword)) {
    throw createHttpError(400, '旧密码错误');
  }
  await update('users', ['password'], [await crypeNumber(newPassword)], ['ID'], [staffId]);
  return {};
}

export async function userEditEmail(staffId: number, newEmail: string) {
  const result = search('users', ['email'], ['email'], [newEmail]);
  if (result[0]) {
    throw createHttpError(403, '新邮箱已经存在');
  }
  await update('users', ['email'], [newEmail], ['ID'], [staffId]);
}

export async function userRetrievePassword(email:string, verficationCode: string, newPassword: string) {
  const result = await search('verficationcode', ['type'], ['code'], [verficationCode]);
  if (!result[0]) {
    throw createHttpError(400, '验证码错误');
  } else if (result[0] && (result[0].type !== '找回密码')) {
    throw createHttpError(400, '验证码无效');
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
