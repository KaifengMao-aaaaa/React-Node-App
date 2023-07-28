
//* ************************************End Points****************************************************** */
const commonEndPointsForSales = ['/order/detail', '/order/checkStatus',
  '/order/listall', '/order/editStatus', '/order/editDeadline',
  '/order/editMaterialAmount', '/order/editProductAmount', '/order/editStartDate',
  '/order/editDescription', '/order/create'
];
const commonEndPointsForStore = ['/store/listall', '/store/allType', '/store/add',
  '/store/addType', '/store/timeStamp'];
const commonEnnPointsForAdmin = ['/user/logout', '/user/listall',
  '/user/permission/modify'];
const commonEndPointsForProduct = ['/product/allType', '/product/listall',
  '/product/detail', '/product/editName', '/product/editUnit', '/product/editUnitPrice',
  '/product/editRemaining', '/product/editMaterialAmount', '/product/editDescription',
  '/product/create'];
const commonEndPointsForHistory = ['/store/timeStamp', '/orders/timeStamp'];
const publicEndPoints = ['/user/retrievePassword', '/user/register', '/user/sendCode', '/user/login'];
const privateEndPoints = ['/user/getEmail', '/user/editPassword', '/user/editEmail', '/page/isAvailable', '/user/logout'];
const developmentAPI = [];
// all role types
// init have permission to all endPoints
// admin have permission to all endPoins except developmentAPI
// salesManager have commonEndPointsForSales
// storeManager have commonEndPointsForStore

const storeManager = [...commonEndPointsForStore, ...privateEndPoints];
const salesManager = [...commonEndPointsForSales, ...privateEndPoints];
const admin = [...commonEnnPointsForAdmin, ...privateEndPoints,
  ...commonEndPointsForProduct, ...commonEndPointsForSales, ...commonEndPointsForStore,
  ...commonEndPointsForHistory];
const init = [...commonEndPointsForProduct, ...commonEndPointsForSales, ...commonEndPointsForStore,
  ...commonEnnPointsForAdmin, ...privateEndPoints, ...commonEndPointsForHistory, developmentAPI];
const newUser = [...privateEndPoints];
export const permissions = { INIT: 'init', ADMIN: 'admin', SALESMANAGER: 'salesManager', STOREMANAGER: 'storeManager', NEWUSER: 'newUser' };

// export endPoints table
export const rightToEndPoints = {
  storeManager, salesManager, admin, init, publicEndPoints, privateEndPoints, newUser
};
//* ********************************************End*****************************************************************/

/** ********************************************Page************************************************************************* */

export const availableSectionForRole = {
  storeManager: ['store', 'home', 'profile'],
  salesManager: ['sales', 'home', 'profile'],
  admin: ['sales', 'store', 'users', 'orders', 'products', 'home', 'history', 'profile'],
  init: ['sales', 'store', 'users', 'orders', 'products', 'home', 'history', 'profile'],
  newUser: ['home']
};
