import * as types from './mutation-types'
import {
  queryDeviceTypes ,getWarehouseList,queryProductModels,
 // queryDeviceTypes,
  queryWorkstageBasics,
  queryWorkShopInfos,
  getProductTypeList
} from '../api/api'

// 设置token
export const setToken = ({commit}, token) => {
  commit(types.SET_TOKEN, token)
}
// 设置user
export const setUser = ({commit}, user) => {
  commit(types.SET_USER, user)
}
// 设置返回路径returnPath
export const setReturnPath = ({commit}, path) => {
  commit(types.SET_RETURN_PATH, path)
}
// 设置设备类型devicesTypes
export const initDevicesTypes = ({commit}, para) => {
  queryDeviceTypes(para).then(res => {
    if (res.status === 0 && res.map.devices_control_devices_type.length > 0) {
      res.map.devices_control_devices_type.map(v => {
        v.label = v.devices_control_devices_type_name
        v.value = v.devices_control_devices_type_id
      })
      commit(types.SET_DEVICE_TYPES, res.map.devices_control_devices_type)
    }
  })
}
// 设置工序
export const initWorkstageList = ({commit}, para) => {
  para = Object.assign({
    type: 'vague',
    status: 0
  }, para)
  queryWorkstageBasics(para).then(res => {
    if (res.status === 0 && res.map.workstageBasicsList.length > 0) {
      commit(types.SET_WORKSTAGE_LIST, res.map.workstageBasicsList.map(v => { return {label: v.workstage_name, value: v.workstage_basics_id} }))
    }
  })
}
// 设置车间
export const initWorkshopList = ({commit}, para) => {
  para = Object.assign({type: 'info'}, para)
  queryWorkShopInfos(para).then(res => {
    if (res.status === 0 && res.map.workshopInfos.length > 0) {
      commit(types.SET_WORKSHOP_LIST, res.map.workshopInfos.map(v => { return {label: v.role_workshop_name, value: v.role_workshop_id} }))
    }
  })
}
// 设置设别类型warehouse
export const initWarehouseName = ({commit}, para) => {
  getWarehouseList(para).then(data => {
    if (data.status === 0 || data.map.warehouse.length > 0) {
      commit(types.SET_WAREHOUSE_NAME, data.map.warehouse)
    }
  })
}
// 设置productModel
export const initProductModel = ({commit}, para) => {
  queryProductModels().then(data => {
    if (data.status === 0 || data.map.productModels.length > 0) {
      commit(types.SET_PRODUCT_MODEL, data.map.productModels)
    }
  })
}
// 设置成品类型
export const initProductTypes = ({commit}, para) => {
  getProductTypeList({
    type:"vague",
    status:0
  }).then(data => {
    if (data.status === 0 || data.map.productTypes.length > 0) {
      commit(types.SET_PRODUCT_TYPES, data.map.productTypes)
    }
  })
}

