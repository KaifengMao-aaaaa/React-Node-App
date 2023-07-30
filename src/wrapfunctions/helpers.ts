import bcrypt from 'bcrypt';
import crypto from 'crypto';
import pool from '../database';
import { v4 as uuidv4 } from 'uuid';
import { AES, enc } from 'crypto-js';
import { errorSender } from '../errors';
export async function insert(table: string, params : string[], values: (any)[], JSONIndex ?: number[]) {
  let insertValues = values;
  if (JSONIndex) {
    insertValues = insertValues.map((value, index) => {
      if (JSONIndex.includes(index)) {
        return JSON.stringify(value);
      }
      return value;
    });
  }
  const fields = params.join(',');
  const placeholders = '?,'.repeat(params.length);
  try {
    await pool.query(`INSERT INTO ${table} (${fields}) VALUES(${placeholders.slice(0, -1)});`, insertValues);
  } catch (e) {
    errorSender('databaseErrors', 'INSERT_DATABASE_FAIL');
  }
}
export async function del(table: string, where: string, targeValues: (any)[]) {
  try {
    await pool.query(`DELETE FROM ${table} WHERE (${where}) ;`, targeValues);
  } catch (e) {
    errorSender('databaseErrors', 'DELETE_DATABASE_FAIL');
  }
}
export async function update(table: string, updateFields: string[], updateValues: any[], conditionFields: string[], conditionValues: (any)[]) {
  const formatCoditions = conditionFields.map((condition) => `${condition} = ?`);
  const formatUpdates = updateFields.map((field) => `${field} = ?`);
  try {
    await pool.query(`UPDATE ${table}
          SET ${formatUpdates.join(',')}
          WHERE ${formatCoditions.join(',')};`
    , updateValues.concat(conditionValues));
  } catch (e) {
    errorSender('databaseErrors', 'UPDATE_DATABASE_FAIL');
  }
}
export async function search(table: string, getFields: string[], conditionFields: string[], conditionValues: any[]) {
  try {
    const formatCoditions = conditionFields.map((condition) => `${condition} = ?`);
    const fields = getFields.join(',');
    const conditions = formatCoditions.length > 0 ? `WHERE ${formatCoditions.join(',')}` : '';
    const [results] = await pool.query(`SELECT ${fields} FROM ${table} ${conditions}`, conditionValues);
    return results;
  } catch (e) {
    errorSender('databaseErrors', 'SEARCH_DATABASE_FAIL', e.message);
  }
}
export async function checkPassword(hash: string, password: string): Promise<boolean> {
  const match = await bcrypt.compare(password, hash);
  if (match) {
    return true;
  } else {
    return false;
  }
}

export function randomNumber(min: number, max: number) {
  return crypto.randomInt(min, max);
}

export async function directQuery(sql: string, params: (string|number)[]) {
  const [results, _] = await pool.query(sql, params);

  return results;
}
export async function crypeNumber(word: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(word, saltRounds);
  return hashedPassword;
}
export async function generateToken(userId: number) {
  const newToken = uuidv4();
  const oneHourLate = new Date();
  oneHourLate.setHours(oneHourLate.getHours() + 1);
  try {
    await insert('tokens', ['token', 'time', 'expirationTime', 'userId'], [newToken, new Date(), oneHourLate, userId]);
  } catch (e) {
    errorSender('databaseErrors', 'INSERT_DATABASE_FAIL');
  }
  return newToken;
}
export async function getUserFromEmail(email: string) {
  const result = await search('users', ['*'], ['email'], [email]);
  return result[0];
}
export const encrypt = (data) => {
  return AES.encrypt(String(data), 'MKF').toString();
};

// 解密
export const decrypt = (encryptedData) => {
  return AES.decrypt(String(encryptedData), 'MKF').toString(enc.Utf8);
};

export const encryptForOutput = (data) => {
  if (typeof data === 'object') {
    data.orderId = data.orderId ? encrypt(data.orderId) : undefined;
    data.productId = data.productId ? encrypt(data.productId) : undefined;
  } else if (Array.isArray(data)) {
    for (const element of data) {
      element.orderId = element.orderId ? encrypt(element.orderId) : undefined;
      element.productId = element.productId ? encrypt(element.productId) : undefined;
    }
  }
};

export const regularizationPatternTest = (target, pattern) => {
  return pattern.test(target);
};

export const getProductById = async (productId) => {
  const result = await search('products', ['*'], ['ID'], [productId]);
  return result[0];
};

export const getMaterialByName = async (materialName) => {
  const result = await search('store', ['*'], ['MaterialName'], [materialName]);
  return result[0];
};

export const getOrderById = async (orderId: number) => {
  const result = await search('orders', ['*'], ['ID'], [orderId]);
  return result[0];
};
export const getUserById = async (userId) => {
  const result = await search('users', ['*'], ['ID'], [userId]);
  return result[0];
};

export const startTransaction = async () => {
  await pool.query('START TRANSACTION;');
};

export const commitTransaction = async () => {
  await pool.query('COMMIT;');
};

export const rollbackTransaction = async () => {
  await pool.query('ROLLBACK;');
};
