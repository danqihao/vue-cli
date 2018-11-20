<!-- 刘川中 2018.4.13 -->
<template>
	<el-row>
    <el-tabs type="border-card">
		  <el-tab-pane label="工步">
				<!--列表 start-->
		    <el-table :data="stageAndStepRelationList" v-loading="visible.listLoading"
		              row-class-name="el-mini-row"
		              highlight-current-row>
		      <el-table-column type="index" :index="getIndex"></el-table-column>
		      <el-table-column prop="workstep.craft_control_workstep_name" label="工步名称" sortable></el-table-column>
		      <el-table-column prop="workstep.craft_control_workstep_num" label="工步编号" sortable></el-table-column>
		      <el-table-column prop="workstep.craft_control_workstep_version" label="工步版本" sortable></el-table-column>
		      <el-table-column prop="" label="操作" width="320">
		      	<template slot-scope="scope">
		      		<el-button type="success" size="small" @click="handleMaterialDetail(scope.row)">物料详情</el-button>
		        	<el-button type="success" size="small" @click="handleWorkstepDetail(scope.row)">工步参数</el-button>
		        	<el-button type="success" size="small" @click="handleDeviceUserRecordDetail(scope.row)">设备操作记录</el-button>
		      	</template>
		      </el-table-column>
		    </el-table>
		    <!--列表 end-->
		    
				<!--分页start -->
		    <div class="clearfix" hidden>
		      <el-col :span="24" class="toolbar">
		        <el-pagination layout="total, sizes, prev, pager ,next" :page-size="filters.pageSize"
		                       :total="filters.total"
		                       @current-change="handlePageChange" @size-change="handleSizeChange">
		        </el-pagination>
		      </el-col>
		    </div>
		    <!--分页end -->
		  </el-tab-pane>
		  <el-tab-pane label="环境参数">
				<!--列表 start-->
		    <el-table :data="useParametersList1" v-loading="visible.listLoading"
		              row-class-name="el-mini-row"
		              highlight-current-row>
		      <el-table-column type="index" :index="getIndex"></el-table-column>
		      <el-table-column prop="workstage_use_parameter_name" label="参数名称" sortable></el-table-column>
		      <el-table-column prop="workstage_use_parameter_value_type" label="值类型" sortable>
		      	<template slot-scope="scope">
		      		{{ getParamLabel(scope.row.workstage_use_parameter_value_type) }}
		      	</template>
		      </el-table-column>
		      <el-table-column prop="workstage_use_parameter_constant_value" label="参考值" sortable></el-table-column>
		      <el-table-column prop="workstage_use_parameter_unit" label="单位" sortable></el-table-column>
		      <el-table-column prop="" label="操作" width="100">
		      	<template slot-scope="scope">
		      		<el-button type="success" size="small" @click="handleEnvironmentDetail(scope.row)">参数详情</el-button>
		      	</template>
		      </el-table-column>
		    </el-table>
		    <!--列表 end-->
		  </el-tab-pane>
		  <el-tab-pane label="半成品参数">
				<!--列表 start-->
		    <el-table :data="useParametersList2" v-loading="visible.listLoading"
		              row-class-name="el-mini-row"
		              highlight-current-row>
		      <el-table-column type="index" :index="getIndex"></el-table-column>
		      <el-table-column prop="workstage_use_parameter_name" label="参数名称" sortable></el-table-column>
		      <el-table-column prop="workstage_use_parameter_value_type" label="值类型" sortable>
		      	<template slot-scope="scope">
		      		{{ getParamLabel(scope.row.workstage_use_parameter_value_type) }}
		      	</template>
		      </el-table-column>
		      <el-table-column prop="workstage_use_parameter_constant_value" label="参考值" sortable></el-table-column>
		      <el-table-column prop="workstage_use_parameter_unit" label="单位" sortable></el-table-column>
		      <el-table-column prop="" label="操作" width="100">
		      	<template slot-scope="scope">
		      		<el-button type="success" size="small" @click="handleSemiProductDetail(scope.row)">参数详情</el-button>
		      	</template>
		      </el-table-column>
		    </el-table>
		    <!--列表 end-->
		  </el-tab-pane>
		</el-tabs>
    <!-- 物料使用详情 -->
    <el-dialog :visible.sync="visible.material" title="物料详情" width="50%" class="mes-dialog">
      <!-- <el-tabs type="border-card"> -->
        <!-- <el-tab-pane label="投料详情一"> -->
        <el-col class="toolbar">
          <el-form :inline="true" :model="filters" @submit.native.prevent>
            <el-col :span="24" class="text-right">
              <el-form-item :span="4">
                <el-select v-model="materialFilters.type" placeholder="查看方式" @change="getUseMaterielList" size="medium">
                  <el-option
                    v-for="item in MaterialTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" @click="materialFilters.type = ''; getUseMaterielList()">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        <el-table :data="useMaterielList" v-loading="visible.useMaterielListLoading"
                  row-class-name="el-mini-row"
                  highlight-current-row>
          <el-table-column type="index" :index="getUseMaterielListIndex"></el-table-column>
          <el-table-column prop="craft_materiel_name" label="物料名称" sortable></el-table-column>
          <el-table-column prop="craft_materiel_specifications" label="规格" sortable></el-table-column>
          <el-table-column prop="craft_materiel_model" label="型号" sortable></el-table-column>
          <el-table-column prop="craft_materiel_unit" label="单位" sortable></el-table-column>
          <el-table-column prop="" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="handleMaterialDetailView(scope.row)">参数详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="clearfix">
          <el-col :span="24" class="toolbar">
            <el-pagination layout="total, sizes, prev, pager ,next" :page-size="materialFilters.pageSize"
                           :total="materialFilters.total"
                           @current-change="handleMaterialPageChange" @size-change="handleMaterialSizeChange">
            </el-pagination>
          </el-col>
        </div>
        <!-- </el-tab-pane>
        <el-tab-pane label="投料详情二" hidden></el-tab-pane> -->
      <!-- </el-tabs> -->
    </el-dialog>

    <!-- 工步参数 -->
    <el-dialog :visible.sync="visible.workstep" title="工步参数" width="50%" class="mes-dialog">
      <el-table :data="workstepParameterList" v-loading="visible.useMaterielListLoading"
                row-class-name="el-mini-row"
                highlight-current-row>
        <el-table-column type="index" :index="getUseMaterielListIndex"></el-table-column>
        <el-table-column prop="craft_workstep_parameter_name" label="参数" sortable></el-table-column>
          <el-table-column prop="craft_workstep_parameter_value_type" label="值类型" sortable>
            <template slot-scope="scope">
              {{ getParamLabel(scope.row.craft_workstep_parameter_value_type) }}
            </template>
          </el-table-column>
        <el-table-column prop="workstep_parameter_constant_value" label="参考值" sortable></el-table-column>
        <el-table-column prop="workstep_parameter_unit" label="单位" sortable></el-table-column>
        <el-table-column prop="devices_control_devices_type_id" label="设备类型" sortable>
            <template slot-scope="scope">
              {{ getDeviceLabel(scope.row.devices_control_devices_type_id) }}
            </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="handleWorkstepParameterDetailView(scope.row)">参数详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 设备操作记录 -->
    <el-dialog :visible.sync="visible.deviceLog" title="物料详情" width="50%" class="mes-dialog">
      <el-col class="toolbar">
        <el-form :inline="true" :model="deviceLogFilters" @submit.native.prevent>
          <el-col :span="24" class="text-right">
            <el-form-item :span="4">
              <el-input v-model.trim="deviceLogFilters.keyword" size="medium" placeholder="输入关键字" @keyup.native.enter="getDeviceLogList"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="getDeviceLogList" icon="el-icon-search">查询</el-button>
              <el-button size="medium" @click="deviceLogFilters.keyword = ''; getDeviceLogList()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-table :data="deviceLogList" v-loading="visible.deviceLogListLoading"
                row-class-name="el-mini-row"
                highlight-current-row>
        <el-table-column type="index" :index="getDeviceLogListIndex"></el-table-column>
        <el-table-column prop="craft_materiel_name" label="投料时间" sortable></el-table-column>
        <el-table-column prop="craft_materiel_specifications" label="使用数量" sortable></el-table-column>
        <el-table-column prop="craft_materiel_model" label="投料人" sortable></el-table-column>
        <el-table-column prop="craft_materiel_unit" label="物料编号" sortable></el-table-column>
        <el-table-column prop="craft_materiel_unit" label="备注" sortable></el-table-column>
        <el-table-column prop="" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="handleDeviceLogDetailView(scope.row)">参数详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <el-col :span="24" class="toolbar">
          <el-pagination layout="total, sizes, prev, pager ,next" :page-size="materialFilters.pageSize"
                         :total="materialFilters.total"
                         @current-change="handleMaterialPageChange" @size-change="handleMaterialSizeChange">
          </el-pagination>
        </el-col>
      </div>
    </el-dialog>

    <!-- 环境参数 -->
    <el-dialog :visible.sync="visible.environment" title="工步参数" width="50%" class="mes-dialog">
      <el-table :data="environmentParamsList" v-loading="visible.environmentParamsListLoading"
                row-class-name="el-mini-row"
                highlight-current-row>
        <el-table-column type="index" :index="getEnvironmentParamsIndex"></el-table-column>
        <el-table-column prop="craft_workstep_parameter_name" label="参数" sortable></el-table-column>
          <el-table-column prop="craft_workstep_parameter_value_type" label="值类型" sortable>
            <template slot-scope="scope">
              {{ getParamLabel(scope.row.craft_workstep_parameter_value_type) }}
            </template>
          </el-table-column>
        <el-table-column prop="workstep_parameter_constant_value" label="参考值" sortable></el-table-column>
        <el-table-column prop="workstep_parameter_unit" label="单位" sortable></el-table-column>
        <el-table-column prop="" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="handleEnvironmentParamsDetailView(scope.row)">参数详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 半成品参数 -->


	</el-row>
	
