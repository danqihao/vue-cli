<!-- 魏彬祥 2018.4.12 -->
<template>
  <section>
     <!--头部-->
    <el-col :span=24 :gutter="20" class="toolbar">
      <el-form :inline="true" :model="axiosData">
        <el-col :span="4" class="text-left">
          <el-form-item>
            <el-button type="primary" size="medium">新增设备</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="20" class="text-right">
          <el-form-item>
            <el-select placeholder="请选择" size="medium" v-model="axiosData.typeId" @change="getData('typeId')">
              <el-option value="" label="全部类型"></el-option>
              <el-option v-for="value in typeList" :value="value.devices_control_devices_type_id" :label="value.devices_control_devices_type_name" :key="value.devices_control_devices_type_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model.trim="axiosData.devicesName" size="medium" placeholder="输入关键字" @keyup.native.enter="getData('key')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getData('key')">查询</el-button>
            <el-button size="medium" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
     <!--内容-->
    <el-table :data="dataList" highlight-current-row v-loading="listLoading">
      <el-table-column type="index" :index="getIndex" width="60"></el-table-column>
      <el-table-column prop="devices.devices_control_devices_name" label="设备名称" sortable></el-table-column>
      <el-table-column prop="devices.devices_control_devices_number" label="设备编号" sortable></el-table-column>
      <el-table-column label="发生时间" sortable> <template slot-scope="scope">{{ scope.row.devices_malfunction_record_time | date }}</template></el-table-column>
      <el-table-column prop="devices_malfunction_record_part" label="故障部位" sortable></el-table-column>
      <el-table-column prop="devices_malfunction_record_status" label="处理情况" sortable></el-table-column>
      <el-table-column prop="devices_malfunction_people" label="处理人" sortable></el-table-column>
      <el-table-column prop="devices_malfunction_identify_people" label="确认人" sortable></el-table-column>
      <el-table-column label="操作" fixed="right" width="280">
        <template slot-scope="scope">
          <el-button size="medium" type="primary">更多</el-button>
          <el-button size="medium" type="primary">修改</el-button>
          <el-button size="medium" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--页码-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, sizes, prev, pager ,next" :page-size="pageSize" :total="total" @current-change="handlePageChange" @size-change="handleSizeChange"></el-pagination>
    </el-col>
  </section>
</template>
<script>
import {queryDevicesMalfunction, queryDeviceTypes} from '../../api/api'
import utils from '../../common/js/utils'
export default {
  name: 'MalfunctionRecord',
  data () {
    return {
      dataList: [],
      typeList: [],
      listLoading: false,
      pageSize: 10,
      page: 1,
      total: 0,
      axiosData: {
        type: 'all',
        headNum: 1,
        devicesName: '',
        typeId: ''
      }
    }
  },
  methods: {
    // 获取基础数据
    getData (type) {
      let data = Object.assign(this.axiosData, {
        type: type,
        headNum: utils.getHeadNumAdapter(this.page, this.pageSize)
      })
      this.listLoading = true
      queryDevicesMalfunction(data).then((data) => {
        this.listLoading = false
        if (data.status === 0) {
          this.dataList = data.map.devices
          this.total = data.map.lines
        } else if (data.status === 2) {
          this.dataList = []
          this.$message.error('暂无数据');
        } else {
          this.$message.error('数据有误');
        }
      })
    },
        // 获取设备类型
    getType () {
      queryDeviceTypes(this.axiosData).then((data) => {
        this.typeList = data.map.devices_control_devices_type
      })
    },
    // 重置
    reset () {
      this.axiosData = {
        type: 'all',
        headNum: 1,
        devicesName: '',
        typeId: ''
      }
      this.getData('all')
    },
    // 列表索引
    getIndex (index) {
      return parseInt(this.pageSize) * parseInt(this.page - 1) + index + 1
    },
    // 页面改变
    handlePageChange (val) {
      this.page = val
      this.getData('all')
    },
    // 每页数量改变
    handleSizeChange (val) {
      this.pageSize = val
      this.getData('all')
    }
  },
  filters: {
    date (value) {
      return utils.formatDate.format(new Date(value), 'yyyy-MM-dd')
    }
  },
  mounted () {
    this.getData('all')
    this.getType()
  }
}
</script>
<style>

</style>

