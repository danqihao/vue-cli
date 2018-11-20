<!--张叶青 2018/04/08 -->
<template>
  <el-row style="background-color: transparent">
    <el-col :span="24">
      <h3>{{ title }}</h3>
    </el-col>
  <section>
    <!--搜索 start-->
    <el-col class="toolbar">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-col :span="8" class="text-left">
          <el-form-item>
            <el-button type="primary" size="small" @click="handleAdd" icon="el-icon-plus">新增BOM</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="handleAdd" icon="el-icon-plus">物料详情</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="16" class="text-right">
          <el-form-item :span="3">
            <el-select  placeholder="启用"  
                     v-model="status"
                     size="medium"
                     @change="getList"
                     style="width:90px">
             <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
         <el-form-item :span="4">
            <el-input v-model.trim="filters.keyword" size="medium" placeholder="输入名称或编号" @keyup.native.enter="getList"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="getList" icon="el-icon-search">查询</el-button>
            <el-button size="medium" v-on:click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <!--搜索 end-->

    <!--列表 start-->
    <el-table :data="bomlist" highlight-current-row
              v-loading="visible.listLoading"
              @selection-change="this.sels = sels">
      <el-table-column type="index" :index="getIndex" width="60"></el-table-column>
      <el-table-column prop="craft_bom_name" label="BOM名称" sortable></el-table-column>
      <el-table-column prop="craft_bom_version"  label="BOM版本" sortable></el-table-column>
      <el-table-column prop="craft_bom_recordtime"  label="创建时间" sortable>
        <template slot-scope="scope">
          {{getTime(scope.row.craft_bom_recordtime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-el-icon-view" @click="handleDelete(scope.row)">详情</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)">弃用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--列表 end-->

    <!--分页start -->
    <el-col :span="24" class="toolbar">
      <el-col :span="6">
            <el-button type="danger" size="small" @click="handleDelede" icon="el-icon-delete" >批量移除</el-button>
            <el-button type="primary" size="small" @click="handleDelede" icon="el-icon-edit" >更换班次</el-button>
      </el-col>
      <el-pagination layout="total, sizes, prev, pager ,next" :page-size="filters.pageSize"
                     :total="filters.total"
                     @current-change="handlePageChange" @size-change="handleSizeChange">
      </el-pagination>
    </el-col>
    <!--分页end -->


  </section>
  </el-row>
</template>

<script>
  import utils from '../../../common/js/utils'
  import {queryCraftBOM
  } from '../../../api/api'

  export default {
    data () {
      return {
        filters: {
          type: '',
          pageSize: 10,
          page: 1,
          total: 0
        },
        visible: {
          listLoading: false,
          addForm: false,
          addLoading: false,
          editLoading: false
        },
        querySearchPostTimeout: null,
        isAddForm: true,
        addForm: {
          classId: '',
          className: '',
          classDetail: ''
        },
         options: [
          {value: '0', label: '启用'},
          {value: '1', label: '弃用'}
        ],
        bomlist: [],
        status: [],
        craftVersionsId: '',
        title: '',
        addFormRules: {
          className: { required: true, message: '班次名称不能为空', trigger: 'blur' }
        }
      }
    },
    computed: {
    },
    mounted () {
      this.type = utils.getQueryStringByName('type')
      this.craftVersionsId = utils.getQueryStringByName('id')
      this.title = decodeURI(utils.getQueryStringByName('title'))
      this.getList()
      // this.queryProductLinesList=queryProductLines()
    },
    methods: {
      //  页面改变
      handlePageChange (val) {
        this.filters.page = val
        this.getList()
      },
      //  每页数量改变
      handleSizeChange (val) {
        this.filters.pageSize = val
        this.getList()
      },
      // 列表索引
      getIndex (index) {
        return parseInt(this.filters.pageSize) * parseInt(this.filters.page - 1) + index + 1
      },
      // 重置
      reset () {
        this.filters = {
          className: '',
          type: 'classStaff',
          pageSize: 10,
          page: 1,
          total: 0
        }
        this.getList()
      },
      //  获取BOM列表
      getList () {
        // 注意后端分页用的字段是headNum, 所以要转换一下
        let para = Object.assign({
            headNum: utils.getHeadNumAdapter(this.filters.page, this.filters.pageSize)
          }, this.filters)
        para[this.type] = this.craftVersionsId
        queryCraftBOM(para).then((res) => {
          if (res.status === 0) {
            this.filters.total = res.map.lines
            this.bomlist = res.map.bomlist
          } else {
            this.filters.total = 0
            this.bomlist = []
          }
        })
      },
      // 查看详情
      handleView (row) {
        this.$mesBasicInfoTable.show(
          '班次详情', {
            table: {
              props: ['班次名称', '班次说明'],
              values: [row.role_class_detail, row.role_class_name]
            }
          })
      },
      // 新增人员
      handleAdd () {
        let tage = true
        this.$mesStaff.show({
          type: 'all',
          reRender: true,
          selectedIds: this.selectedIds
        }).then(res => {
          this.selectedIds = res.rows.map(v => v.role_staff_id)
          let para = {
            staffIds: res.rows[0].role_staff_id,
            classId: this.classId
          }
          this.classStaffs.forEach(element => {
            if (res.rows[0].role_staff_id === element.staff.role_staff_id) {
              this.$message({message: '该人员已经存在请勿重新选择', type: 'error'})
              tage = false
            }
          });
          if (tage) {
            addClassStaff(para).then(res => {
              if (res.status === 0) {
                this.$message({message: '新增成功', type: 'success'})
                this.getList()
              } else {
                this.$message({message: res.msg || '新增失败', type: 'error'})
              }
            })
          }
        })
      },
      // 批量删除
      handleDelede () {
        this.visible = false
        this.selectedRows = this.$refs.multipleTable.selection
        let staffId = ''
        this.selectedRows.forEach(element => {
          staffId = element.role_staff_class_id + ',' + staffId
        })
        staffId = staffId.substring(0, staffId.length - 1)
        this.$confirm('确定全部移除吗？').then(action => {
          if (action === 'confirm') {
            let para = {
              staffIds: staffId
            }
            para[this.type] = this.classId
            removeClassStaff(para).then((res) => {
              if (res.status === 0) {
                this.$message({ message: '移除成功', type: 'success' })
              } else {
                this.$message({ message: res.msg || '移除失败', type: 'error' })
              }
              this.getList()
            })
          }
        }).catch()
      },
      // 更换班次

      // 编辑
      handleEdit (row) {
        this.addForm = {
          classId: row.role_class_id,
          className: row.role_class_name,
          classDetail: row.role_class_detail
        }
        this.isAddForm = false
        this.visible.addForm = true
      },
      // 删除
      handleDelete (row) {
        this.$confirm('确定移除吗？').then(action => {
          if (action === 'confirm') {
            let para = {
              staffIds: row.role_staff_class_id
            }
            para[this.type] = this.classId
            removeClassStaff(para).then((res) => {
              if (res.status === 0) {
                this.$message({ message: '移除成功', type: 'success' })
              } else {
                this.$message({ message: res.msg || '移除失败', type: 'error' })
              }
              this.getList()
            })
          }
        }).catch()
      },
      //  转换时间
      getTime (timestamp) {
        if (timestamp === null || timestamp === '') {
          return ''
        } else {
          return utils.formatDate.format(new Date(timestamp), 'yyyy-MM-dd')
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
