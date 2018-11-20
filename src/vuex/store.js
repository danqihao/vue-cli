import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)

// 应用初始状态
const state = {
  token: localStorage.getItem('token') || '',   // 保存服务器给的token
  returnPath: sessionStorage.returnPath || '',  // 重新登录之后返回的url
  user: null,                                   // 用户基本信息
  visible: {},                                  // 全局控制显示、隐藏
  deviceTypes: [] ,                           // 设备类型
  warehouseName: [] ,                           // 仓库管理
  productModel: []  ,                         // 成品型号
  productTypes: []  ,                         // 成品类型
  deviceTypes: [],                              // 设备类型
  workstageList: [],                            // 工序
  workshopList: [],                             // 车间
  productionStatusList: [                       // 生产状态
    {label: '未生产', value: '0'},
    {label: '生产中', value: '1'},
    {label: '已完成', value: '2'},
    {label: '已暂停', value: '3'},
    {label: '已停止', value: '4'}
  ],
  paramValueTypeList: [                       // 参数值类型
    {label: '固定值', value: 'constantValue'},
    {label: '范围值', value: 'rangeValue'},
    {label: '浮动值', value: 'deviationValue'}
  ],
  voltageUnit:["V","kV","mV","μV"],//常用电压单位
  currentUnit:["A","kA","mA","μA"],//常用电流单位
  resistanceUnit:["Ω","kΩ","MΩ","GΩ"],//常用电阻单位
  weightUnit:["g","mg","kg"],//常用重量单位
  temperatureUnit:["℃","℉"],//常用温度单位
  sizeUnit:["cm","mm","dm","m","km","μm"],//常用尺寸单位
  rateUnit:["%","‰" ],//速率单位
  capacityUnit:["mAh","Ah" ],//容量单位
}

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
