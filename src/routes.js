/* 定义所有异步组件 */

// 登录页面
const Login = r => require.ensure([], () => r(require('./views/Login')), 'Login')
// 404页面
const NotFound = r => require.ensure([], () => r(require('./views/404.vue')), 'NotFound')
// home页
const Home = r => require.ensure([], () => r(require('./views/Home.vue')), 'Home')
// 首页
const Index = r => require.ensure([], () => r(require('./views/Index.vue')), 'Index')
// 空白页，为第三级菜单预留的
const Blank = r => require.ensure([], () => r(require('./views/Blank.vue')), 'Blank')

/* 系统管理 */
const Staff = r => require.ensure([], () => r(require('./views/system/Staff.vue')), 'Staff')
const Post = r => require.ensure([], () => r(require('./views/system/Post.vue')), 'Post')
const Shift = r => require.ensure([], () => r(require('./views/system/Shift.vue')), 'Shift')
const ShiftDetail = r => require.ensure([], () => r(require('./views/system/ShiftDetail.vue')), 'ShiftDetail')
const Permissions = r => require.ensure([], () => r(require('./views/system/Permissions.vue')), 'Permissions')
const Structure = r => require.ensure([], () => r(require('./views/system/Structure.vue')), 'Structure')
const ProductLines = r => require.ensure([], () => r(require('./views/system/ProductLines.vue')), 'ProductLines')
const Workshop = r => require.ensure([], () => r(require('./views/system/Workshop.vue')), 'Workshop')
const Workstage = r => require.ensure([], () => r(require('./views/system/Workstage.vue')), 'Workstage')
const PostConfig = r => require.ensure([], () => r(require('./views/system/children/PostConfig.vue')), 'PostConfig')
const StaffConfig = r => require.ensure([], () => r(require('./views/system/children/StaffConfig.vue')), 'StaffConfig')
const DeviceConfig = r => require.ensure([], () => r(require('./views/system/children/DeviceConfig.vue')), 'DeviceConfig')
const WorkstageConfig = r => require.ensure([], () => r(require('./views/system/children/WorkstageConfig.vue')), 'WorkstageConfig')
const ProcessConfig = r => require.ensure([], () => r(require('./views/system/children/ProcessConfig.vue')), 'ProcessConfig')
const WorkshopConfig = r => require.ensure([], () => r(require('./views/system/children/WorkshopConfig.vue')), 'WorkshopConfig')
const AboutUs = r => require.ensure([], () => r(require('./views/system/other/AboutUs.vue')), 'AboutUs')
const HelpDoc = r => require.ensure([], () => r(require('./views/system/other/HelpDoc.vue')), 'HelpDoc')
const LoginLog = r => require.ensure([], () => r(require('./views/system/other/LoginLog.vue')), 'LoginLog')
const Password = r => require.ensure([], () => r(require('./views/system/other/Password.vue')), 'Password')
const UserInfo = r => require.ensure([], () => r(require('./views/system/other/UserInfo.vue')), 'UserInfo')

/* 设备管控 */
const DevicesStatus = r => require.ensure([], () => r(require('./views/devices/DevicesStatus.vue')), 'DevicesStatus')
const DevicesStandingBook = r => require.ensure([], () => r(require('./views/devices/DevicesStandingBook.vue')), 'DevicesStandingBook')
const SpotCheckRecord = r => require.ensure([], () => r(require('./views/devices/devicesSpotCheck/SpotCheckRecord.vue')), 'SpotCheckRecord')
const AddSpotCheck = r => require.ensure([], () => r(require('./views/devices/devicesSpotCheck/AddSpotCheck.vue')), 'AddSpotCheck')
const MaintainRecord = r => require.ensure([], () => r(require('./views/devices/devicesMaintain/MaintainRecord.vue')), 'MaintainRecord')
const MalfunctionRecord = r => require.ensure([], () => r(require('./views/devices/MalfunctionRecord.vue')), 'MalfunctionRecord')
const MaintainBook = r => require.ensure([], () => r(require('./views/devices/devicesMaintain/MaintainBook.vue')), 'MaintainBook')
const AddMaintain = r => require.ensure([], () => r(require('./views/devices/devicesMaintain/AddMaintain.vue')), 'AddMaintain')

