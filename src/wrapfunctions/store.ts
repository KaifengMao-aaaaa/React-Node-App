import { errorSender } from '../errors';
import { insert, search, update, directQuery } from './helpers';
export async function storeAddType(userId:number, materialName: string, unit: string, unitPrice: number) {
  const result = await search('store', ['materialName'], ['materialName'], [materialName]);
  if (result[0]) {
    errorSender('storeErrors', 'DUPLICATE_STORE');
  }
  await insert('storeTimeStamp', ['time', 'alteration', 'type', 'staffId', 'description'], [new Date(), 0, materialName, userId, '创建']);
  await insert('store', ['materialName', 'time', 'utilization', 'available', 'unit', 'unitPrice', 'inventoryGap'], [materialName, new Date(), 0, 0, unit, unitPrice, 0]);
  return {};
}

export async function storeAddAmount(userId: number, description: string, materialName: string, amount: number) {
  const result = await search('store', ['available', 'utilization', 'inventoryGap'], ['materialName'], [materialName]);
  if (result[0] === undefined) {
    errorSender('storeErrors', 'NOT_EXIST_MATERIAL');
  }
  let inventoryGap = result[0].inventoryGap;
  let onHand = result[0].available;
  let utilization = result[0].utilization;
  if (result[0].inventoryGap > 0) {
    const difference = result[0].inventoryGap - amount;
    if (difference <= 0) {
      inventoryGap = 0;
      onHand = onHand - difference;
    } else {
      inventoryGap = inventoryGap - amount;
      utilization += amount;
    }
  } else {
    onHand += amount;
  }
  await update('store', ['available', 'inventoryGap', 'utilization'], [onHand, inventoryGap, utilization], ['materialName'], [materialName]);
  await insert('storeTimeStamp', ['time', 'alteration', 'type', 'staffId', 'description'], [new Date(), amount, materialName, userId, description !== '' ? description : '无']);
}

export async function storeListAll() {
  const result = await search('store', ['*'], [], []);
  return result;
}

export async function storeAllType() {
  return await search('store', ['materialName', 'unit'], [], []);
}

export async function storeTimeStamp() {
  try {
    const results = await directQuery(`SELECT ROW_NUMBER() OVER (ORDER BY storeTimeStamp.ID DESC) AS id,DATE_FORMAT(storeTimeStamp.time, '%Y/%m/%d') as time,users.name as staffName, alteration, storeTimeStamp.description, type, description
              FROM storeTimeStamp
              Join users 
              On users.ID = storeTimeStamp.staffId`, []);
    return { storeTimeStamp: results };
  } catch (e) {
    errorSender('storeErrors', 'GET_STORETIMESTAMP_FAIL');
  }
}
