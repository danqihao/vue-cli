import ProductType from './ProductType/index.js'
import ProductModel from './ProductModel/index.js'
import BasicInfoTable from './BasicInfoTable/index.js'
import Staff from './Staff/index.js'
import Supplier from './Supplier/index.js'
import MPlanBatch from './MPlanBatch/index.js'
import WorkShop from './WorkShop/index.js'
import WareHouse from './WareHouse/index.js'
import Post from './Post/index.js'
import Device from './Device/index.js'
import Process from './Process/index.js'
import Shift from './Shift/index.js'
import WorkOrder from './WorkOrder/index.js'

const components = [
  ProductType,
  ProductModel,
  BasicInfoTable,
  Staff,
  Supplier,
  MPlanBatch,
  WorkShop,
  WareHouse,
  Post,
  Device,
  Process,
  Shift,
  WorkOrder
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
  // 产品类型
  Vue.prototype.$mesProductType = ProductType
  // 产品型号
  Vue.prototype.$mesProductModel = ProductModel
  // 基础信息表格
  Vue.prototype.$mesBasicInfoTable = BasicInfoTable
  // 员工
  Vue.prototype.$mesStaff = Staff
  // 供应商
  Vue.prototype.$mesSupplier = Supplier
  // 生产计划批次
  Vue.prototype.$mesMPlanBatch = MPlanBatch
  // 车间
  Vue.prototype.$mesWorkShop = WorkShop
  // 仓库
  Vue.prototype.$mesWareHouse = WareHouse
  // 职位
  Vue.prototype.$mesPost = Post
  // 设备
  Vue.prototype.$mesDevice = Device
  // 工序
  Vue.prototype.$mesProcess = Process
  // 班次
  Vue.prototype.$mesShift = Shift
  // 工单
  Vue.prototype.$mesWorkOrder = WorkOrder
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const modules = {
  version: '1.0.0',
  author: 'liuchuanzhong',
  install,
  ProductType,
  ProductModel,
  BasicInfoTable,
  Staff,
  Supplier,
  MPlanBatch,
  WorkShop,
  WareHouse,
  Post,
  Device,
  Process,
  Shift,
  WorkOrder
}

export default modules