/* 仓储管理 */
const WarehouseBasic = r => require.ensure([], () => r(require('./views/warehouse/warehouseBasic.vue')), 'WarehouseBasic')
const Suppliers = r => require.ensure([], () => r(require('./views/warehouse/supplier.vue')), 'Suppliers')
const MaterialComing = r => require.ensure([], () => r(require('./views/warehouse/materialComing.vue')), 'MaterialComing') //物料登记
const MaterialIn = r => require.ensure([], () => r(require('./views/warehouse/materialIn.vue')), 'MaterialIn') //物料入库
const MaterialOut = r => require.ensure([], () => r(require('./views/warehouse/materialOut.vue')), 'MaterialOut') //物料出库
const MaterialReturn = r => require.ensure([], () => r(require('./views/warehouse/materialReturn.vue')), 'materialReturn') //物料退换

const productInfo = r => require.ensure([], () => r(require('./views/warehouse/productInfo.vue')), 'productInfo') //成品信息
const productStock = r => require.ensure([], () => r(require('./views/warehouse/productStock.vue')), 'productStock')  //成品库存
const productIn = r => require.ensure([], () => r(require('./views/warehouse/productIn.vue')), 'productIn')  //成品入库
const productOut = r => require.ensure([], () => r(require('./views/warehouse/productOut.vue')), 'productOut')  //成品出库

const WarehouseCheck = r => require.ensure([], () => r(require('./views/warehouse/warehouseCheck.vue')), 'WarehouseCheck')  //仓库盘点
const MaterialAllocation = r => require.ensure([], () => r(require('./views/warehouse/MaterialAllocation.vue')), 'MaterialAllocation')  //仓库调拨

/* 工艺管理 */
const ProductBasic = r => require.ensure([], () => r(require('./views/craft/basicInfo/ProductBasic.vue')), 'ProductBasic')
const ProductType = r => require.ensure([], () => r(require('./views/craft/children/productType.vue')), 'ProductType')
const CraftDetail = r => require.ensure([], () => r(require('./views/craft/management/CraftDetail.vue')), 'CraftDetail')
const AddCraft = r => require.ensure([], () => r(require('./views/craft/management/AddCraft.vue')), 'AddCraft')
const BomManage = r => require.ensure([], () => r(require('./views/craft/children/BomManage.vue')), 'BomManage')

/* 生产计划 */

/* 生产执行 */
const MExecutiveManagement = r => require.ensure([], () => r(require('./views/m_executive/Management.vue')), 'Management')
const WorkOrderDetail = r => require.ensure([], () => r(require('./views/m_executive/children/WorkOrderDetail.vue')), 'WorkOrderDetail')
const MyWorkOrder = r => require.ensure([], () => r(require('./views/m_executive/MyWorkOrder.vue')), 'MyWorkOrder')

/* 生产过程 */

/* 质量管控 */
// 项目类型管理
const ProjectType = r => require.ensure([], () => r(require('./views/quality_control/basic/ProjectType.vue')), 'ProjectType')

/* 报表管理 */

/* 看板管理 */

/* 追溯模块 */

