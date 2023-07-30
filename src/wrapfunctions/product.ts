import { insert, randomNumber, search, update, directQuery, regularizationPatternTest, getProductById, getMaterialByName, startTransaction, rollbackTransaction, commitTransaction } from './helpers';
import { errorSender } from '../errors';
export async function productCreate(userId:number, productName: string, unit: string, unitPrice: number, description: string, materials: {amount: number, materialName: string}[]) {
  if (!regularizationPatternTest(productName, /^[a-zA-Z0-9\u4E00-\u9FFF]+$/)) {
    errorSender('productErrors', 'INVALID_PRODUCTNAME');
  }
  if (!regularizationPatternTest(unit, /^[a-zA-Z0-9\u4E00-\u9FFF]+$/)) {
    errorSender('productErrors', 'INVALID_UNITNAME');
  }
  if (materials.find((material) => {
    if ((typeof Number(material.amount) !== 'number') ||
      (typeof material.materialName !== 'string')) return true;
  })) {
    errorSender('productErrors', 'INVALID_PRODUCT_MATERIALS');
  }
  for (const material of materials) {
    if (!await getMaterialByName(material.materialName)) {
      errorSender('productErrors', 'NOT_EXISTED_PRODUCTMATERIAL');
    }
  }
  const productId = randomNumber(10000000, 99999999);
  await insert('products', ['ID', 'productName', 'unit', 'unitPrice', 'description', 'materials', 'available', 'productionRate', 'requiredProduction'],
    [productId, productName, unit, unitPrice, description, materials, 0, 0.0, 0], [5]
  );
  await insert('productTimeStamp', ['time', 'alteration', 'type', 'staffId', 'description'], [new Date(), 0, productName, userId, '创建']);
  return { productId };
}
export async function productListAll() {
  const results = await search('products', ['ROW_NUMBER() OVER (ORDER BY ID) AS id',
    'ID as productId', 'productName', 'unitPrice',
    'available', 'unit', 'requiredProduction',
    'productionRate'], [], []);
  return {
    productsList: results
  };
}

export async function productDetail(productId: number) {
  if (!await getProductById(productId)) {
    errorSender('productErrors', 'NOT_EXISTED_PRODUCT');
  }
  const result = await search('products', ['materials', 'unitPrice',
    'description', 'available', 'requiredProduction',
    'productionRate'], ['ID'], [productId]);
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
  if (!await getProductById(productId)) {
    errorSender('productErrors', 'NOT_EXISTED_PRODUCT');
  }
  if (!regularizationPatternTest(newProductName, /^[a-zA-Z0-9]+$/)) {
    errorSender('productErrors', 'INVALID_UNITNAME');
  }
  await update('products', ['productName'], [newProductName], ['ID'], [productId]);
  return {};
}
export async function productEditUnit(productId: number, newUnit: string) {
  if (!await getProductById(productId)) {
    errorSender('productErrors', 'NOT_EXISTED_PRODUCT');
  }
  if (!regularizationPatternTest(newUnit, /^[a-zA-Z0-9]+$/)) {
    errorSender('productErrors', 'INVALID_UNITNAME');
  }
  await update('products', ['unit'], [newUnit], ['ID'], [productId]);
  return {};
}

export async function productEditUnitPrice(productId: number, newUnitPrice: number) {
  if (!await getProductById(productId)) {
    errorSender('productErrors', 'NOT_EXISTED_PRODUCT');
  }
  await update('products', ['unitPrice'], [newUnitPrice], ['ID'], [productId]);
  return {};
}
export async function productEditRemaining(productId: number, newRemaining: number) {
  const productDetail = await getProductById(productId);
  if (!productDetail) {
    errorSender('productErrors', 'NOT_EXISTED_PRODUCT');
  }
  if (newRemaining < 0) {
    errorSender('productErrors', 'NEGATIVE_REMAINING');
  }
  try {
    await startTransaction();
    const difference = newRemaining - productDetail.available;
    if (difference >= 0) {
      for (const material of productDetail.materials) {
        const requiredQuantity = material.amount * difference;
        const storeCondition = await search('store', ['available'], ['materialName'],
          [material.materialName]);
        if (storeCondition[0].available < requiredQuantity) {
          errorSender('productErrors', 'INSUFFICIENT_STORE');
        } else {
          await update('store', ['available'], [storeCondition[0].available - requiredQuantity],
            ['materialName'], [material.materialName]);
        }
      }
    } else {
      for (const material of productDetail.materials) {
        const reducedQuantity = material.amount * (-difference);
        const storeCondition = await search('store', ['available'], ['materialName'],
          [material.materialName]);
        await update('store', ['available'], [storeCondition[0].available + reducedQuantity],
          ['materialName'], [material.materialName]);
      }
    }
    await update('products', ['available'], [newRemaining], ['ID'], [productId]);
    await commitTransaction();
  } catch (e) {
    await rollbackTransaction();
    throw e;
  }
  return {};
}

export async function productEditMaterialAmount(productId: number, newMaterialAmount: number, row: number) {
  if (!await getProductById(productId)) {
    errorSender('productErrors', 'NOT_EXISTED_PRODUCT');
  }
  if (newMaterialAmount < 0) {
    errorSender('productErrors', 'NEGATIVE_MATERIALAMOUNT');
  }
  if (row < 0) {
    errorSender('productErrors', 'INCORRECT_MATERIALS_INDEX');
  }
  await directQuery(`UPDATE products
    SET materials = JSON_REPLACE(materials, '$[?].amount', ?)
    where ID = ? ;`, [row, newMaterialAmount, productId]);
  return {};
}
export async function productEditDescription(productId: number, description: string) {
  if (!await getProductById(productId)) {
    errorSender('productErrors', 'NOT_EXISTED_PRODUCT');
  }
  await update('products', ['description'], [description], ['ID'], [productId]);
  return {};
}
