<!-- 魏彬祥 2018.4.11 -->
<template>
  <section>
    <el-dialog  class="mes-dialog" title="点检登记" :visible.sync="executeData.show" width="60%" :close-on-click-modal="false">
        <!--基础信息-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size:16px">基础信息</span>
          </div>
          <el-row :gutter="15">
            <el-col :span="8" class="padding">
              <el-input disabled class="el_input" :value="checksData.devices ? checksData.devices.devices_control_devices_name : ''">
                <span slot="prepend">设备名称</span>
              </el-input>
            </el-col>
            <el-col :span="8" class="padding">
              <el-input disabled class="el_input" :value="checksData.devices ? checksData.devices.devices_control_devices_number : ''">
                <span slot="prepend">设备编号</span>
              </el-input>
            </el-col>
            <el-col :span="8" class="padding">
              <el-input disabled class="el_input" :value="checksData.devices_check_plan_version">
                <span slot="prepend">点检表版本号</span>
              </el-input>
            </el-col>
            <el-col :span="8" class="padding">
              <el-input disabled class="el_input" :value="checksData.devices_check_plan_status === '0' ? '启用' : '关闭'">
                <span slot="prepend">状态</span>
              </el-input>
            </el-col>
            <el-col :span="8" class="padding">
              <el-input disabled class="el_input" :value="checksData.devices_check_plan_creator">
                <span slot="prepend">创建人</span>
              </el-input>
            </el-col>
            <el-col :span="8" class="padding">
              <el-input disabled class="el_input" :value="checksData.devices_check_plan_people">
                <span slot="prepend">点检人</span>
              </el-input>
            </el-col>
            <el-col :span="8" class="padding">
              <el-input disabled class="el_input" :value="checksData.devices_check_plan_artisan">
                <span slot="prepend">班长确认人</span>
              </el-input>
            </el-col>
            <el-col :span="8"  class="padding">
              <el-input disabled class="el_input" :value="checksData.devices_check_plan_creator">
                <span slot="prepend">技术确认人</span>
              </el-input>
            </el-col>
          </el-row>
        </el-card>
        <!--点检项目-->
        <el-card class="box-card margin">
          <div slot="header" class="clearfix">
            <span style="font-size:16px">点检项目</span>
            <el-date-picker type="date" v-model="axiosData.startDate" placeholder="选择日期" format="yyyy-MM-dd" :default-value="new Date()" size="medium" style="float: right;">
            </el-date-picker>
          </div>
          <el-table :data="projectList" border>
            <el-table-column prop="devices_check_project_name" label="项目名称"></el-table-column>
            <el-table-column prop="devices_check_project_standard" label="基准"></el-table-column>
            <el-table-column prop="devices_check_project_method" label="点检方法"></el-table-column>
            <el-table-column prop="devices_check_project_period" label="点检时机"></el-table-column>
            <el-table-column prop="devices_check_project_day" label="班次"></el-table-column>
            <el-table-column label="点检结果" width="130">
              <template slot-scope="scope">
                <el-select v-model="scope.row.result" v-if="scope.row.devices_check_project_result === ''">
                  <el-option value="良好"></el-option>
                  <el-option value="异常"></el-option>
                  <el-option value="送检"></el-option>
                </el-select>
                <div v-else>{{scope.row.devices_check_project_result}}</div>
              </template>
            </el-table-column>
            <el-table-column label="点检人" width="130">
              <template slot-scope="scope">
                <el-input placeholder="请选择" v-model="scope.row.enterStaff" @focus="selectStaff(scope.$index)" v-if="scope.row.devices_check_enter_people === ''"></el-input>
                <div v-else>{{scope.row.devices_check_enter_people}}</div>
              </template>
            </el-table-column>
            <el-table-column label="班长确认" width="130">
              <template slot-scope="scope">
                {{scope.row.devices_check_enter_monitor}}
              </template>
            </el-table-column>
            <el-table-column label="技术确认" width="130">
              <template slot-scope="scope">
                {{scope.row.devices_check_enter_artisan}}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <!--异常记录-->
        <el-card class="box-card margin">
          <div slot="header" class="clearfix" style="line-height:36px">
            <span style="font-size:16px">异常记录</span>
            <el-button style="float: right;" type="primary" size="medium" @click="addProject">增加项目</el-button>
          </div>
          <el-table :data="exceptionsData" border>
            <el-table-column prop="devices_exception_record_time" label="发生时间"></el-table-column>
            <el-table-column prop="devices_exception_record_detail" label="异常内容"></el-table-column>
            <el-table-column prop="devices_exception_record_people" label="记录人"></el-table-column>
            <el-table-column prop="devices_exception_record_handling" label="异常处置"></el-table-column>
            <el-table-column prop="devices_exception_record_identify_people" label="确认人"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button size="medium" type="danger">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
    </el-dialog>
  </section>
