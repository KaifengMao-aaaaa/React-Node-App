import { sections } from './setting';

const roleName = {
  storeManager: ['StoreManager', '仓库管理员'],
  salesManager: ['SalesManager', '销售员'],
  admin: ['Admin', '管理员'],
  init: ['Init', '开发者'],
  newUser: ['NewUser', '新员工']
};

const list = {
  [sections.HOME]: ['Home', '首页'],
  [sections.SALES]: ['Orders', '订单区'],
  [sections.STORE]: ['Store', '仓库区'],
  [sections.PRODUCTS]: ['Products', '产品区'],
  [sections.USERS]: ['Users', '用户区'],
  [sections.HISTORY]: ['History', '记录'],
  [sections.PROFILE]: ['Profile', '个人信息修改'],
  EXIT: ['Exit', '退出']
};

export const languageTable = {
  roleName, list
};