/* SPC */

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '/system',
    component: Home,
    name: '系统管理',
    iconClass: 'fa fa-cog',
    children: [
      {path: '/index', component: Index, name: '首页', hidden: true},
      {path: '/system/staff', component: Staff, name: '员工管理', leaf: true},
      {path: '/system/post', component: Post, name: '职位管理', leaf: true},
      {path: '/system/shift', component: Shift, name: '班次管理', leaf: true},
      {path: '/system/shiftDetail', component: ShiftDetail, name: '班次详情', leaf: true, hidden: true},
      {path: '/system/permissions', component: Permissions, name: '权限管理', leaf: true},
      {
        path: '/system/organization',
        component: Blank,
        name: '组织结构',
        leaf: false,  // 非叶子节点
        children: [
          {path: '/system/organization/structure', component: Structure, name: '组织结构管理'},
          {path: '/system/organization/production_line', component: ProductLines, name: '产线管理'},
          {path: '/system/organization/workshop', component: Workshop, name: '车间管理'},
          {path: '/system/organization/workstage', component: Workstage, name: '车间工序管理'},
          {path: '/system/organization/post_config', component: PostConfig, name: '职位配置', hidden: true},
          {path: '/system/organization/staff_config', component: StaffConfig, name: '人员配置', hidden: true},
          {path: '/system/organization/device_config', component: DeviceConfig, name: '设备配置', hidden: true},
          {path: '/system/organization/workstage_config', component: WorkstageConfig, name: '车间配置', hidden: true},
          {path: '/system/organization/process_config', component: ProcessConfig, name: '工序配置', hidden: true},
          {path: '/system/organization/workshop_config', component: WorkshopConfig, name: '车间配置', hidden: true}
        ]
      },
      {
        path: '/system/others',
        component: Blank,
        name: '其它',
        leaf: false,
        children: [
          {path: '/system/others/password', component: Password, name: '用户信息修改'},
          {path: '/system/others/user_info', component: UserInfo, name: '用户信息管理'},
          {path: '/system/others/user_login_log', component: LoginLog, name: '用户登录记录'},
          {path: '/system/others/help', component: HelpDoc, name: '帮助文档'},
          {path: '/system/others/about_us', component: AboutUs, name: '关于我们'}
        ]
      }
    ]
  },
  {
    path: '/devices',
    component: Home,
    name: '设备管控',
    iconClass: 'fa fa-wrench',
    children: [
      {path: '/devices/devicesStatus', component: DevicesStatus, name: '设备状况', leaf: true},
      {path: '/devices/DevicesStandingBook', component: DevicesStandingBook, name: '设备台账', leaf: true},
      {
        path: '/devices/devicesSpotCheck',
        component: Blank,
        name: '设备点检',
        leaf: false,
        children: [
          {path: '/devices/devicesSpotCheck/SpotCheckRecord', component: SpotCheckRecord, name: '设备点检'},
          {path: '/devices/devicesSpotCheck/AddSpotCheck', component: AddSpotCheck, name: '新建点检表'}
        ]
      },
      {
        path: '/devices/devicesMaintain',
        component: Blank,
        name: '维护保养',
        leaf: false,
        children: [
          {path: '/devices/devicesMaintain/MaintainRecord', component: MaintainRecord, name: '保养记录'},
          {path: '/devices/devicesMaintain/AddMaintain', component: AddMaintain, name: '新建保养计划'},
          {path: '/devices/devicesMaintain/MaintainBook', component: MaintainBook, name: '保养指导书管理'}
        ]
      },
      {path: '/devices/MalfunctionRecord', component: MalfunctionRecord, name: '故障记录', leaf: true}
    ]
  },
  {
    path: '/warehouse',
    component: Home,
    name: '仓储管理',
    iconClass: 'fa fa-truck',
    children: [
      {
        path: '/warehouse/stock',
        component: Blank,
        name: '物料库存',
        leaf: false,
        children: [
          {path: '/warehouse/stock/WarehouseBasic', component: WarehouseBasic, name: '物料信息'},
          {path: '/warehouse/stock/MaterialComing', component: MaterialComing, name: '来料登记'},
          {path: '/warehouse/stock/MaterialIn', component: MaterialIn, name: '物料入库'},
          {path: '/warehouse/stock/MaterialOut', component: MaterialOut, name: '物料出库'},
          {path: '/warehouse/stock/MaterialReturn', component: MaterialReturn, name: '物料退还'},
          {path: '/warehouse/stock/MaterialAllocation', component: MaterialAllocation, name: '物料调拨'},
          {path: '/warehouse/stock/WarehouseCheck', component: WarehouseCheck, name: '库存盘点'},
          {path: '/warehouse/stock/Suppliers', component: Suppliers, name: '供应商'}
        ]
      },
      {
        path: '/warehouse/finished',
        component: Blank,
        name: '成品管理',
        leaf: false,
        children: [
          {path: '/warehouse/finished/productInfo', component: productInfo, name: '成品信息'},
          {path: '/warehouse/finished/productStock', component: productStock, name: '成品库存'},
          {path: '/warehouse/finished/productIn', component: productIn, name: '成品入库'},
          {path: '/warehouse/finished/productOut', component: productOut, name: '成品出库'}
        ]
      }
    ]
  },
  {
    path: '/craft',
    component: Home,
    name: '工艺管理',
    iconClass: 'fa fa-puzzle-piece',
    children: [
      {path: '/craft/step', component: Index, name: '工步管理', leaf: true},
      {path: '/craft/process', component: Index, name: '工序管理', leaf: true},
      {
        path: '/craft/section',
        component: Blank,
        name: '工艺段管理',
        leaf: false,
        children: [
          {path: '/craft/section/:id', component: Index, name: '工艺段详情'},
          {path: '/craft/section/add', component: Index, name: '新增工艺段'},
        ]
      },
      {
        path: '/craft/management',
        component: Blank,
        name: '工艺管理',
        leaf: false,
        children: [
          {path: '/craft/detail/:id', component: CraftDetail, name: '工艺详情'},
          {path: '/craft/add', component: AddCraft, name: '新增工艺'},
          {path: '/craft/bom_manage', component: BomManage, name: 'BOM管理', hidden: true}
        ]
      },
      {
        path: '/craft/basic',
        component: Blank,
        name: '工艺基础信息管理',
        leaf: false,
        children: [
          {path: '/craft/basic/ProductBasic', component: ProductBasic, name: '产品模型管理'},
          {path: '/craft/basic/ProductType', component: ProductType, name: '成品类型管理', hidden: true},
          {path: '/craft/basic/data', component: Index, name: '工艺基础信息管理'},
          {path: '/craft/basic/section', component: Index, name: '工艺段基础信息管理'},
          {path: '/craft/basic/process', component: Index, name: '工序基础信息管理'},
          {path: '/craft/basic/step', component: Index, name: '工步基础信息管理'},
          {path: '/craft/basic/step_params', component: Index, name: '工步参数维护'},
          {path: '/craft/basic/products&semi_finished', component: Index, name: '产品(半成品)管理'},
          {path: '/craft/basic/semi_finished_params', component: Index, name: '半成品-半成品参数维护'},
          {path: '/craft/basic/standard_params', component: Index, name: '标准参数管理'}
        ]
      }
    ]
  },
  {
    path: '/m_planning',
    component: Home,
    name: '生产计划',
    iconClass: 'fa fa-calendar-minus-o',
    children: [
      {path: '/m_planning/overview', component: Index, name: '生产计划总览', leaf: true},
      {path: '/m_planning/add', component: Index, name: '新建生产计划', leaf: true},
      {path: '/m_planning/my', component: Index, name: '我的生产计划', leaf: true}
    ]
  },
  {
    path: '/m_executive',
    component: Home,
    name: '生产执行',
    iconClass: 'fa fa-cutlery',
    children: [
      {path: '/m_executive/management', component: MExecutiveManagement, name: '生产执行管理', leaf: true},
      {path: '/m_executive/management/:id', component: WorkOrderDetail, name: '生产执行管理', leaf: true, hidden: true},
      {path: '/m_executive/my_workorder', component: MyWorkOrder, name: '我的工单', leaf: true},
      {path: '/m_executive/my_workorder/:id', component: MyWorkOrder, name: '我的工单', leaf: true, hidden: true}
    ]
  },
  {
    path: '/m_process',
    component: Home,
    name: '生产过程',
    iconClass: 'fa fa-hourglass-half',
    children: [
      {path: '/m_process/picking', component: Index, name: '领料管理', leaf: true},
      {path: '/m_process/supplementary', component: Index, name: '补料管理', leaf: true},
      {path: '/m_process/rejected', component: Index, name: '退料管理', leaf: true},
      {path: '/m_process/batch', component: Index, name: '调批管理', leaf: true},
      {path: '/m_process/output', component: Index, name: '产出物管理', leaf: true},
      {path: '/m_process/batch_transfer', component: Index, name: '批次转出', leaf: true},
      {path: '/m_process/scrap', component: Index, name: '报废管理', leaf: true},
      {path: '/m_process/bad', component: Index, name: '不良品管理', leaf: true}
    ]
  },
  {
    path: '/quality_control',
    component: Home,
    name: '质量管控',
    iconClass: 'fa fa-gavel',
    children: [
      {
        path: '/quality_control/basic',
        component: Blank,
        name: '基础数据维护',
        leaf: false,
        children: [
          {path: '/quality_control/basic/project_type', component: ProjectType, name: '项目类型管理'},
          {path: '/quality_control/basic/inspect_type', component: Index, name: '检验项目管理'},
          {path: '/quality_control/basic/inspect_method', component: Index, name: '检验方式管理'},
          {path: '/quality_control/basic/inspect_tool', component: Index, name: '测试量具管理'},
          {path: '/quality_control/basic/bad_code', component: Index, name: '不良代号管理'}
        ]
      },
      {
        path: '/quality_control/IQC',
        component: Blank,
        name: 'IQC管理',
        leaf: false,
        children: [
          {path: '/quality_control/IQC/report', component: Index, name: '进货检验报告'},
          {path: '/quality_control/IQC/type_template', component: Index, name: '类模板管理'},
          {path: '/quality_control/IQC/material_template', component: Index, name: '物料模板管理'}
        ]
      },
      {
        path: '/quality_control/PQC',
        component: Blank,
        name: 'PQC管理',
        leaf: false,
        children: [
          {path: '/quality_control/PQC/report', component: Index, name: '品质报告'},
          {path: '/quality_control/PQC/detection_solution', component: Index, name: '检测方案管理'},
          {path: '/quality_control/PQC/detection_plan', component: Index, name: '检测计划管理'}
        ]
      },
      {
        path: '/quality_control/FQC',
        component: Blank,
        name: 'FQC管理',
        leaf: false,
        children: [
          {path: '/quality_control/FQC/report', component: Index, name: '电芯出货报告'},
          {path: '/quality_control/FQC/report_template', component: Index, name: '出货报告模板管理'}
        ]
      }
    ]
  },
  {
    path: '/reports',
    component: Home,
    name: '报表管理',
    iconClass: 'fa fa-file-excel-o',
    children: [
      {
        path: '/reports/m',
        component: Blank,
        name: '生产报表',
        leaf: false,
        children: [
          {path: '/reports/m/battery_cells', component: Index, name: '电芯数据查询报表'},
          {path: '/reports/m/production_processes', component: Index, name: '工序生产报表'},
          {path: '/reports/m/plan_goal_rate', component: Index, name: '计划达成率报表'}
        ]
      },
      {
        path: '/reports/devices',
        component: Blank,
        name: '设备报表',
        leaf: false,
        children: [
          {path: '/reports/devices/OEE', component: Index, name: '设备OEE报表'},
          {path: '/reports/devices/error', component: Index, name: '设备异常报表'},
          {path: '/reports/devices/maintenance', component: Index, name: '设备维修报表'}
        ]
      },
      {
        path: '/reports/quality',
        component: Blank,
        name: '质量报表',
        leaf: false,
        children: [
          {path: '/reports/quality/IQC/good', component: Index, name: 'IQC优率报表'},
          {path: '/reports/quality/IQC/bad', component: Index, name: 'IQC不良内容统计及分布'},
          {path: '/reports/quality/PQC/good', component: Index, name: 'PQC优率报表'},
          {path: '/reports/quality/PQC/bad', component: Index, name: 'PQC不良内容统计及分布'},
          {path: '/reports/quality/FQC', component: Index, name: 'FQC优率报表'},
          {path: '/reports/quality/process_good_rate', component: Index, name: '工序优率及不良率'},
          {path: '/reports/quality/bad_product_distribution', component: Index, name: '综合坏品及坏品分布'},
          {path: '/reports/quality/worksheet_good_rate', component: Index, name: '工单优率及不良率'},
          {path: '/reports/quality/bad_worksheet_distribution', component: Index, name: '工单坏品及坏品分布'}
        ]
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '看板管理',
    iconClass: 'fa fa-clone',
    leaf: true,
    children: [
      {path: '/display_board', component: Index, name: '看板管理', leaf: true}
    ]
  },
  {
    path: '/trace',
    component: Home,
    name: '追溯模块',
    iconClass: 'fa fa-external-link',
    children: [
      {path: '/trace/worksheet', component: Index, name: '工单追溯', leaf: true},
      {path: '/trace/forward', component: Index, name: '正向追溯', leaf: true},
      {path: '/trace/backward', component: Index, name: '逆向追溯', leaf: true}
    ]
  },
  {
    path: '/SPC',
    component: Home,
    name: 'SPC',
    iconClass: 'fa fa-line-chart',
    children: [
      {path: '/SPC/DAQ', component: Index, name: '数据采集', leaf: true}
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: {path: '/404'}
  }
]

export default routes