</template>

<script>
  import utils from '../common/js/utils'
  import {
    queryWorkstageParticulars, queryWorkOrderParameteRecord,
    queryStepParticulars, queryWorkOrderMaterialUseRecord,
    queryWorkOrderDevicesOperationRecord
  } from '../api/api'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'work-step',
    data () {
      return {
        filters: {
          type: 'info',
          status: 0,
          page: 1,
          pageSize: 10,
          total: 0
        },
        materialFilters: {
          type: '',
          page: 1,
          pageSize: 10,
          total: 0
        },
        deviceLogFilters: {
          type: '',
          page: 1,
          pageSize: 10,
          total: 0
        },
        environmentParamsFilters: {
          type: '',
          page: 1,
          pageSize: 10,
          total: 0
        },
        MaterialTypeList: [
          {label: '按物料查看', value: 'materialName'},
          {label: '按时间升序', value: 'materialUseTimeAsc'},
          {label: '按物料降序', value: 'materialUseTimeDesc'}
        ],
        visible: {
          listLoading: false,
          material: false,
          workstep: false,
          deviceLog: false,
          environment: false,
          semiProduct: false,
          useMaterielListLoading: false,
          deviceLogListLoading: false,
          environmentParamsListLoading: false
        },
        list: [],
        processDescribleList: [],
        stageAndStepRelationList: [],
        useParametersList: [],
        useParametersList1: [],
        useParametersList2: [],
        stepId: '',
        stepMaterialId: '',
        parameteId: '',
        useMaterielList: [],
        workstepParameterList: [],
        deviceLogList: [],
        environmentParamsList: []
      }
    },
    props: {
      workstageIds: {
        type: String,
        default: ''
      },
      workorderId: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters({
        paramValueTypeList: 'getParamValueTypeList',
        deviceTypes: 'getDeviceTypes'
      })
    },
    mounted () {
      if (this.workstageIds !== '') {
        this.getList()
      }
      if (this.deviceTypes.length === 0) {
        this.initDevicesTypes()
      }
    },
    methods: {
      ...mapActions(['initDevicesTypes']),
      // 列表索引
      getIndex (index) {
        return utils.getHeadNumAdapter(this.filters.page, this.filters.pageSize, index)
      },
      getUseMaterielListIndex (index) {
        return utils.getHeadNumAdapter(this.materialFilters.page, this.materialFilters.pageSize, index)
      },
      getDeviceLogListIndex (index) {
        return utils.getHeadNumAdapter(this.deviceLogFilters.page, this.deviceLogFilters.pageSize, index)
      },
      getEnvironmentParamsIndex (index) {
        return utils.getHeadNumAdapter(this.environmentParamsFilters.page, this.environmentParamsFilters.pageSize, index)
      },
      // 获取数据列表
      getList () {
        // this.list = []
        this.visible.listLoading = true
        let para = Object.assign({
          'workstageIds[]': this.workstageIds,
          headNum: utils.getHeadNumAdapter(this.filters.page, this.filters.pageSize)
        })
        queryWorkstageParticulars(para).then((res) => {
          if (res.status === 0) {
            // this.filters.total = res.map.lines
            this.list = res.map.workstageList
            this.processDescribleList = this.list[0].processDescribleList
            this.stageAndStepRelationList = this.list[0].stageAndStepRelationList
            this.useParametersList = this.list[0].useParametersList
            this.useParametersList.map(v => {
              if (v.standard_parameter_type_name === '环境参数') {
                this.useParametersList1.push(v)
              } else {
                this.useParametersList2.push(v)
              }
            })
          } else {
            this.filters.total = 0
            this.list = []
          }
          this.visible.listLoading = false
        })
      },
      // 页码改变
      handlePageChange (val) {
        this.filters.page = val
        this.getList()
      },
      // 每页数量改变
      handleSizeChange (val) {
        this.materialFilters.pageSize = val
        this.getList()
      },
      handleMaterialPageChange (val) {
        this.filters.page = val
        this.getUseMaterielList()
      },
      handleMaterialSizeChange (val) {
        this.materialFilters.pageSize = val
        this.getUseMaterielList()
      },
      handleDeviceLogPageChange (val) {
        this.deviceLogFilters.page = val
        this.getDeviceLogList()
      },
      handleDeviceLogSizeChange (val) {
        this.deviceLogFilters.pageSize = val
        this.getDeviceLogList()
      },
      handleEnvironmentParamsPageChange (val) {
        this.environmentParams.page = val
        this.getEnvironmentParamsList()
      },
      handleEnvironmentParamsSizeChange (val) {
        this.environmentParams.pageSize = val
        this.getEnvironmentParamsList()
      },
      getParamLabel (value) {
        let label = ''
        this.paramValueTypeList.map(v => {
          if (v.value === value) {
            label = v.label
          }
        })
        return label
      },
      getDeviceLabel (value) {
        let label = ''
        this.deviceTypes.map(v => {
          if (v.value === value) {
            label = v.label
          }
        })
        return label
      },
      handleMaterialDetail (row) {
        this.visible.material = true
        this.stepId = row.workstep.craft_control_workstep_id
        this.getUseMaterielList()
        // 这个接口感觉多余了
        queryWorkOrderMaterialUseRecord({stepId: this.stepId, type: 'materialName', workOrderId: this.workorderId})
      },
      getUseMaterielList () {
        this.visible.useMaterielListLoading = true
        queryStepParticulars(Object.assign({'stepIds[]': this.stepId}, this.materialFilters)).then((res) => {
          if (res.status === 0) {
            this.useMaterielList = res.map.workstepList[0].useMaterielList
            this.workstepParameterList = res.map.workstepList[0].workstepParameterList
          } else {
            this.useMaterielList = []
            this.workstepParameterList = []
          }
          this.visible.useMaterielListLoading = false
        })
      },
      handleWorkstepDetail (row) {
        this.visible.workstep = true
        this.stepId = row.workstep.craft_control_workstep_id
        this.getUseMaterielList()
      },
      handleDeviceUserRecordDetail (row) {
        this.visible.deviceLog = true
        this.stepId = row.workstep.craft_control_workstep_id
        this.getDeviceLogList()
      },
      // 未完成
      handleEnvironmentDetail (row) {
        this.visible.environment = true
        this.parameteId = row.workstage_use_parameter_main_id
      },
      handleSemiProductDetail (row) {
        console.log(row);
      },
      handleMaterialDetailView (row) {

      },
      handleWorkstepParameterDetailView (row) {

      },
      handleDeviceLogDetailView (row) {

      },
      handleEnvironmentParamsDetailView (row) {

      },
      getDeviceLogList () {
        this.visible.deviceLogListLoading = true
        queryWorkOrderDevicesOperationRecord(Object.assign({'stepId': this.stepId}, this.deviceLogFilters)).then((res) => {
          if (res.status === 0) {
            // this.deviceLogFilters.total = 0
            this.deviceLogList = res.map.workstepList[0].useMaterielList
          } else {
            this.deviceLogList = []
            this.deviceLogFilters.total = 0
          }
          this.visible.deviceLogListLoading = false
        })
      },
      getEnvironmentParamsList () {
        this.visible.environmentParamsListLoading = false
        queryWorkOrderParameteRecord({parameteId: this.parameteId}).then(res => {
          if (res.status === 0) {
            // this.environmentParamsFilters.total = 0
            this.environmentParamsList = res.map.workstepList[0].useMaterielList
          } else {
            this.environmentParamsList = []
            this.environmentParamsFilters.total = 0
          }
          this.visible.environmentParamsListLoading = false
        })
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">

</style>
