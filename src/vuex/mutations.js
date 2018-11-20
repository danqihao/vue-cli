import * as types from './mutation-types'
// import utils from '../common/js/utils'

export default {
  // 设置user
  [types.SET_USER] (state, user) {
    state.user = user
  },
  // 设置token
  [types.SET_TOKEN] (state, token) {
    localStorage.setItem('token', token)
    state.token = token
  },
  // 设置返回路径returnPath
  [types.SET_RETURN_PATH] (state, path) {
    localStorage.setItem('returnPath', path)
    state.returnPath = path
  },
  // 设置deviceTypes
  [types.SET_DEVICE_TYPES] (state, deviceTypes) {
    state.deviceTypes = deviceTypes
  },
  // 设置warehouseName
  [types.SET_WAREHOUSE_NAME] (state, warehouseName) {
    state.warehouseName = warehouseName
  },
  // 设置productModel
  [types.SET_PRODUCT_MODEL] (state, productModel) {
    state.productModel = productModel
  },
  // 设置workstageList
  [types.SET_WORKSTAGE_LIST] (state, list) {
    state.workstageList = list
  },
  // 设置workshopList
  [types.SET_WORKSHOP_LIST] (state, list) {
    state.workshopList = list
  },
  // 设置成品类型
  [types.SET_PRODUCT_TYPES] (state, list) {
    state.productTypes = list
  }
}
