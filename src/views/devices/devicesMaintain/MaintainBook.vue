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
            <el-input v-model.trim="axiosData.projectName" size="medium" placeholder="输入关键字" @keyup.native.enter="getData()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getData()">查询</el-button>
            <el-button size="medium" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <!--内容-->
    <el-table :data="dataList" highlight-current-row v-loading="listLoading">
      <el-table-column type="index" :index="getIndex" width="60"></el-table-column>
      <el-table-column prop="devices_upkeep_project_name" label="检修保养项目" sortable></el-table-column>
      <el-table-column prop="devices_upkeep_project_standard" label="检修保养基准" sortable></el-table-column>
      <el-table-column prop="devices_upkeep_project_point" label="检修保养要点" sortable></el-table-column>
      <el-table-column prop="devices_upkeep_project_period" label="周期" sortable></el-table-column>
      <el-table-column prop="devices_upkeep_project_rank" label="级别" sortable></el-table-column>
      <el-table-column label="操作" fixed="right" width="280">
        <template slot-scope="scope">
          <el-button size="medium" type="primary">修改</el-button>
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
import {queryUpkeepPlans} from '../../../api/api'
import utils from '../../../common/js/utils'
export default {
  name: 'MaintainBook',
  data () {
    return {
      dataList: [],
      listLoading: false,
      pageSize: 10,
      page: 1,
      total: 0,
      axiosData: {
        type: 'projectInfo',
        headNum: 1,
        projectName: ''
      }
    }
  },
  methods: {
    // 获取基础数据
    getData () {
      let data = Object.assign(this.axiosData, {
        headNum: utils.getHeadNumAdapter(this.page, this.pageSize)
      })
      this.listLoading = true
      queryUpkeepPlans(data).then((data) => {
        this.listLoading = false
        if (data.status === 0) {
          this.dataList = data.map.upkeepProjects
          this.total = data.map.lines
        } else if (data.status === 2) {
          this.dataList = []
          this.$message.error('暂无数据');
        } else {
          this.$message.error('数据有误');
        }
      })
    },
    // 重置
    reset () {
      this.axiosData = {
        type: 'projectInfo',
        headNum: 1,
        projectName: ''
      }
      this.getData()
    },
    // 列表索引
    getIndex (index) {
      return parseInt(this.pageSize) * parseInt(this.page - 1) + index + 1
    },
     // 页面改变
    handlePageChange (val) {
      this.page = val
      this.getData()
    },
    // 每页数量改变
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style>

</style>

