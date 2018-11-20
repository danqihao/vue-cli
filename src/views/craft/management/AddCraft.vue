<!--张叶青 2018/04/012 -->
<template>
  <section>
    <!--搜索 start-->
    <el-col class="toolbar">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-col :span="24" class="text-right">
            <el-form-item :span="3">
            <el-select  placeholder="开启" clearable 
                     v-model="status"
                     size="medium"
                     @change="getList"
                     style="width:90px">
              <el-option :value="1">开启</el-option>
              <el-option :value="0">弃用</el-option>
            </el-select>
          </el-form-item>
          <el-form-item :span="3">
            <el-select placeholder="公版" clearable
                     v-model="versions"
                     size="medium"
                     @change="getList"
                     style="width:90px">
              <el-option :value="1">公版</el-option>
              <el-option :value="0">私版</el-option>
            </el-select>
          </el-form-item>
           <el-form-item :span="3">
            <el-select  placeholder="全部类型" clearable
                     v-model="type"
                     size="medium"
                     @change="getList">
              <el-option :value="0"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :span="4">
            <el-input v-model.trim="filters.className" size="medium" placeholder="输入名称或编号" @keyup.native.enter="getList"></el-input>
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
    <el-table :data="crafts" highlight-current-row
              v-loading="visible.listLoading"
              @selection-change="this.sels = sels">
      <el-table-column type="index" :index="getIndex" width="60"></el-table-column>
      <el-table-column prop="craft_name" label="工艺名称" sortable></el-table-column>
      <el-table-column prop="craft_number"  label="工艺编号" sortable></el-table-column>
      <el-table-column prop="craft_versions" label="工艺版本" ></el-table-column>
      <el-table-column prop="product_model_type_name" label="产品类型" ></el-table-column>
      <el-table-column prop="product_line_name" label="所属产线" ></el-table-column>
      <el-table-column prop="craft_quality_rate" label="优率" ></el-table-column>
      <el-table-column prop="useStatus" label="使用状态" sortable>
          <template slot-scope="scope">
          <el-select v-model="scope.row.useStatus" size="medium"  @change="handleAssignedChanged(scope.row)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column> 

      <!-- <el-table-column prop="craft_status" label="使用状态" ></el-table-column> --> 
      <el-table-column prop="craft_number" label="操作" width="320">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-view" @click="craftDetail(scope.row)">详情</el-button>
          <el-button type="success" size="small" @click="bomManage(scope.row)">BOM管理</el-button>
          <el-button type="danger" size="small" icon="el-icon-plus" @click="handleDelete(scope.row)">添加到模板</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--列表 end-->

    <!--分页start -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, sizes, prev, pager ,next" :page-size="filters.pageSize"
                     :total="filters.total"
                     @current-change="handlePageChange" @size-change="handleSizeChange">
      </el-pagination>
    </el-col>
    <!--分页end -->


  </section>
</template>

<script>
  import utils from '../../../common/js/utils'
  import {queryCraftOutline, addShift, editShift, removeShift
  } from '../../../api/api'

  export default {
    data () {
      return {
        filters: {
          versionType: 'public',
          pageSize: 10,
          page: 1,
          total: 0,
          status: 0
        },
        crafts: [],
        status: [],
        type: [],
        versions: [],
        visible: {
          listLoading: false,
          addForm: false,
          addLoading: false,
          editLoading: false
        },
        options: [
          {value: '0', label: '启用'},
          {value: '1', label: '弃用'}
        ],
        useStatus: '',
        querySearchPostTimeout: null,
      }
    },
    computed: {},
    mounted () {
      this.getList()
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
          type: 'info',
          pageSize: 10,
          page: 1,
          total: 0
        }
        this.getList()
      },
      //  获取工艺列表
      getList () {
        let para = Object.assign({
          headNum: utils.getHeadNumAdapter(this.filters.page, this.filters.pageSize)
        }, this.filters)
        queryCraftOutline(para).then((res) => {
          if (res.status === 0) {
            this.filters.total = res.map.lines
             res.map.craftList.forEach(item => {
              if (item.craft_status === '0') {
                item.useStatus = '0'
              } else {
                item.useStatus = '1'
              }
            })
            this.crafts = res.map.craftList
          } else {
            this.filters.total = 0
            this.crafts = []
          }
        })
      },
        // 工艺详情
      craftDetail (row) {
        this.$mesCarft.show()
      },
      // BOM管理
      bomManage (row) {
         this.$router.push({
          path: '/craft/children/BomManage',
          query: {
           
          }
        })
      },
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
        this.$confirm('确定要删除此条数据吗？删除后无法查询').then(action => {
          if (action === 'confirm') {
            removeShift({classId: row.role_class_id, status: '1'}).then((res) => {
              if (res.status === 0) {
                this.$message({ message: '删除成功', type: 'success' })
              } else {
                this.$message({ message: '删除失败', type: 'error' })
              }
              this.visible.addLoading = false
              this.getList()
            })
          }
        }).catch()
      },
      // 提交 - 包含新增和编辑
      addSubmit () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.visible.addLoading = true
              let para = Object.assign({}, this.addForm)
              if (this.isAddForm) {
                addShift(para).then((res) => {
                  this.visible.addLoading = false
                  if (res.status === 0) {
                    this.$message({ message: '新增成功', type: 'success' })
                    this.$refs['addForm'].resetFields()
                    this.visible.addForm = false
                    this.getList()
                  } else {
                    this.$message({ message: res.msg || '新增失败', type: 'warning' })
                  }
                })
              } else {
                editShift(para).then((res) => {
                  this.visible.addLoading = false
                  if (res.status === 0) {
                    this.$message({ message: '修改成功', type: 'success' })
                    this.$refs['addForm'].resetFields()
                    this.visible.addForm = false
                    this.getList()
                  } else {
                    this.$message({ message: res.msg || '修改失败', type: 'warning' })
                  }
                })
              }
            })
          }
        })
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">

</style>
