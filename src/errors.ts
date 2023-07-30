import createHttpError from 'http-errors';
import { SL } from './setting';

export const productErrors = {
  FAIL_TO_INSERT_PRODUCT: {
    UE: [
      ''
    ]
  },
  INVALID_UNITNAME: {
    UE: [
      'Name of unit only contains letters, numbers',
      '单位只可以包含数字和字母'
    ],
    DE: `Name of unit contains special symbols with 
                                potential risk`,
    code: 400
  },
  INSUFFICIENT_STORE: {
    UE: [
      'Insufficient materials to add number of products',
      '请保证仓库有足够的材料'
    ],
    DE: 'Inusfficent materials to add number of products',
    code: 400
  },
  INVALID_PRODUCTNAME: {
    UE: [
      'Name of product only contains letters, numbers',
      '产品名字只可以保护数字和字母'
    ],
    DE: `Name of product contains special symbols with 
                                potential risk`,
    code: 400
  },
  INVALID_UNITPRICE: {
    UE: [
      'Price of product should be number',
      '价格应该是数字'
    ],
    DE: 'Price of product should be number',
    code: 400
  },
  INVALID_PRODUCT_MATERIALS: {
    UE: [
      'Name and amount of material are string and number',
      '产品物料的名字和数量应该是字符和数字'
    ],
    DE: 'Name or amount of material is invalid',
    code: 400
  },
  NOT_EXISTED_PRODUCT: {
    UE: [
      'This product does not exist',
      '产品不存在'
    ],
    DE: 'Product cannot be found at database',
    code: 400
  },
  NOT_EXISTED_PRODUCTMATERIAL: {
    UE: [
      'some materials do not exist',
      '产品材料不存在'
    ],
    DE: 'Product materials cannot be found at database',
    code: 400
  },
  NEGATIVE_REMAINING: {
    UE: [
      'Remaining of the product should be positve',
      '产品剩余数量应该为正数'
    ],
    DE: 'Remaining of the product should be positve',
    code: 400
  },
  NEGATIVE_MATERIALAMOUNT: {
    UE: [
      'Required material amount in the product should be positive number',
      '产品需要材料数量应该是正数'
    ],
    DE: 'Required material amount in the product should be positive number',
    code: 400
  },
  INCORRECT_MATERIALS_INDEX: {
    UE: [
            `Wrong index of materials to insert or update 
            required material in the product`,
            '材料更新或者插入的需要位置不正确'
    ],
    DE: `the error only be triggered when selected row (index) is 
            incorrect to update or insert required materials in the product`,
    code: 400
  }

};
export const orderErrors = {
  NOT_EXISTED_ORDER: {
    UE: [
      'Order does not exist',
      '订单不存在'
    ],
    DE: 'Order cannot be found at database',
    code: 400
  },
  NOT_ENOUGH_PRODUCT: {
    UE: [
      'Demand of this order exceeds the number of available products',
      '订单需求超过了可用的产品数量,无法完成订单'
    ],
    DE: 'Amout of products exceed available column of this product',
    code: 400
  },
  INVALID_CLIENT_NAME: {
    UE: [
      'Client name only contains letters',
      '客户名字只可以是字符'
    ],
    DE: 'Client name only contains letters',
    code: 400
  },
  INVALID_DEADLINE: {
    UE: [
      'Deadline cannot be in past',
      '截止日期不可以是过去时间'
    ],
    DE: 'Deadline cannot be in past',
    code: 400
  },
  NEGATIVE_ORDERPRICE: {
    UE: [
      'OrderPrice should be positve',
      '订单价格必须是正数'
    ],
    DE: 'OrderPrice should be positve',
    code: 400
  },
  INVALID_PRODUCT_IN_ORDER: {
    UE: [
      'Name and price of the product should be string and positve number',
      '订单中的需求产品的名字和价格必须是字符和正数'
    ],
    DE: 'Name and price of the product should be string and positve number',
    code: 400
  },
  INCORRECT_PRODUCTS_INDEX: {
    UE: [
            `Wrong index of the product to insert or update 
            required material in the product`,
            '产品更新或者插入的需要位置不正确'
    ],
    DE: `the error only be triggered when selected row (index) is 
            incorrect to update or insert required product in the order`,
    code: 400
  },

};
export const databaseErrors = {
  INSERT_DATABASE_FAIL: {
    UE: [
      'Fail to insert into database',
      '将数据插入数据库失败'
    ],
    DE: 'Fail to insert into database',
    code: 400
  },
  DELETE_DATABASE_FAIL: {
    UE: [
      'Fail to delete from database',
      '删除数据失败'
    ],
    DE: 'Fail to delete from database',
    code: 400
  },
  SEARCH_DATABASE_FAIL: {
    UE: [
      'Fail to search data from database',
      '查询数据失败'
    ],
    DE: 'Fail to search data from database',
    code: 400
  },
  UPDATE_DATABASE_FAIL: {
    UE: [
      'Fail to update from database',
      '更新数据失败'
    ],
    DE: 'Fail to update from database',
    code: 400
  },
  GET_ORDERSTIMESTAMP_FAIL: {
    UE: [
      'Fail to get orders record',
      '获取订单记录失败'
    ],
    DE: 'Fail to get orders timestamp',
    code: 400
  },
  GET_STORETIMESTAMP_FAIL: {
    UE: [
      'Fail to get store record',
      '获取仓库记录失败'
    ],
    DE: 'Fail to get store timestamp',
    code: 400
  }
};
const storeErrors = {
  DUPLICATE_STORE: {
    UE: [
      'Material name already exists',
      '物料名字重复'
    ],
    DE: 'Duplicate material name',
    code: 400
  },
  NOT_EXISTED_MATERIAL: {
    UE: [
      'Material does not exist',
      '物料不存在'
    ],
    DE: 'Material does not exist',
    code: 400
  },
};
const userErrors = {
  LOGIN_EXPIRED: {
    UE: [
      'login is expired',
      '登录已经过期'
    ],
    DE: 'login is expired',
    code: 401
  },
  UNAVAILABLE_TOKEN: {
    UE: [
      'Token is not available',
      '令牌不可用'
    ],
    DE: 'Token is not available',
    code: 401
  },
  DENY_PERMISSION: {
    UE: [
      'Permission denied',
      '权限不足'
    ],
    DE: 'permission denied',
    code: 403
  },
  MODIFY_OWN_PERMISSION: {
    UE: [
      'Modify own permission is forbidden',
      '不允许编辑自己的权限'
    ],
    DE: 'Modify own permission is forbidden',
    code: 403
  },
  INVALID_EMAIL: {
    UE: [
      'Invalid email',
      '无效邮箱'
    ],
    DE: 'invalid email',
    code: 401
  },
  EXISTED_EMAIL: {
    UE: [
      'Existed email',
      '邮箱已经存在'
    ],
    DE: 'existed email',
    code: 401
  },
  INVALID_VERFICATIONCODE: {
    UE: [
      'wrong verficationCode',
      '无效码错误'
    ],
    DE: 'wrong verficationCode',
    code: 401
  },
  UNSUCESSFUL_LOGIN: {
    UE: [
      'unsuccessful login, wrong email or password',
      '登录失败,邮箱或者密码错误'
    ],
    DE: 'wrong email or password',
    code: 401
  },
  INCORRECT_OLD_PASSWORD: {
    UE: [
      'incorrect old password',
      '旧密码错误'
    ],
    DE: 'incorrect old password',
    code: 401
  }

};
const allErrorTtpes = {
  productErrors,
  databaseErrors,
  userErrors,
  storeErrors,
  orderErrors
};
export function errorSender(errorType: string, key: string, e ?: string | undefined) {
  throw createHttpError(allErrorTtpes[errorType][key].code,
    allErrorTtpes[errorType][key].UE[SL]);
}