</template>
<script>
import {queryCheckPlan} from '../../../api/api'
export default {
  name: 'SpotCheckRecord_execute',
  props: ['executeData'],
  data () {
    return {
      checksData: [],
      exceptionsData: [],
      projectList: [],
      day: ['上午', '下午'],
      axiosData: {
        type: 'detail',
        checkId: '389d909228e247c28ad965afe901a152',
        startDate: '2018-04-11',
        endDate: '2018-04-11',
        startTime: '2018-04-01',
        endTime: '2018-04-31',
        headNum: 1
      }
    }
  },
  methods: {
    getData () {
      let data = Object.assign(this.axiosData, {
        // startDate:,
      })
      queryCheckPlan(data).then((data) => {
        this.checksData = data.map.checks[0]
        this.exceptionsData = data.map.exceptions
        if (data.map.checks[0].devicesCheckProjects !== null) {
          data.map.checks[0].devicesCheckProjects.forEach((value, index) => {
            if (value.devicesCheckEnters[0].devices_check_enter_id === null) {
              for (let i = 0; i < this.day.length; i++) {
                this.projectList.push({
                  devices_check_project_name: value.devices_check_project_name,
                  devices_check_project_standard: value.devices_check_project_standard,
                  devices_check_project_method: value.devices_check_project_method,
                  devices_check_project_period: value.devices_check_project_period,
                  devices_check_project_day: this.day[i],
                  devices_check_project_result: '',
                  devices_check_enter_people: '',
                  devices_check_enter_monitor: '',
                  devices_check_enter_artisan: '',
                  enterStaff: '',
                  enterStaffId: '',
                  result: ''
                })
              }
            } else {
              value.devicesCheckEnters.forEach((val, key) => {
                this.projectList.push({
                  devices_check_project_name: value.devices_check_project_name,
                  devices_check_project_standard: value.devices_check_project_standard,
                  devices_check_project_method: value.devices_check_project_method,
                  devices_check_project_period: value.devices_check_project_period,
                  devices_check_project_day: val.devices_check_enter_result_am === '' ? '下午' : '上午',
                  devices_check_project_result: val.devices_check_enter_result_am === '' ? val.devices_check_enter_result_pm : val.devices_check_enter_result_am,
                  devices_check_enter_people: val.devices_check_enter_people,
                  devices_check_enter_monitor: val.devices_check_enter_monitor,
                  devices_check_enter_artisan: val.devices_check_enter_artisan,
                  enterStaff: '',
                  enterStaffId: '',
                  result: ''
                })
              })
            }
          })
        }
      })
    },
    selectStaff (index) {
      this.$mesStaff.show({
        type: 'all',
        reRender: true,
        selectedIds: []
      }).then((data) => {
        this.projectList[index].enterStaffId = data.rows[0].role_staff_id
        this.projectList[index].enterStaff = data.rows[0].role_staff_name
      })
    },
    addProject () {
      this.exceptionsData.push({
        devices_exception_record_time: '',
        devices_exception_record_detail: '',
        devices_exception_record_people: '目测',
        devices_exception_record_handling: '班前',
        devices_exception_record_identify_people: ''
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style>
.el_input .el-input-group__prepend {
  min-width:80px;
}
.el_input .el-input__inner{
  background-color: #fff!important;
  color: #333!important;
}
.padding {
  padding: 3px 0
}
.margin {
  margin-top: 10px
}
</style>

