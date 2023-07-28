import { insert, randomNumber, search, update, directQuery } from './helpers';
import createHttpError from 'http-errors';
export async function productCreate(userId:number, productName: string, unit: string, unitPrice: number, description: string, materials: {amount: number, materialName: string}[]) {
  const productId = randomNumber(10000000, 99999999);
  await insert('products', ['ID', 'productName', 'unit', 'unitPrice', 'description', 'materials', 'remaining'],
    [productId, productName, unit, unitPrice, description, materials, 0], [5]
  );
  await insert('productTimeStamp', ['time', 'alteration', 'type', 'staffId', 'description'], [new Date(), 0, productName, userId, '创建']);
  return { productId };
}
export async function productListAll() {
  const results = await search('products', ['ROW_NUMBER() OVER (ORDER BY ID) AS id', 'ID as productId', 'productName', 'unitPrice', 'remaining', 'unit'], [], []);
  return {
    productsList: results
  };
}

export async function productDetail(productId: number) {
  const result = await search('products', ['materials', 'unitPrice', 'description', 'remaining as amount'], ['ID'], [productId]);
  const results = await directQuery(`SELECT materials 
      FROM products
      WHERE ID = ?`, [productId]);
  const materials = results[0].materials;
  let index = 0;
  for (const material of materials) {
    const price = await search('store', ['unitPrice'], ['materialName'], [material.materialName]);
    materials[index].unitPrice = price[0].unitPrice;
    materials[index].ID = index + 1;

    index++;
  }
  result[0].materials = materials;
  if (result[0].description === '') {
    result[0].description = '无';
  }
  return { productDetail: result[0] };
}

export async function productAllType() {
  const results = await search('products', ['productName', 'unit'], [], []);
  return { allProductType: results };
}

export async function productEditName(productId: number, newProductName: string) {
  try {
    await update('products', ['productName'], [newProductName], ['ID'], [productId]);
    return {};
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新产品名字失败');
  }
}
export async function productEditUnit(productId: number, newUnit: string) {
  try {
    await update('products', ['unit'], [newUnit], ['ID'], [productId]);
    return {};
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新产品单位失败');
  }
}

export async function productEditUnitPrice(productId: number, newUnitPrice: number) {
  try {
    await update('products', ['unitPrice'], [newUnitPrice], ['ID'], [productId]);
    return {};
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新产品单价失败');
  }
}
export async function productEditRemaining(productId: number, newRemaining: number) {
  try {
    await update('products', ['remaining'], [newRemaining], ['ID'], [productId]);
    return {};
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新产品剩余失败');
  }
}

export async function productEditMaterialAmount(productId: number, newMaterialAmount: number, row: number) {
  try {
    await directQuery(`UPDATE products
      SET materials = JSON_REPLACE(materials, '$[?].amount', ?)
      where ID = ? ;`, [row, newMaterialAmount, productId]);
    return {};
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新物料需求失败');
  }
}
export async function productEditDescription(productId: number, description: string) {
  try {
    await update('products', ['description'], [description], ['ID'], [productId]);
    return {};
  } catch (e) {
    console.log(e);
    throw createHttpError(400, '更新描述失败');
  }
}
